---
layout: post
title: "Problème de lecture video mp4 sur Chrome iPad"
lang: fr
author: mikaoelitiana
date: 2014-04-07T14:47:51+02:00
categories: ["chrome", "Français", "htaccess", "ipad", "mp4", "Web"]
slug: probleme-de-lecture-video-mp4-sur-chrome-ipad
excerpt: "
				"
draft: false
meta_title: "Problème de lecture video mp4 sur Chrome iPad"
---

J'ai été confronté à un problème assez bizarre ces derniers jours. Sur un projet web, nous avions mis en place une restriction par htaccess/htpsswd tout a fait basique. Les probèmes commencent au moment où il faut lire des vidéos mp4 sur les pages du site. En effet, sur Chrome/iPad, le lecteur n'arrive pas à lire les vidéos quand la restriction est mise en place. Même après avoir correctement saisi les identifiant, la lecture video ne se lance pas. Il a donc fallu autoriser exceptionnellement l'accès aux fichiers mp4 afin que le player ne rencontre plus de problème. Cela donne quelque chose comme :
```
<IfModule mod_rewrite.c>
 AddType video/ogg .ogv
 AddType video/webm .webm
 AddType video/mp4 .mp4
 </IfModule>
```
```
AuthType Basic
 AuthName "Protected Area"
 AuthUserFile /var/www/project/.htpasswd
 Require valid-user
```
```
# Autoriser directement l'acces au fichiers mp4 pour
 # Chrome sur iPad qui ne pouvait pas kles jouer
 <FilesMatch mp4>
 Satisfy any
 order allow,deny
 allow from all
 </FilesMatch>
```