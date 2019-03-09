---
layout: post
title: "Variety, un outil pour analyser la structure d'une collection mongoDB"
lang: fr
author: mikaoelitiana
date: 2015-09-04T13:07:56+02:00
categories: ["Français", "Javascript", "mongodb", "nosql", "pll_55e985aa01edc"]
slug: variety-un-outil-pour-analyser-la-structure-dune-collection-mongodb
excerpt: "
				"
draft: false
meta_title: "Variety, un outil pour analyser la structure d'une collection mongoDB"
---

Je viens d'être affecté sur un projet existant qui utilise mongoDB. Pour prendre en main le projet, il m'a fallu rapidement comprendre la "structure" des données et comprendre l'utilisation de chaque champ. Cela a été grandement simplifié par [Variety](https://github.com/variety/variety), un outil très simple d'utilisation mais très efficace.  Il liste les champs présent dans une collection et dispose de plusieurs options pour affiner les résultats. Pour l'utiliser, il suffit de télécharger le fichier [variety.js](https://github.com/variety/variety/blob/master/variety.js). Depuis la console de commande, on exécute alors : `mongo mydatabase --eval "var collection = 'invoices'" variety.js` Les arguments sont donc le nom de la base ainsi que la collection. En sortie, Variety va afficher un tableau contenant les informations sur chaque champ:
```
+---------------------------------------------------------------+
| key              | types   | occurrences |     percents       |
| ---------------- | ------- | ----------- | ------------------ |
| _id              | String  |         318 | 100.00000000000000 |
| quantity         | Number  |         318 | 100.00000000000000 |
| unit_price       | Number  |         318 | 100.00000000000000 |
| validated        | Boolean |         318 | 100.00000000000000 |
| partial          | Array   |         34  | 10.69182389937107 |
| partial.XX.price | Number  |         34  | 10.69182389937107 |
| partial.XX.title | String  |         34  | 10.69182389937107 |
+---------------------------------------------------------------+
```
Et voila! Le tour est joué!