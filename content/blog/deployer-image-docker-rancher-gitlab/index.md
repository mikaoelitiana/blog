---
layout: post
title: "Déployer une image docker sur Rancher avec Gitlab CI"
lang: fr
author: mikaoelitiana
date: 2017-09-11T16:13:05+02:00
categories: ["DevOps", "docker", "Français", "gitlab", "Intégration continue", "pll_59d22ff5b59c8", "rancher"]
slug: deployer-image-docker-rancher-gitlab
excerpt: "
				"
draft: false
meta_title: "Déployer une image docker sur Rancher avec Gitlab CI"
---

Ces derniers temps, nous travaillons souvent avec des [images Docker](https://hub.docker.com/) que nous construisons à travers notre pipe d'intégration continue. [Gitlab CI](https://about.gitlab.com/features/gitlab-ci-cd/) est un outil accessible et simple d'utilisation et nous allons voir comment l'utiliser pour déployer des images docker sur [Rancher](http://rancher.com/). Pour commencer, il faut mettre en place un [fichier _docker-compose.yml_](https://docs.docker.com/compose/) qui décrit le/les services que nous voulons déployer.  Cela peut par exemple contenir une application web, une base de données et tout autre service que dont nous pourrons avoir besoin (stockage, messagerie, cache, proxy, etc...) Sur l'exemple ci-dessous, nous allons avoir 3 services :

1.  notre application web
2.  un service de base de données (postgres)
3.  une instance de stockage pour la base de données

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
Nous pouvons aussi noter que nous exposons l'application sur le port **4034**et la base de données sur le port **5436.** Maintenant que nous avons ce fichier dans notre projet, nous pouvons ajouter une étape de déploiement dans le fichier ._gitlab-ci.yml.  _Pour cela, nous allons utiliser l'image [tagip/rancher-cli](https://hub.docker.com/r/tagip/rancher-cli/) qui contient [Rancher CLI](http://rancher.com/docs/rancher/v1.2/en/cli/), l'application de ligne de commande pour Rancher.
```
deploy_app:
  stage: deploy
  image: tagip/rancher-cli
  script:
    - rancher --debug up -d --stack "our-app"
    - rancher --debug up -d --force-upgrade --pull --stack "our-app" --confirm-upgrade app
```
La première commande dans <span style="lang:default decode:true crayon-inline ">script</span>  permet de s'assurer qu'un stack de l'application existe sur rancher ou de créer celle-ci sinon. La seconde commande télécharge (l'option <span style="lang:default decode:true crayon-inline ">\--pull</span> ) l'image associée au service <span style="lang:default decode:true crayon-inline ">app</span>  et confirme la mise à jour (<span style="lang:default decode:true crayon-inline ">\--confirm-upgrade</span> ). Enfin, pour que les lignes de commande de Rancher CLI fonctionnent, il faut qu'ils puissent se connecter à Rancher. Il faut donc donner l'URL de l'instance Rancher ainsi que les paramètres de connections. Il faut donc générer une clé d'accès pour l'API dans Rancher dans _Rancher > API > Keys_ ![](./Capture-d’écran-2017-09-11-à-17.01.26-1024x155.png) Une fois que cela est fait, il faut ajouter ces informations dans Gitlab pour que celui-ci les passe à la pipe d'intégration continue en tant que variables d'environnements. Il faut se rendre dans les paramètres du projet Gitlab et ajouter les variables suivantes dans _Settings > Pipelines > Secret variables _

1.  RANCHER\_ACCESS\_KEY: la clé d'accès générée précédemment
2.  RANCHER\_SECRET\_KEY: la clé secrète associée à la clé ci-dessus
3.  RANCHER\_URL: l'URL de l'instance Rancher

![](./Capture-d’écran-2017-09-11-à-17.04.40-1024x432.png) Et voila, à chaque fois que la pipe d'intégration continue s'execute, le stack sur Rancher se met à jour.