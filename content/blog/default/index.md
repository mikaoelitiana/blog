---
layout: post
title: "Envoyer un email avec node.js et AWS SES"
lang: fr
author: mikaoelitiana
date: Invalid date
categories: ["Français", "Javascript", "node.js"]
slug: default
excerpt: "
				"
draft: true
meta_title: "Envoyer un email avec node.js et AWS SES"
---

Amazon propose une très large panoplie de service pour les développeur. J'ai récemment travaillé avec l'un de ceux-ci pour envoyer des emails depuis une application node.js. Nous avons ainsi utilisé [AWS SES (Simple Email Service).](https://aws.amazon.com/fr/ses/) Ce service est assez souple et permet de configurer tous les paramètres de l'envoi de mail. Dans notre cas, nous avons mis en place une fonction permettant d'envoyer un email avec une pièce jointe quand un visiteur répond à une offre d'emploi et y attache son CV. Le défi auquel nous avons fait face est forme l'ensemble du contenu de l'email, depuis l'en-tête jusque au contenu de la pièce jointe. Voici un extrait de code permettant de créer un email et de l'envoyer avec la fonction sendRawEmail de l'API d'Amazon.
```
         // Delimitation des differentes parties de l'email
         var boundary = "MultipartReservedBoundaryText";
         // Définition de l'adresse d'envoi
         var data = "From: sender@example.comn";
         // Destinataire
         data += "To: receiver@example.comn";
         // Sujet
         data += "Subject: Réponse à une offre d'emploin";
         data += "MIME-Version: 1.0n";
         data += "Content-type: Multipart/Mixed; boundary="" + boundary + ""nn";
         // Première partie du message, le contenu texte
         data += "--" + boundary + "n";
         data += "Content-Type: text/plainnn";
         data += "Bonjour, nnUne réponse à été envoyée sur l'offre d'emploi " + req.body.position + "nn";
         data += "Nom: " + req.body.name + "n";
         data += "Email: " + req.body.email + "n";
         data += "Message: " + req.body.message + "nn";
         // Ajout d'un fichier attaché
         if(typeof(req.files.resume) != 'undefined'){
             // Nous lisons le contenu du fichier et l'ecrivons dans un buffer
             var content = fs.readFileSync(req.files.resume.path);
             var buffer = new Buffer(content);
             // Insertion de la 2eme partie du message, le fichier attaché
             data += "--" + boundary + "n";
             data += "Content-Type: " + req.files.resume.mimetype + "n";
             data += "Content-Disposition: attachment; filename= "" + req.files.resume.originalname + "" ;size=" + req.files.resume.size +"n";
             data += "Content-Transfer-Encoding: base64nn";
             // Nous ajoutons le contenu du fichier en base64
             data += buffer.toString('base64');
         }
         data += "--" + boundary + "--";
```
Une fois le contenu de l'email prêt, nous pouvons l'envoyer avec la fonction sendRawEmail: