---
layout: post
title: "Mise a jour du blog vers Gatsby v4"
lang: fr
author: mikaoelitiana
date: 2021-12-21T18:50:58+02:00
categories: ["Français", "Gatsby", "Tech"]
slug: mise-a-jour-blog-gatsby-v4
excerpt: ""
draft: false
meta_title: "Mise a jour du blog vers Gatsby v4"
image: "./picture.jpg"
imageAlt: "cyber woman coding"
---

![cyber woman coding](picture.jpg)

Cela fait maintenant près de 3 ans que je n'ai pas mis à jour la partie technique de mon blog. Actuellement il utilise Gatsby v2 et il était temps de passer à la version 4 qui apporte des nouveautés et de la rapidité sur la génération des pages statiques.

Je commence ainsi par mettre à jour `gatsby` et `gatsby-cli`:

```shell
npm i -S gatsby@latest gatsby-cli@latest
```

Je met ensuite à jour tous les modules prefixés par `gatsby-*`. Dans certains cas, l'installation a nécessité l'usage de `--force` pour se faire correctement.

Cependant, j'ai rencontré quelques erreurs une fois tous les modules mis à jour, en particulier à cause de configuration dans mon fichier `gatsby-config.js` qui ne sont plus conformes. Par exemple, j'ai eu l'erreur suivante:

```shell
Invalid plugin options for "gatsby-plugin-feed":
```

Pour la corriger, il m'a suffit de me rendre sur la page de documentation du plugin (https://www.gatsbyjs.com/plugins/gatsby-plugin-feed/) et d'adopter la nouvelle configuration.

J'ai aussi profité de l'occasion pour ajouter le support des images dans le cartes Twitter suite au partage de liens du blog. Un [billet de blog](https://www.freecodecamp.org/news/gatsby-blog-header-image-twitter-card/) ecrit pas David Good explique en détail ce qu'il faut faire pour cela.

Et voila, le tour est joué, on peut dire que le processus s'est passé sans accroc mais c'est l'occasion d'ecrire un nouveau billet et reprendre un peu la main.

_Photo by cottonbro from Pexels_
