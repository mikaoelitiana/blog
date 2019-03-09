---
layout: post
title: "Champ de recherche vide dans Wordpress"
lang: fr
author: mikaoelitiana
date: 2014-08-13T15:05:31+02:00
categories: ["Français", "Web", "Wordpress"]
slug: champ-de-recherche-vide-dans-wordpress
excerpt: "
				"
draft: false
meta_title: "Champ de recherche vide dans Wordpress"
---

Il vous est peut-être arrivé comme moi de travaillé sur un thème custom Wordpress et que le design de votre site se casse quand un utilisateur effectue une recherche vide (donc on a ?s= dans l'URL). Dans mon cas, pour contourner ce problème, je supprime la variable _s_ si elle est vide pour que la recherche soit bien ignorée :
```
add_filter( 'request', 'custom_request_filter' );
function custom_request_filter( $query_vars ) {
  if( isset( $_GET['s'] ) && empty( $_GET['s'] ) ) {
    unset($query_vars['s']);
  }
 return $query_vars;
}
```
L'utilisateur reste alors sur la homepage dont le design n'est plus cassé