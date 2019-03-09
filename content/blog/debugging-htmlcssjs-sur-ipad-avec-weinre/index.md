---
layout: post
title: "Debugging HTML/CSS/JS sur iPad avec weinre"
lang: fr
author: mikaoelitiana
date: 2014-07-16T11:06:06+02:00
categories: ["Français", "ipad", "Web"]
slug: debugging-htmlcssjs-sur-ipad-avec-weinre
excerpt: "
				"
draft: false
meta_title: "Debugging HTML/CSS/JS sur iPad avec weinre"
---

Nous vivons  aujourd'hui l'ère du tout-RESPONSIVE et la plupart des projets web ne peuvent plus s'en passer. En recherchant des outils pour déboguer du HTML/CSS/Js sur iPad, je suis finalement tombé sur [weinre](http://people.apache.org/~pmuellr/weinre/docs/latest/Home.html "weinre"), une petite application qui permet d'avoir un panneau similaire à Firebug sur le navigateur de bureau mais qui est relié à la page ouverte dans le navigateur mobile. Le principe de l'application est assez simple : on lance l'application sur son ordinateur en ligne de commande et on ajoute un code javascript dans la page web a déboguer. Une interface web permet ensuite de voir les devices connectés et de les déboguer. A noter que cette application tourne sur [node.js](http://nodejs.org/ "node.js") qu'il faudra donc installer avant de pouvoir utiliser l'application. L'installation est très simple : `npm -g install weinre` Ensuite, pour lancer l'application, on exécute : `weinre [OPTIONS]` On se rend ensuite sur l'interface web (localhost:8080 ou l'adresse réseau:8080) et on nous propose plusieurs méthode pour intégrer le code javascript dans la page a débogué. Une fois la page chargée, on reviens dans l'interface web pour accéder à debugger. En résumé, superbe outil, facile d'utilisation et qui peut beaucoup aider.