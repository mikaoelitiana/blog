---
layout: post
title: "Forcer une redirection 404 avec .htaccess"
lang: fr
author: mikaoelitiana
date: 2014-11-13T15:20:49+01:00
categories: ["Apache", "Français", "Web"]
slug: forcer-une-redirection-404-avec-htaccess
excerpt: "
				"
draft: false
meta_title: "Forcer une redirection 404 avec .htaccess"
---

Pour des raisons de sécurité<span style="line-height: 1.5em;">sur un des projets sur lesquels je travaille</span><span style="line-height: 1.5em;">, il m'a été demandé de forcer un code de retour 404 sur certaines urls et dossiers sensibles. Ceux-ci retournaient un code 403 auparavant, révélant ainsi leur existence à des robots ou des personnes mal-intentionnées.</span> Une manière assez simple de résoudre ce problème est d'utiliser l'instruction RedirectMatch de Apache. Deux exemple ici pour le dossier /cgi-bin et /batch
```
RedirectMatch 404 ^/batch/?$
RedirectMatch 404 ^/cgi-bin/?$
```
RedirectMatch a l'avantage d'utiliser les expressions régulières, permettant ainsi d'être très souple dans ce que l'on veut faire. Voir la [page de documentation](http://httpd.apache.org/docs/2.2/mod/mod_alias.html#redirectmatch "RedirectMatch") pour plus de détails sur RedirectMatch.