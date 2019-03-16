---
layout: post
title: "Intégrer GraphQL avec Wordpress"
lang: fr
author: mikaoelitiana
date: 2018-07-27T11:09:17+02:00
categories: ["Français", "graphql", "pll_5b5b3ebc5f7ac", "Web"]
slug: integrer-graphql-avec-wordpress
excerpt: "
				"
draft: false
meta_title: "Intégrer GraphQL avec Wordpress"
---

GraphQL est un language de requête très puissant permettant de minimiser les appels depuis un client vers un serveur. Wordpress étant un des outils de publications les plus utilisés, il peut être intéressant de l'utiliser avec GraphQL.

## Fournir un endpoint GraphQL dans Wordpress

Le principe de GraphQL est de fournir un endpoint sur lequel on va faire un appel pour récupérer des données. Pour que Wordpress puisse fournir cela, j'ai installé [wp-graphql.](https://github.com/wp-graphql) Pour l'installer, il faut télécharger la dernière version du plugin sur [https://github.com/wp-graphql/wp-graphql/releases](https://github.com/wp-graphql/wp-graphql/releases) et téléverser le fichier dans le tableau de bord de Wordpress. Après avoir activé le plugin, il faut s'assurer qu'il fonctionne en ouvrant l'URL _https://ADRESSE\_DU\_SITE\_WORDPRESS/graphql._ Un message d'erreur similaire au suivant devrait alors apparaitre. ![](./Capture-d-ecran-2018-07-26-à-17.55.21-1024x363.png)

## Récupérer quelques données

Nous allons maintenant essayer de faire des requetes pour récupérer des données sur le site Wordpress. Pour cela, j'utilise [Insomnia](https://insomnia.rest/) qui offre des fonctionnalités très sympa pour travailler avec GraphQL, notament l'autocomplétion ou l'identation automatique des requetes. Je crée ainsi une nouvelle requête dans Insomnia et je met en URL l'endpoint de GraphQL. Je séléctionne ensuite GraphQL comme type de donnée envoyé par Insomnia et je commence à éditer le contenu de la requete. ![](./Capture-d-ecran-2018-07-26-à-18.01.19.png) Voici par exemple une requête qui permet de récupérer les 10 derniers articles avec leur URL et une image à la une:
```
{
  posts(first: 10) {
    nodes {
      title
      featuredImage {
    sourceUrl
      }
      link
    }
  }
}

```
Et  voilà, nous pouvons maintenant utiliser GraphQL pour récupérer des données depuis un site Wordpress.