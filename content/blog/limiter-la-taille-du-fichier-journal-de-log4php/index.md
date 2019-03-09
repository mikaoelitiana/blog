---
layout: post
title: "Limiter la taille du fichier journal de log4php"
lang: fr
author: mikaoelitiana
date: 2015-01-27T13:54:17+01:00
categories: ["Français", "Log4PHP", "Web"]
slug: limiter-la-taille-du-fichier-journal-de-log4php
excerpt: "
				"
draft: false
meta_title: "Limiter la taille du fichier journal de log4php"
---

Nous utilisons le module [log4php](https://www.drupal.org/project/log4php "log4php") sur plusieurs projets afin d’écrire les messages d'erreurs dans un fichier système au lieu de la base de données. Selon la configuration, le fichier journal peut se remplir plus ou moins vite. Après plus d'un ans d'utilisation sur un de nos projets, le fichier de log a atteint une taille de plus de 5Go, ce qui rempli inutilement le serveur et rend la lecture du fichier difficile. Il est possible de limiter la taille des fichiers de logs et de garder quelques sauvegardes en effectuant les configurations suivantes dans le fichier log4php.xml :
```
<?xml version="1.0" encoding="UTF-8"?>
<configuration xmlns="http://logging.apache.org/log4php/">
 <appender name="file" class="LoggerAppenderFile">
 <layout class="LoggerLayoutSimple" />
 <param name="file" value="/var/www/example/logs/log4php.log" />
 <param name="append" value="true" />
 <span style="color: #ff0000;"><param name="maxFileSize" value="8MB" /></span>
 <span style="color: #ff0000;"><param name="maxBackupIndex" value="5" /></span>
 </appender>
 <root>
 <appender_ref ref="file" />
 </root>
</configuration>

```
Nous avons donc défini la taille maximale du fichier à 8Mb grâce au paramètre _maxFileSize_ et nous gardons 5 sauvegardes sur le serveur en spécifiant _maxBackupIndex_. Ces fichiers seront alors nommé log4php.log.1, log4php.log.2, etc..