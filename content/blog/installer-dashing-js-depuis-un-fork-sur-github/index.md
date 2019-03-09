---
layout: post
title: "Installer dashing-js depuis un fork sur github"
lang: fr
author: mikaoelitiana
date: 2015-10-23T09:17:29+02:00
categories: ["Français", "Javascript", "node.js"]
slug: installer-dashing-js-depuis-un-fork-sur-github
excerpt: "
				"
draft: false
meta_title: "Installer dashing-js depuis un fork sur github"
---

Pour mettre en place un système de tableau de bord avec un framework nodejs, j'ai essayé [dashing-js](https://github.com/fabiocaseri/dashing-js) aujourd'hui. Comme ce plugin n'est pas beaucoup maintenu, j'ai voulu essayé un de ces forks [niwa/dashing-js](https://github.com/niwa/dashing-js). L'installation depuis la source de package de npm se ferait avec la commande suivante: `npm install -g dashing-js` mais je dois faire l'installation depuis le dépôt github du fork et je fais donc : `npm install -g git+https://github.com/niwa/dashing-js.git` Je peux alors générer un nouveau projet: `dashing-js new sweet_dashboard_project` Avant de lancer le projet, je met à jour le fichier package.json pour récupérer la dépendance depuis github :
```
"dependencies": {
 "dashing-js": "git://github.com/niwa/dashing-js.git"
},
```
Enfin, j'installe les dépendances et je peux lancer l'application :
```
npm install
dashing-js start
```