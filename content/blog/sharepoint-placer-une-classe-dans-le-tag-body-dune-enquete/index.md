---
layout: post
title: "Sharepoint - Placer une classe dans le tag body d'une enquete"
lang: fr
author: mikaoelitiana
date: 2015-05-21T17:22:40+02:00
categories: ["Français", "Javascript", "pll_555df8463b8b8", "Sharepoint 2013", "Sharepoint 2013"]
slug: sharepoint-placer-une-classe-dans-le-tag-body-dune-enquete
excerpt: "
				"
draft: false
meta_title: "Sharepoint - Placer une classe dans le tag body d'une enquete"
---

J'ai récemment travaillé sur la personnalisation d'une enquête sur un site Sharepoint. Des éléments de l'affichage ainsi que les styles sont modifiés en utilisant CSS et l'injection Javascript. Le problème que j'ai rencontré est que Sharepoint n'a pas de classe ou identifiant dans la structure HTMl qui permet d'identifier facilement une page d'une enquête et la différencier d'autres pages du site. Après un bon moment de recherche et d'essais, j'ai finalement trouvé le moyen d'ajouter une classe particulière quand l'utilisateur est sur une des pages d'une enquête. La solution utilise le JSOM pour identifier la liste liée à la page en cours et identifier le modèle utilisée par la liste. Le code pour les listes basée sur l'application enquête est 102. Je peux alors maintenant vérifier si j'ai la valeur 102 comme liste de base et ajouter une classe "survey" quand c'est le cas. Voici le bout de code dans l'application :
```
// Check if page is from a survey list
function getIsQuizPage() {
 context = new SP.ClientContext.get_current();
 web = context.get_web();
 listColl = web.get_lists();
 list = listColl.getById(_spPageContextInfo.pageListId);
 context.load(list);
 context.executeQueryAsync(Function.createDelegate(this, this.onQueryIsQuizzSucceeded), Function.createDelegate(this, this.onQueryIsQuizzFailed));
}

// Success Callback
function onQueryIsQuizzSucceeded() {
 // If list is survey, add survey class
 if (list.get_baseTemplate() == '102') {
 jQuery('body').addClass('survey');
 }
}

// Error Callback
function onQueryIsQuizzFailed(sender, args) {
 alert('Request failed. ' + args.get_message() + 'n' + args.get_stackTrace());
}


```
Avec ce code, je peux maintenant utiliser le sélecteur "body.survey" dans mon CSS et JS pour personnaliser les pages des enquetes. J’espère que cela peut aider! N'hésitez pas à laisser un commentaire.