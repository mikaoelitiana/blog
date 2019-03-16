---
layout: post
title: "Deploy a Docker image on Rancher with Gitlab CI"
lang: en
author: mikaoelitiana
date: 2017-10-02T14:48:07+02:00
categories: ["DevOps", "devops", "docker", "English", "gitlab", "pll_59d22ff5b59c8", "rancher"]
slug: deploy-a-docker-image-on-rancher-with-gitlab
excerpt: "
				"
draft: false
meta_title: "Deploy a Docker image on Rancher with Gitlab CI"
---

I recently started working with [Docker images](https://hub.docker.com/) that we build through our continuous integration pipe. [Gitlab CI](https://about.gitlab.com/features/gitlab-ci-cd/) is an accessible and easy-to-use tool and we'll see how to use it to deploy docker images on [Rancher](http://rancher.com/). To start, we will need to set up a [_docker-compose.yml_ file](https://docs.docker.com/compose/) that describes the services we want to deploy. This may include a web application, a database and any other service we may need (storage, e-mail, cache, proxy, etc.) On the example below, we will have 3 services:

1.  our web application
2.  a database service (postgres)
3.  a storage instance for the database

```
version: '2'
services:
  app:
    image: registry.example.com/app:dev
    environment:
      DB_HOST: db
      DB_NAME: app_db
      DB_PASSWORD: a_p4ssword
      DB_USER: postgres
      DB_PORT: 5432
    links:
    - db:db
    ports:
    - 4034:4032/tcp
    command:
    - foreground
    labels:
      io.rancher.container.pull_image: always
  db-storage:
    image: busybox
    volumes:
    - /var/lib/postgresql/data/pgdata
    labels:
      io.rancher.container.start_once: 'true'
  db:
    image: postgres
    environment:
      PGDATA: /var/lib/postgresql/data/pgdata
      POSTGRES_DB: app_db
      POSTGRES_PASSWORD: a_p4ssword
      POSTGRES_USER: postgres
    volumes_from:
    - db-storage
    ports:
    - 5436:5432/tcp
    expose:
      - "5432"
    labels:
      io.rancher.sidekicks: db-storage
```
You will note that we expose our app on port **4034**et the database on port **5436.** After that, we set our continious deployment processes in the ._gitlab-ci.yml file._ We will use the [tagip/rancher-cli](https://hub.docker.com/r/tagip/rancher-cli/) which contains an installed [Rancher CLI](http://rancher.com/docs/rancher/v1.2/en/cli/), the command-line tools for Rancher.
```
deploy_app:
  stage: deploy
  image: tagip/rancher-cli
  script:
    - rancher --debug up -d --stack "our-app"
    - rancher --debug up -d --force-upgrade --pull --stack "our-app" --confirm-upgrade app
```
The first line in <span style="lang:default decode:true crayon-inline ">script</span>  will check that a stack call "our-app" is up in Rancher, if not, it will first create it. The second command downloads (with option <span style="lang:default decode:true crayon-inline ">\--pull</span> ) the latest image built for <span style="lang:default decode:true crayon-inline ">app</span>  et update the stack (<span style="lang:default decode:true crayon-inline ">\--confirm-upgrade</span> ). Finally, we need to get Rancher credentials so the previous rancher command can connect to the correct instance. We get them from Rancher in _Rancher > API > Keys_ ![](./Capture-d-ecran-2017-09-11-à-17.01.26-1024x155.png) We will put these informations in Gitlab and they will be passed as environment variable on each CI pipeline. We set them in Gitlab at _Settings > Pipelines > Secret variables _

1.  RANCHER\_ACCESS\_KEY: the generated access key
2.  RANCHER\_SECRET\_KEY: secret key associated
3.  RANCHER\_URL: the URL of Rancher

![](./Capture-d-ecran-2017-09-11-à-17.04.40-1024x432.png) Et voila, our Rancher stack is now updated through Gitlab CI.