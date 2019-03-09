---
layout: post
title: "Sharepoint - Add a custom class in Survey body"
lang: en
author: mikaoelitiana
date: 2015-05-21T17:11:31+02:00
categories: ["CSOM", "English", "Javascript", "Non classé", "pll_555df8463b8b8", "Sharepoint 2013"]
slug: sharepoint-add-a-custom-class-in-survey-body
excerpt: "
				"
draft: false
meta_title: "Sharepoint - Add a custom class in Survey body"
---

I have recently worked in a Sharepoint project to add customizations to the Survey application. Designs and UX was changed using CSS and JS injection and I found it difficult to find the right selector for CSS and Javascript. I looked arround the internet to find some idea and I finally found a way to add a class to a page when it belongs to a survey. The solutions uses the JSOM to load the current list and find it's base template. The base template for survey is 102. I can then easily check if the list has this base template ID and then add a class to the body tag. Here is the sample code :
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
Now I can create an dozen of Survey and easily identify them with the body.survey selector. I hope this will help!!