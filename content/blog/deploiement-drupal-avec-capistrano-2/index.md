---
layout: post
title: "Deploiement Drupal 7 avec Capistrano 2"
author: mikaoelitiana
date: 2014-12-01T15:59:00+01:00
categories: ["Uncategorized"]
slug: deploiement-drupal-avec-capistrano-2
excerpt: "
				"
draft: true
meta_title: "Deploiement Drupal 7 avec Capistrano 2"
---

[Capistrano](http://capistranorb.com/ "Capistrano")  est un outil assez connu par les développeur Ruby et il permet de faire des déploiements automatisés de manière simple. Je me suis penché sur son utilisation dans Drupal et la manière de l'utiliser avec Drush pour automatiser autant que possible les déploiements.

## Prérequis

Pour utiliser Capistrano, il faut disposer d'une installation de Ruby (>1.9). Il faut aussi disposer d'un accès SSH aux serveurs distant et drush doit être installé sur ceux-ci.

## Installation de Capistrano 2

Nous commençons par l'installation de _bundle _qui va nous permettre de gérer les versions et dépendances des composants que nous allons utiliser.
```
gem install bundle
cd /REPERTOIRE/DE/DEPLOYEMENT
bundle init
```
Nous venons donc d'initialiser le dossier depuis lequel nous allons lancer les déploiements. Nous allons maintenant ajouter les composants, dont Capistrano lui-même. La dernière commande précédente a créé le fichier Gemfile dans le repertoire. Nous allons ajouter quelques lignes à ce fichier.
```

```
group :development do
  gem 'capistrano', '~> 2.15.5'
  gem 'railsless-deploy'
  gem 'capdrupal'
end
```
 
```
Nous avons mis en place les dépendances et nous allons les télécharger : `bundle install` Bundle installe toutes les dépendances dont nous avons besoin. Nous allons maintenant initialiser la configuration de déploiement. Toujours en ligne de commande dans le dossier contenant le projet, nous lançons : `capify .` Et voila, nous avons installé Capistrano 2. Jusque là tout va bien :)

**Configuration de Capfile** Le fichier Capfile a été créé et contient les instructions de base pour le déploiement. Il permet de définir les dépendances et de charger les fichiers de configurations que nous verrons plus bas.
```
load 'deploy'
# Uncomment if you are using Rails' asset pipeline
# load 'deploy/assets'
load 'config/deploy' # Charge tous les fichiers de configuration dans le dossier config/deploy

# Dependences
require 'rubygems'
require 'capdrupal'


```
**Configuration des environnements** Nous pouvons maintenant créer les fichiers de configuration pour les divers environnements. Un fichier est créé pour chaque environnement dans le dossier config/deploy. L'exemple ci-dessous concerne le serveur de recette, le fichier a donc tout simplement été nommé recette.rb et il sera chargé automatiquement. Voici le contenu de ce fichier :
```
# Les informations sur l'utilisateur ssh
set :user, "user"
set :group, "user"
set :runner_group, "user"

# Définition du domaine et des chemins de déploiement sur la machine distante
set :domain, "recette.example.com"
set :deploy_to, "/var/www/html/recette/"
set :current_dir, ''

# Définitiion de la commande drush
set:drush_cmd, "drush --uri=recette.example.com"

# Les fichiers/dossier suivants ne sont pas contenu dans l'outil de versionning
set :shared_children, ['sites/default/files']
set :shared_files, ['sites/recette.example.com/settings.php', '.htaccess'] 

role :web, "recette.example.com" # Your HTTP server, Apache/etc
role :app, "recette.example.com" # This may be the same as your `Web` server
# role :db, "your primary db-server here", :primary => true # This is where Rails migrations will run

# SCM : Nous définissons le système de versionning que nous utilisons : hg, git, etc...
set :scm, "git"
set :repository, "/var/www/html/repo"
set :branch, "trunk"


```
Enfin, nous allons lançer le déploiement. Il faut commencer par pousser les changements vers le serveur distant. Ensuite, dans la console, à partir du dossier du projet, il faut executer : `bundle exec cap recette deploy` Cette commande effectue toutes les actions nécessaires sur le serveur pour déployer le projet : mise en mode maintenance, création des archives, mise à jour de la base de donnée, nettoyage du cache, revert des features, etc.. Nous pouvons également définir des opération supplémentaires selon le besoin : sauvegarde de la base de données, envoi de mail de notification, etc... En conclusion, l'utilisation de Capistrano pour les déploiements de projet Drupal permet un gain important de temps et assure l’exécution automatique de plusieurs tâches.