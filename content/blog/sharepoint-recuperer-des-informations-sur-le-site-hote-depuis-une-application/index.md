---
layout: post
title: "Sharepoint - Récupérer des informations sur le site hôte depuis une application"
lang: fr
author: mikaoelitiana
date: 2015-05-15T10:19:20+02:00
categories: ["Français", "Javascript", "Sharepoint 2013", "Sharepoint 2013", "Web"]
slug: sharepoint-recuperer-des-informations-sur-le-site-hote-depuis-une-application
excerpt: "
				"
draft: false
meta_title: "Sharepoint - Récupérer des informations sur le site hôte depuis une application"
---

J'ai récemment créer une petite application Sharepoint qui servira de tableau de bord sur un site hôte. J'ai donc besoin d'accéder à plusieurs informations du site dans mon application comme la liste des sous-sites, la liste des documents, etc.. Pour cela, mon application utilise l'API Javascript qui fait un appel à distance vers Sharepoint.  Plusieurs exemples sont déjà disponibles en ligne pour apprendre à créer son application avec Javascript. Le point qui a été un peu complexe à trouver dans mon cas est de faire des appels vers l'hôte Sharepoint en "Cross-domain". En effet, à la base, mon application est assez indépendant du site Sharepoint hôte et je n'ai pas accès à toutes les données dès le départ. Dans mon exemple, j'essaie de récupérer les sous-sites du site hôte avec un code très simple :
```
 <span style="js__sl_comment">// Charge les sous-sites</span> web = appContextSite.get_web(); subsites = web.getSubwebsForCurrentUser(null); 
    context.load(subsites) 
    context.executeQueryAsync(ExecuteOnSubSitesSuccess, ExecuteOnSubSitesFailure);
```
C'est la fonction _**getSubwebsForCurrentUser**_qui fait le gros du travail pour récupérer la liste des sous-sites. Le problème que j'ai rencontré est que même si le site hôte a bien plusieurs sous-site, cette fonction retourne une liste vide. Il m'a fallu un peu de temps pour comprendre qu'en fait, dans ce cas simple, ce code va retourner la liste des sous-sites de mon application et non de ceux du site hôte! Pour pouvoir lire ces informations du site hôte, il y a quelques modification à faire dans le script et il faut charger un fichier JS qui va permettre de faire des requêtes à distance sur le site hôte. Je charge donc le fichier _**<span style="js__string">SP.RequestExecutor.js</span>**_ <span style="js__string">avant de lancer la requête:</span>
```
ExecuteOrDelayUntilScriptLoaded(LoadHostConfiguration, <span style="js__string">"sp.js"</span>); 
<span style="js__sl_comment">//Get host configuration</span>
<span style="js__operator">function</span> LoadHostConfiguration() <span style="js__brace">{</span>
<span style="js__sl_comment">//Récupération des URL de l'hote et de l'appli</span> hostweburl = 
        <span style="js__function">decodeURIComponent</span>( 
            getQueryStringParameter(<span style="js__string">"SPHostUrl"</span>) ); appweburl = 
        <span style="js__function">decodeURIComponent</span>( 
            getQueryStringParameter(<span style="js__string">"SPAppWebUrl"</span>) 
    ); 
 
    <span style="js__sl_comment">// Get file from ressources path: </span>
<span style="js__sl_comment">// web_url/_layouts/15/resource </span>
<span style="js__statement">var</span> scriptbase = hostweburl + <span style="js__string">"/_layouts/15/"</span>; 
 
    <span style="js__sl_comment">// Load js file for cross-domain request</span>
**$.getScript(scriptbase + <span style="js__string">"SP.RequestExecutor.js"</span>, GetSubSites);**
<span style="js__brace">}</span>
```
Enfin, je crée la fonction qui permet de récupérer les sous-sites une fois le fichier _**<span style="js__string">SP.RequestExecutor.js </span>**_<span style="js__string">chargé : </span>
```
<span style="js__operator">function</span> GetSubSites() <span style="js__brace">{</span>
**context = <span style="js__operator">new</span> SP.ClientContext(appweburl); 
    <span style="js__statement">var</span> factory = SP.ProxyWebRequestExecutorFactory(appweburl); 
    context.set_webRequestExecutorFactory(factory); 
    <span style="js__statement">var</span> appContextSite = <span style="js__operator">new</span> SP.AppContextSite(context, hostweburl);** web = appContextSite.get_web(); subsites = web.getSubwebsForCurrentUser(null); 
    context.load(subsites) 
    context.executeQueryAsync(ExecuteOnSubSitesSuccess, ExecuteOnSubSitesFailure); 
<span style="js__brace">}</span> 
```
J'ai encore beaucoup à apprendre sur les best-practices des applications Sharepoint et j'ai publié un sample sur [Office Dev Center](https://code.msdn.microsoft.com/office/Sharepoint-2013-Get-hosts-dcbdbbbe) afin d'avoir des retours de la communauté et continuer à améliorer ce code.