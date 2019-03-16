---
layout: post
title: "Integrate GraphQL with Wordpress"
lang: en
author: mikaoelitiana
date: 2018-07-27T17:48:12+02:00
categories: ["English", "graphql", "Non classé", "pll_5b5b3ebc5f7ac"]
slug: integrate-graphql-with-wordpress
excerpt: "
				"
draft: false
meta_title: "Integrate GraphQL with Wordpress"
---

GraphQL is a very powerful query language that minimizes calls from a client to a server. Since Wordpress is one of the most used publications tools, it can be interesting to use it with GraphQL.

## Provide a GraphQL endpoint in Wordpress

The principle of GraphQL is to provide an endpoint on which we will make a call to retrieve data. For Wordpress to provide this, I installed [wp-graphql.](https://github.com/wp-graphql) To install it, download the latest version of the plugin from [https://github.com/wp-graphql/wp-graphql/releases](https://github.com/wp-graphql/wp-graphql/releases) and upload the file into the Wordpress dashboard. After activating the plugin, make sure that it works by opening the URL _https: // ADDRESS\_DU\_SITE\_WORDPRESS/graphql._ An error message similar to the following screenshot should then appear. ![](./Capture-d-ecran-2018-07-26-à-17.55.21-1024x363.png)

## Retrieve some data

We will now try to make requests to retrieve data from the Wordpress site. For that, I use [Insomnia](https://insomnia.rest/) which offers very nice features to work with GraphQL, just to mention autocompletion or  automatic indentation. I create a new query in Insomnia and I the GraphQL endpoint as URL. I then select GraphQL as data type sent by Insomnia and I start editing the contents of the query. ![](./Capture-d-ecran-2018-07-26-à-18.01.19.png) Here is the example of a query that retrieves the last 10 articles with their URL and their featured images:
```
{
  posts (first: 10){
    nodes{
      title
      featuredImage{
        sourceURL
      }
    link
    }
  }
}

```
Voila, we can now use GraphQL to retrieve data from a Wordpress site.