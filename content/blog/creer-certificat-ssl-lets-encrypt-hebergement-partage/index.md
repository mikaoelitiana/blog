---
layout: post
title: "Comment créer un certificat SSL Let's Encrypt pour hébergement partagé?"
lang: fr
author: mikaoelitiana
date: 2017-03-30T10:17:06+02:00
categories: ["certificat", "DevOps", "Français", "https", "Let's Encrypt"]
slug: creer-certificat-ssl-lets-encrypt-hebergement-partage
excerpt: "
				"
draft: false
meta_title: "Comment créer un certificat SSL Let's Encrypt pour hébergement partagé?"
---

Héberger un site internet est aujourd'hui très facile et accessible au grand publique en souscrivant à un hébergement partagé. Pourtant, il arrive souvent que pour sécuriser son site web avec un certificat SSL, il faudra débourser un somme importante en plus du service d'hébergement. Le prix d'un certificat peut même être plus cher que l'hébergement annuel lui-même. Heureusement que depuis un certain temps, [Let's Encrypt](https://letsencrypt.org) a été créé pour permette à tous de créer gratuitement un certificat SSL. Son utilisation n'est cependant pas très facile et un utilisateur lambda pourrait facilement s'y perdre. Surtout que dans la majorité des cas, Let's Encrypt est utilisé sur un serveur avec un accès SSH (et même root) qui n'est pas forcément disponible sur un hébergement partagé. Nous allons voir ainsi comment créer un certificat et local sur son ordinateur et l'ajouter ensuite au serveur partagé via cPanel. Pour cet exemple, j'ai utilisé Mac OS mais le principe reste le même pour les autres systèmes. Nous commençons par cloner le dépôt git de Let's Encrypt. Votre ordinateur doit donc disposé de [git](https://git-scm.com/) préalablement. Nous saisissons alors la commande suivante: `git clone https://github.com/letsencrypt/letsencrypt` Ensuite, nous entrons dans le nouveau répertoire créé et exécutons la commande de création du certificat en mentionnant le ou les domaines concernés (pour mon cas mikaoelitiana.name et www.mikaoelitiana.name):
```
cd letsencrypt
./letsencrypt-auto certonly --debug -a manual --rsa-key-size 4096 -d mikaoelitiana.name -d www.mikaoelitiana.name
```
Let's Encrypt va ensuite vouloir validé que j'ai bien accès à ce domaine et va me demander de créé un fichier en particulier dans un répertoire du site internet:
```
Make sure your web server displays the following content at
http://www.mikaoelitiana.name/.well-known/acme-challenge/7NJRBCoEhqM3aRhMz9gaZ1st2LDwA5RgCDqbHZdLQvI before continuing:

7NJRBCoEhqM3aRhMz9gaZ1st2LDwA5RgCDqbHZdLQvI.TcEBI4cemuAdQQi4Vo0OA-aEtQc75M9-c3t0ABTCu9A
```
Je peux ainsi créer le dossier _.well-known/acme-challenge_ à la racine du site web et y ajouter un fichier nommé _7NJRBCoEhqM3aRhMz9gaZ1st2LDwA5RgCDqbHZdLQvI_ contenant _7NJRBCoEhqM3aRhMz9gaZ1st2LDwA5RgCDqbHZdLQvI.TcEBI4cemuAdQQi4Vo0OA-aEtQc75M9-c3t0ABTCu9A. _Notez que cette chaîne sera créée aléatoirement et ne sera donc jamais la même ailleurs. Après cette étape, le certificat sera généré et un message indiquera l'emplacement des fichiers ainsi que la date d'expiration du certificat.
```
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/mikaoelitiana.name/fullchain.pem. Your cert
   will expire on 2017-06-28. To obtain a new or tweaked version of
   this certificate in the future, simply run letsencrypt-auto again.
   To non-interactively renew *all* of your certificates, run
   "letsencrypt-auto renew"
```
Nous pouvons enfin nous rendre dans le dossier indiqué et voir le contenu des fichiers générés. Un accès root est normalement demandé donc nous allons exécuter :
```
sudo su
cd /private/etc/letsencrypt/archive/mikaoelitiana.name
```
Je me rends ensuite dans mon cPanel pour y ajouter ces fichiers du certificat. Dans mon cas, il y a un menu SSL/TLS qui permet de gérer mes certificats par domaines. ![](./Capture-d-ecran-2017-03-30-à-11.02.45-1024x838.png) Un formulaire va alors me permettre de choisir le domaine à sécuriser, le contenu du certificat (CRT) qui correspond au fichier _cert1.pem_, Private Key (KEY) qui est dans le fichier _privkey1.pem_ et Certificat Authority Bundle qui est dans le fichier _chain1.pem_ ![](./Capture-d-ecran-2017-03-30-à-11.08.55-813x1024.png) Une fois que c'est fait, je peux maintenant accéder à mon site en utilisant [https](https://mikaoelitiana.name). Un grand merci Let's Encrypt et n'hésitez pas à les [soutenir](https://letsencrypt.org/donate) et partager autour de vous. _Source: [https://community.letsencrypt.org/t/tutorial-for-os-x-local-certificates-and-shared-hosting/6859/16](https://community.letsencrypt.org/t/tutorial-for-os-x-local-certificates-and-shared-hosting/6859/16)_