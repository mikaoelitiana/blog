---
layout: post
title: "Configurer Travic CI pour un package Atom"
lang: fr
author: mikaoelitiana
date: 2016-01-29T09:05:48+01:00
categories: ["DevOps", "Français", "Intégration continue", "Javascript", "pll_56b1dd9bae67d", "travis-ci"]
slug: configurer-travic-ci-pour-un-package-atom
excerpt: "
				"
draft: false
meta_title: "Configurer Travic CI pour un package Atom"
---

En travaillant sur un petit package [Atom](https://atom.io/packages/atom-numbers) ces derniers temps, j'ai commencé à configurer [Travis CI](http://travis-ci.org/) pour lancer automatiquement mes builds et tests. Cela me permet d'assurer que les push et futurs pull request de mon projet ne cassent rien. Comme il s'agit d'un projet Opensource, je peux utiliser gratuitement les services de Github et Travis CI. Mon repository est installé sur G[ithub](https://github.com/mikaoelitiana/atom-numbers) et j'ai commencé par activer le webhook de Travic CI dans les paramètres de celui-ci. Pour cela, aller dans _Settings > Webhooks & services > Travic CI _et activer ce service en commençant par l'éditer. ![Webhooks Services](./Webhooks-Services-1024x294.png) Il faut maintenant configurer Travis CI. Celui-ci est lié à mon compte Github et je retrouve directement la liste de mes repository et j'active celui qui est concerné.   ![active](./active-300x38.png) Enfin, pour lancer les travaux de travis, il faut ajouter un fichier .travis.yml dans la racine du projet. Ce fichier contient les informations nécessaire à travis ainsi que la configuration des actions à faire. En ce qui concerne les packages Atom, un repository a été mis en place pour mettre en place facilement les configurations de Travis. Il suffit d'aller sur [https://github.com/atom/ci/blob/master/.travis.yml](https://github.com/atom/ci/blob/master/.travis.yml) et d'utiliser ce fichier. Quand j'effectue des nouveau push sur le repository, travis va maintenant lancer les builds automatiquement et me tenir informé en cas de problème. Pour couronner le tout, j'ai droit au petit bouton indiquant le statut du repository. Il peut facilement être intégré sur une page web ou sur le README de mon projet ![](https://travis-ci.org/mikaoelitiana/atom-numbers.svg?branch=master) Pour les packages Atom, il est également possible d'utiliser d'autres services comme AppVeyor ou Circle. Les détails pour ceux-ci sont également disponible sur le répertoire [https://github.com/atom/ci/](https://github.com/atom/ci/) Et voila, à vous maintenant!