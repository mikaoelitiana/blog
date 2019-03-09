---
layout: post
title: "Sharepoint - Set browser for app development tests"
lang: en
author: mikaoelitiana
date: 2015-05-18T10:56:39+02:00
categories: ["English", "pll_555ca504943cb", "Sharepoint 2013"]
slug: choix-navigateur-developpements-applications
excerpt: "
				"
draft: false
meta_title: "Sharepoint - Set browser for app development tests"
---

I am working on a new Sharepoint app development and I need to often deploy and test it. My default browser is Google Chrome and each time a launch my app test, it's opened in Chrome. The problem is that I want to test it in IE instead of Chrome because it's the recommanded browser it the target organisation where I will deploy the application. I was really happy to discover that this is really simple to configure in Visual Studio, through the solution properties. I can switch from available browser in Properties > Start Action : [![sp-app-browser](./sp-app-browser.png)](./sp-app-browser.png) Now, I didn't had to change my default browser and test in the target browser without copying and pasting each time I launch my app!!  {:}