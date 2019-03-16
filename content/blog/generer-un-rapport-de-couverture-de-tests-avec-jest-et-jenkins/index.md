---
layout: post
title: "Générer un rapport de couverture de tests avec Jest et Jenkins"
lang: fr
author: mikaoelitiana
date: 2018-06-19T14:13:30+02:00
categories: ["DevOps", "Français", "Intégration continue", "Javascript", "jenkins"]
slug: generer-un-rapport-de-couverture-de-tests-avec-jest-et-jenkins
excerpt: "
				"
draft: false
meta_title: "Générer un rapport de couverture de tests avec Jest et Jenkins"
---

Dans cet article, j'explique comment publier un rapport de couverture de tests exécutés par [Jest](https://facebook.github.io/jest/) dans les builds automatiques Jenkins.

## Contexte du projet

Nous utilisons [Jest](https://facebook.github.io/jest/) pour exécuter les tests automatiques dans un de nos projets React Native. Le principe est de créer des fichiers de spécifications qui décrivent les comportements et sorties attendus des fonctions et des vues. Le but étant de couvrir un maximum de cas et de tester le plus grand nombre de fonctions et de vues, il est important d'avoir des chiffres pour évaluer le code qui est testé et celui qui ne l'est pas. Un rapport de couverture au format HTML serait très utile et facile à utiliser pour cela. En effet, Jest donne déjà un tableau récapitulatif et des statistiques quand on lance la commande `jest --coverage` Nous obtenons la sortie ci-dessous mais nous ne pouvons pas vraiment interagir avec ni lire facilement les informations importantes :
```
-----------------------|----------|----------|----------|----------|-------------------|
File                   |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------------|----------|----------|----------|----------|-------------------|
All files              |     82.5 |    77.16 |    77.34 |    84.16 |                   |
 components            |    83.47 |    76.19 |    80.49 |    84.35 |                   |
  arrow-down.js        |      100 |      100 |      100 |      100 |                   |
  arrow-forward.js     |      100 |      100 |      100 |      100 |                   |
  child-item.js        |      100 |      100 |      100 |      100 |                   |
  children-tabs.js     |    81.25 |       50 |       80 |    83.33 |    51,52,54,61,62 |
  error.js             |      100 |      100 |      100 |      100 |                   |
  gender-icon.js       |      100 |      100 |      100 |      100 |                   |
  header.js            |    90.91 |      100 |       75 |      100 |                   |
  link.js              |      100 |      100 |      100 |      100 |                   |
  net-wrapper.js       |      100 |      100 |      100 |      100 |                   |
  no-connection.js     |      100 |      100 |      100 |      100 |                   |
  sidebar-item.js      |      100 |      100 |      100 |      100 |                   |
  station.js           |      100 |      100 |      100 |      100 |                   |
  stations-dropdown.js |    53.85 |       25 |    44.44 |    53.85 |... 52,53,58,81,84 |
  tab-item.js          |      100 |      100 |      100 |      100 |                   |
  train-item.js        |    85.71 |       50 |      100 |    85.71 |                40 |
 lib                   |      100 |      100 |      100 |      100 |                   |
  transformers.js      |      100 |      100 |      100 |      100 |                   |
 screens               |    79.13 |    76.32 |    70.42 |    81.35 |                   |
  children-list.js     |    13.51 |        0 |     7.69 |    15.15 |... 58,162,164,166 |
  forgot-password.js   |      100 |       75 |      100 |      100 |          42,47,86 |
  login.js             |     97.3 |      100 |    90.91 |     97.3 |               108 |
  sidebar.js           |      100 |      100 |      100 |      100 |                   |
  train-list.js        |    91.84 |    95.45 |     87.5 |    97.67 |                65 |
  train.js             |    69.23 |       75 |    33.33 |    63.64 |       66,72,73,85 |
  update-password.js   |    94.59 |    96.15 |    86.67 |    94.59 |           116,134 |
 services/graphql      |      100 |      100 |      100 |      100 |                   |
  queries.js           |      100 |      100 |      100 |      100 |                   |
 utils                 |      100 |      100 |      100 |      100 |                   |
  account.js           |      100 |      100 |      100 |      100 |                   |
  dates.js             |      100 |      100 |      100 |      100 |                   |
  validators.js        |      100 |      100 |      100 |      100 |                   |
-----------------------|----------|----------|----------|----------|-------------------|

Test Suites: 26 passed, 26 total
Tests:       68 passed, 68 total
Snapshots:   29 passed, 29 total
Time:        230.485s
Ran all test suites.
Done in 231.36s.
```
Nous allons alors configurer notre projet ainsi que Jenkins pour obtenir un rapport HTML facile à exploiter.

## Préparation du projet

Pour commencer, nous allons demander à _Jest_ de générer un rapport [Coburtura](http://cobertura.github.io/cobertura/) au format XML. Il faut alors mettre à jour le fichier _package.json_ et y mettre la configuration suivante:
```
"jest": {
    "preset": "react-native",
    "coverageReporters": [
      "text",
      "cobertura",
    ],
// ...
}
```
Maintenant, quand nous lançons la commande de test _Jest_ mentionnée plus haut, un fichier nommé _cobertura-coverage.xml_ est créé dans le dossier _coverage_. C'est ce fichier que nous allons exploiter dans Jenkins pour avoir un rapport au format HTML. Dans le fichier _Jenkinsfile_, nous avons déjà défini un _pipeline_ avec plusieurs étapes dont la première est d'installer les dépendances et d’exécuter les tests :
```
stage('Test') {
            steps {
                echo 'Testing ....'
                sh 'yarn --pure-lockfile'
                sh 'yarn test --coverage'
            }
        }
```

## Préparation de Jenkins

Du côté de Jenkins, nous allons utiliser un plugin qui s'appelle _Cobertura Plugin_ qu'il faut installer et activer dans l'administration ![](./Capture-d-ecran-2018-06-19-à-13.41.00.png) Une fois que le plugin est activé, nous allons ajouter une nouvelle étape dans le fichier _Jenkinsfile_ :
```
stage('Publish Code QA') {
            steps {
                echo 'Publishing Code QA ....'
                cobertura autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: 'coverage/cobertura-coverage.xml', conditionalCoverageTargets: '70, 0, 0', failUnhealthy: false, failUnstable: false, lineCoverageTargets: '80, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '80, 0, 0', onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false
            }
        }
```
Pour obtenir ce code, vous pouvez vous rendre à l'adresse /pipeline-syntax/ de votre projet Jenkins (par exemple http://jenkins.local/job/MobileApp/pipeline-syntax/). Un formulaire s'affiche et vous devez choisir **c**<span style="message-body-wrapper"><span style="message-flex-body"><span style="message-body devtools-monospace"><span style="objectBox objectBox-string">**obertura: Publish Cobertura Coverage**</span></span></span></span> <span style="message-body-wrapper"><span style="message-flex-body"><span style="message-body devtools-monospace"><span style="objectBox objectBox-string">**Report**</span></span></span></span> <span style="message-body-wrapper"><span style="message-flex-body"><span style="message-body devtools-monospace"><span style="objectBox objectBox-string">avant de préciser le chemin du fichier XML. Quand vous validez ce formulaire, le code correspondant sera affiché dans le champ texte en dessous :</span></span></span></span> ![](./Capture-d-ecran-2018-06-19-à-13.46.36-1024x500.png)

## Résultats

Tout est maintenant prêt et à la fin d'un _job_ de Jenkins, vous aurez accès à un graphique dans la partie droite du _dashboard_ et un lien qui s'appelle **Coverage Report** vers le rapport HTML dans le menu à gauche. ![](./Capture-d-ecran-2018-06-19-à-13.53.06-1024x425.png) Quand vous cliquez sur le lien _Coverage Report_, la page principale du rapport s'affiche et vous pourrez voir en détail chaque dossier et chaque fichier de votre projet pour voir le code qui est bien couvert et celui qui ne l'est pas. ![](./Capture-d-ecran-2018-06-19-à-13.56.02-1024x503.png)

## Conclusion

La mise en place de ce rapport m'a beaucoup aidé dans le suivi et l'amélioration de ce projet. J'espère que cet article pourra vous aider ou vous inspirer dans le même sens. N'hésitez pas à partager des solutions que vous connaissez pour un résultat similaire.