---
layout: post
title: "Docker: nettoyer les images non-utilisées et gagner des gigas :)"
lang: fr
author: mikaoelitiana
date: 2017-05-11T15:15:30+02:00
categories: ["DevOps", "docker", "Français"]
slug: docker-nettoyer-images-non-utilisees-gagner-gigas
excerpt: "
				"
draft: false
meta_title: "Docker: nettoyer les images non-utilisées et gagner des gigas :)"
---

# Un peu de nettoyage ce weekend?

Quand on utilise docker depuis un certain temps, il arrive que certaines images prennent de l'espace sur le disques dure sans qu'elles ne soient nécessaires. En effet, le nettoyage des images ne se fait pas automatiquement et il faut donc régulièrement faire soi-même la maintenance. En cherchant un peu sur internet, on peut facilement trouver des scripts personnalisés pour cela. Voici à quoi cela ressemble : `printf "n>>> Deleting untagged imagesnn" && docker rmi $(docker images -q -f dangling=true)` Ce script liste les images dites "dangling", c'est à dire, celle qui ne sont plus liées à un conteneur puis les efface avec la commande docker rmi. Cela fonctionne en générale mais il arrive que certaines images ne sont pas effacées si on n'utilise pas l'option --force

# Docker est notre ami

Pour améliorer encore le nettoyage, l'équipe Docker a travaillé sur une fonctionnalité que j'ai récemment découvert : la commande prune. Celle-ci va faire le nettoyage pour nous et nous n'avons plus besoin de faire un script. Nous lançons la commande comme suit:
```
$ docker image prune -a
WARNING! This will remove all images without at least one container associated to them.
Are you sure you want to continue? [y/N] y
```
Nous voyons que docker nous demande une confirmation avant de faire le travail. Une autre commande est également disponible pour nettoyer encore plus de choses :
```
$ docker system prune
WARNING! This will remove:
	- all stopped containers
	- all volumes not used by at least one container
	- all networks not used by at least one container
	- all dangling images
Are you sure you want to continue? [y/N] y
```
Docker va alors afficher les suppressions qu'il a fait ainsi que l'espace récupéré après le nettoyage :
```
...
untagged: elixir@sha256:5b1e6469bbdd943ff3aa4138d654dabe770c7515e175bdc6275712480016327f
deleted: sha256:c83b24539405d2d750080ff9a4a06aa059dbd5b9350b8dfe3554f2f975ba2a32
deleted: sha256:bafa5e4ac2f8940f724b2e2fb104befdfdcf50021ca3d5b136c9ccfea51ecf46
deleted: sha256:f0b0bc5cba2c1e5305b80dd7f25b2382dd1b2e2b7054ff40f96b23c9e17f12f0
deleted: sha256:1afb2ea78ec193916b1df16623f05f04359175e18cc9bb89df755e732c5a681f
deleted: sha256:752d7eb72fe748bf7b4eadf7ec1d3fd447563cf90e00a2e0b7fdeb20fb149c6b
deleted: sha256:dc6946142afcfa60eec5b3436c88629a38d5746e48358520d127c6c5293cf0bb
deleted: sha256:fdda8711a008ab31490c5e23e56145f995b770937f3512f7d7acc05ef898940b
deleted: sha256:8fd8aaa3eb8823376c2fe612b89192ae7bd1fe3308bdec0f0b725a89887b2e38
deleted: sha256:295d6a056bfd381abf9c462629066b0458373045a1dca7d13ef6128cb38c977e

Total reclaimed space: 5.744GB
```
J'espère que cet article va vous aider à récupérer un peu d'espace qui n'est plus utilisé par docker!! Pour plus de détails sur les commandes utilisées, rendez-vous sur la [documentation officielle de docker](https://docs.docker.com/engine/reference/commandline/system_prune/).