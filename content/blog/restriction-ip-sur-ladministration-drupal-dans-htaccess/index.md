---
layout: post
title: "Restriction IP sur l'administration Drupal dans htaccess"
lang: fr
author: mikaoelitiana
date: 2015-01-16T14:49:00+01:00
categories: ["Drupal", "Français", "Sécurité", "Web"]
slug: restriction-ip-sur-ladministration-drupal-dans-htaccess
excerpt: "
				"
draft: false
meta_title: "Restriction IP sur l'administration Drupal dans htaccess"
---

Pour des raisons de sécurité, il est fréquent de limiter l'accès à l'administration d'un site depuis certaines adresses IP uniquement. Une manière simple d'effectuer cela est d'jouter la restriction dans le fichier .htaccess. Pour le cas de Drupal, nous allons filtrer l'accès aux URL **admin/\***en ajoutant les lignes suivantes au début du fichier .htaccess :
```
 order allow,deny
 SetEnvIf Request_URI "^(?!/admin)" allow
 allow from env=allow
 allow from X.X.X.X
 allow from Y.Y.Y.Y
 allow from Z.Z.Z.Z
```
Voyons rapidement ce que signifie ces instructions : ` order allow,deny` Cette ligne indique l'ordre de traitement de la validation d'accès. `SetEnvIf Request_URI "^(?!/admin)" allow` Nous initialisons une variable **allow**quand l'url auquel accède l'utilisateur ne commence pas par **admin.** `allow from env=allow` Quand la variable **allow** est définie, l'accès est autorisée.   `allow from X.X.X.X` Enfin, nous listons les IP qui ont le droit d'accéder à l'administration. Pour chaque page, Apache va donc vérifier si une des conditions d’accès **allow from**ci-dessus est satisfaite. Si aucune ne répond aux critère, Apache applique alors un **deny** sur l'URL et la page affiche le message **403 Forbidden**. En résumé, cette solution est simple et permet d'assurer une sécurité supplémentaire sur l'accès à l'administration d'un site Drupal. Il y a plusieurs amélioration possibles cependant, comme l'utilisation d'une page 403 "stylée" ou l'affichage d'un message personnalisé. Cette solution peut cependant ne pas convenir pour certains cas d'utilisation comme un administrateur "nomade" qui se déplace souvent par exemple. Ou dans le cas où un reverse proxy est utilisé sur le serveur. Il existe également des modules Drupal qui permettent d'avoir un comportement similaire comme [Restrict IP](https://www.drupal.org/project/restrict_ip)