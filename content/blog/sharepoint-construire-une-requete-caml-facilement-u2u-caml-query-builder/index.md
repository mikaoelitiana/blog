---
layout: post
title: "SharePoint - Construire une requête CAML facilement avec U2U CAML Query Builder"
lang: fr
author: mikaoelitiana
date: 2015-06-08T16:28:17+02:00
categories: ["Caml", "Français", "pll_5575abe2a670c", "Sharepoint 2013", "Sharepoint 2013", "Web"]
slug: sharepoint-construire-une-requete-caml-facilement-u2u-caml-query-builder
excerpt: "
				"
draft: false
meta_title: "SharePoint - Construire une requête CAML facilement avec U2U CAML Query Builder"
---

Je travaille actuellement sur une application SharePoint 2013 pour un de nos clients et l'application manipule plusieurs données déjà existantes sur le site afin de construire un tableau de bord des données. A la différence des applications web "traditionnelles", les applications pour SharePoint n'utilisent pas SQL pour accéder aux données depuis le site hôte. C'est plutôt le langage [CAML](http://caml.inria.fr/) qui est préconisé pour former les requêtes vers SharePoint. Ce langage utilise des balises pour les éléments de la requête. Voici un exemple d'une requête CAML sur une liste de SharePoint :
```
<Query>
   <Where>
      <And>
         <Eq>
            <FieldRef Name='ContentType' />
            <Value Type='Computed'>Custom Type</Value>
         </Eq>
         <Or>
            <IsNull>
               <FieldRef Name='Etat' />
            </IsNull>
            <Eq>
               <FieldRef Name='Etat' />
               <Value Type='Choice'>Nouveau</Value>
            </Eq>
         </Or>
      </And>
   </Where>
</Query>
```
Nous pouvons y voir les balises comme Where, Eq, IsNull, etc... qui permettent de décrire ce que nous voulons avoir comme résultat. Cependant, il peut être difficile de créer "à la main" ces requêtes, surtout quand il faut récupérer différents champs personnalisés et quand les conditions deviennent plus complexes.  Il existe plusieurs outils pour remédier à cela. J'ai testé [U2U CAML Query Builder](http://www.u2u.be/Software) qui permet de se connecter à un site SharePoint, d'y trouver la liste sur laquelle on souhaite récupérer les données et construire la requête depuis des listes de sélections. Le logiciel est très simple d'utilisation. Il faut commencer par se connecter à un site SharePoint sur l'interface de démarrage : [![u2u3](./u2u3.png)](./u2u3.png) La liste des listes du sites s'affiche ensuite et il faut en sélectionner une pour créer un nouvelle requête. Les éléments de la listes sont alors chargées et il suffit de les sélectionner pour former une requête. Un bouton permet ensuite de lancer la requête pour vérifier qu'on récupère les bons résultats. ![u2u1](./u2u1-1024x536.png) Pour couronner le tout, un onglet permet de copier le bout de code à insérer dans l'application pour exécuter la requête. En résumé, c'est un outil vraiment utile et pratique pour tout développeur d'application SharePoint! N'hésitez pas à laisser un commentaire pour partager vos expériences avec d'autres outils du même genre.