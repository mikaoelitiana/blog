---
layout: post
title: "Un dépôt Github comme CV"
lang: fr
author: mikaoelitiana
date: 2018-05-29T21:38:42+02:00
categories: ["CV", "DevOps", "Français", "github", "Intégration continue", "travis-ci", "Web"]
slug: un-depot-github-comme-cv
excerpt: "
				"
draft: false
meta_title: "Un dépôt Github comme CV"
---

Comme moi, vous êtes peut-être un développeur qui utilise régulièrement Github d'une manière ou d'une autre. Dans cet article, je vous partage comment créer et héberger votre CV dans un dépôt Github et comment le déployer sur une page web automatiquement et gratuitement.

### Créer son CV à la manière geek

Pour créer son CV, il y a aujourd'hui plusieurs options possibles comme utiliser des templates dans Office Word ou Google Docs. Pour les plus téméraires, il y a aussi la possibilité de commencer son CV en ligne de commandes, comme de vrais geeks. Pour cela, nous pouvons par exemple utiliser [resume-cli](https://jsonresume.org/getting-started/) qui utilise un simple fichier JSON pour décrire un CV. J'ai commencé par créer un nouveau dossier, disons _resume_, et je lance la commande pour initialiser mon CV:
```
mkdir resume
cd resume
npx resume-cli init
```
J'utilise ici npx pour ne pas avoir à installer globalement resume-cli. Un fichier _resume.json_ est créé. Je peux alors ouvrir ce fichier dans un éditeur de texte ([VSCode](https://code.visualstudio.com/) pour mon cas) et je modifie les données qui s'y trouvent. J'initialise ensuite un dépot git et j'y enregistre ce fichier.
```
git init
git add resume.json
git commit -m "Init my resume"
```

### Préparer le dépôt Github

Il y a plusieurs manières de sauvegarder et de distribuer son CV. Certains utilisent Dropbox ou des solutions similaires. Nous allons ici enregistrer notre CV dans un dépôt Github publique et générer une page web qui sera hébergée sur https://_UTILISATEUR_.github.io ([https://mikaoelitiana.github.io](https://mikaoelitiana.github.io) pour mon cas). Il faut commencer par créer un nouveau dépôt et le nommer de la manière _UTILISATEUR_/_UTILISATEUR_.github.io. Cela est très important pour que Github sache qu'il doit publier le contenu de ce dépôt. ![](./Capture-d-ecran-2018-05-29-à-21.12.44-1024x390.png) Vous pouvez maintenant configurer votre dépôt local pour le connecter au dépôt distant sur Github et y pousser les modifications. Cependant, si vous essayer à ce moment d'ouvrir l'adresse web https://_UTILISATEUR_.github.io, vous verrez une page 404 car il manque le fichier _index.html_. Nous allons remédier à cela dans la section suivante.

### Générer automatiquement la page web

Pour générer notre fichier web, nous allons commencer par mettre en place un script _npm_ comme raccourci. Pour cela, vous pouvez créer un fichier _package.json_ comme décrit ci-dessous:
```
{
  "name": "resume",
  "version": "1.0.0",
  "description": "CV de Mika ANDRIANARIJAONA",
  "main": "resume.json",
  "scripts": {
    "test": "./node_modules/.bin/resume test",
    "export-html": "./node_modules/.bin/resume export index --format html --theme kwan"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/mikaoelitiana/resume.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/mikaoelitiana/resume/issues"
  },
  "homepage": "https://github.com/mikaoelitiana/resume#readme",
  "dependencies": {
    "jsonresume-theme-kwan": "0.0.2",
    "resume-cli": "^0.4.19"
  }
}
```
Le script _export-html_ est un raccourci de la ligne de commande de _resume-cli_ qui exporte votre CV dans un format supporté. Nous utiliserons cette commande dans la configuration de Travis CI. Il faut ainsi créer le fichier .travis.yml et y placer les lignes suivantes:
```
language: node_js
node_js:
  - "7"
before_script:
  - npm install
script:
  - npm run export-html
deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GITHUB_TOKEN
  keep-history: true
  on:
    branch: master
  target-branch: master
```
Dans cette configuration, nous voyons que nous commençons par installer les dépendances avec _npm_. Ensuite nous lançons la génération du fichier HTML avec _npm run export-html_ que nous avons préalablement créé. Enfin, la partie _deploy_ indique que nous voulons déployer le fichier généré sur le dépôt Github. Pour cela, il faudra donc se munir d'un token d'accès généré dans Github avec le _scope_**public\_repo**. Vous pouvez maintenant vous rendre sur [Travis CI](https://travis-ci.org/) et vous connecter à votre compte ou en créer un avant d'activer le répertoire Github que nous avons ainsi créé. Il faudra par ailleurs placer dans la configuration de Travis CI le token Github mentionné ci-dessus . ![](./Capture-d-ecran-2018-05-29-à-21.29.39-1024x560.png)

### Conclusion

Voila, tout est maintenant prêt et vous pouvez regarder le build exécuté dans Travis CI. Une fois le build terminé, vous pourrez enfin ouvrir https://UTILISATEUR.github.io et y admirer votre CV. Partager ensuite ce lien à vos potentiels recruteurs, cela pourrait vous donner des points d'avances face à d'autre concurrents. Enfin, si vous voulez très rapidement mettre en place votre CV, n'hésitez pas à cloner mon CV sur [https://github.com/mikaoelitiana/mikaoelitiana.github.io](https://github.com/mikaoelitiana/mikaoelitiana.github.io) et à modifier les données par les vôtres.