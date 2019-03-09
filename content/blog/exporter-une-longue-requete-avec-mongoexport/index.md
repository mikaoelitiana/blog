---
layout: post
title: "Exporter une longue requête avec mongoexport"
lang: fr
author: mikaoelitiana
date: Invalid date
categories: ["Français", "Uncategorized"]
slug: exporter-une-longue-requete-avec-mongoexport
excerpt: "
				"
draft: true
meta_title: "Exporter une longue requête avec mongoexport"
---

 `mongoexport -h 192.168.22.33 -d ralter -c users -q "`cat /Users/mikaoelitiana/Downloads/list-bloqued.csv`" --fields email,username,groups --type csv --out bloqued-users.csv`