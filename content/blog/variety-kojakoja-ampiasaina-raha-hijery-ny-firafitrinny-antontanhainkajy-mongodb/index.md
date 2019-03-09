---
layout: post
title: "Variety, kojakoja ampiasaina raha hijery ny firafitrin'ny antontan'hainkajy mongodb"
lang: mg
author: mikaoelitiana
date: 2015-09-04T13:51:05+02:00
categories: ["Malagasy", "mongodb", "nosql", "pll_55e985aa01edc"]
slug: variety-kojakoja-ampiasaina-raha-hijery-ny-firafitrinny-antontanhainkajy-mongodb
excerpt: "
				"
draft: false
meta_title: "Variety, kojakoja ampiasaina raha hijery ny firafitrin'ny antontan'hainkajy mongodb"
---

Nanomboka niasa tamina lamikajy iray mampiasa mongoDB izaho. Mba hahazoako miasa amimn'io nefa dia ilaiko ny mahazo haingana ny firafitry ny hainkajy miasa ao @ mongoDB ka hahafahako mampiasa ireo. Mba hahatsotra izany araka izay azo atao dia nampiasa ilay kojakoja atao hoe [Variety](https://github.com/variety/variety) izaho. Izy io dia mora ampiasaina ary mahafa-po tanteraka ny valiny omeny. Ny fomba fampiasana azy dia alaina amin'ny siton-davitra ilay vondrona hainkajy [variety.js](https://github.com/variety/variety/blob/master/variety.js). Rehefa azo izy io dia ampiasaina ao amin'ny efajoro fanomezana baiko : `mongo mydatabase --eval "var collection = 'invoices'" variety.js` Ampidirina eo izany ny anaran'ilay antotan'hainkajy. Ny valiny avokany kosa dia ireo rafitra miasa ao anatin'ilay hainkajy.
```
+---------------------------------------------------------------+
| key              | types   | occurrences |     percents       |
| ---------------- | ------- | ----------- | ------------------ |
| _id              | String  |         318 | 100.00000000000000 |
| quantity         | Number  |         318 | 100.00000000000000 |
| unit_price       | Number  |         318 | 100.00000000000000 |
| validated        | Boolean |         318 | 100.00000000000000 |
| partial          | Array   |         34  | 10.69182389937107  |
| partial.XX.price | Number  |         34  | 10.69182389937107  |
| partial.XX.title | String  |         34  | 10.69182389937107  |
+---------------------------------------------------------------+
```
Izao dia fantatro bebe kokoa ireo hainkajy ampiasaiko @ asako. PS: Tena sarotra ny manoratra momba ny solosaina @ fiteny malagasy :) . Nahita ito vondrona ito izaho nindramako ireo teny nampiasaina : https://groups.google.com/forum/#!topic/soc.culture.malagasy/3AeFDLI7Uj8