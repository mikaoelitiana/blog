---
layout: post
title: "React Native Android - Générer versionCode et versionName depuis package.json"
lang: fr
author: mikaoelitiana
date: 2018-06-04T17:59:41+02:00
categories: ["DevOps", "Français", "Javascript", "react", "react-native"]
slug: react-native-android-generer-versioncode-et-versionname-depuis-package-json
excerpt: "
				"
draft: false
meta_title: "React Native Android - Générer versionCode et versionName depuis package.json"
---

En travaillant sur un nouveau projet React Native, j'ai essayé d'améliorer la configuration pour faciliter au tant que possible les mises à jour.

### Rappel

Je vais commencer par rappeler rapidement le fonctionnement des mise à jours d'applications, particulièrement pour Android sur le Play Store. Quand on veut soumettre une nouvelle version d'une application sur Play Store, il est demandé de télécharger un fichier APK avec un _versionCode_ (nombre entier) supérieur à celui du dernier APK envoyé. Par exemple, la toute première version de l'application publiée sur Play Store peut porter le _versionCode_ 1. Une nouvelle mise à jour doit avoir _versionCode_ 2 ou plus et ainsi de suite à chaque mise à jour. De manière générale, le _versionCode_ peut être déclaré dans _AndroidManifest.xml_ ou dans la configuration de Gradle (build.gradle) comme on peut le voir ci-dessous:
```
android {
    compileSdkVersion 23
    buildToolsVersion "23.0.1"

    defaultConfig {
        applicationId "com.myproject"
        minSdkVersion 16
        targetSdkVersion 22
        versionCode generatedVersionCode
        versionName generatedVersionName
        ndk {
            abiFilters "armeabi-v7a", "x86"
        }
    }
// ...
}
```

### Cas de React Native

Pour React Native, nous pouvons voir les choses différemment. En effet, nous travaillons principalement avec du Javascript et il semble plus pertinent de baser la version de l'application Android en utilisant la version du projet dans _package.json_
```
{
  "name": "myproject",
  "version": "0.0.1"
}
```
Ici, la version utilise le principe _SemVer_ qui n'est pas un entier mais une composition de 3 entiers (la version majeure, la version mineure et le numero du patch).  Nous pourrions utiliser une concaténation de ces 3 entiers pour former le _versionCode_ attendu par Play Store. De ce fait, il ne sera plus nécessaire de modifier plusieurs fichiers quand on veut publier une nouvelle version de l'application. En effet, il faudrait changer la version dans _package.json_ et celle dans _build.gradle_ autrement.

### Des fonctions pour générer versionCode et versionName

La solution que nous avons retenue est de créer 2 fonctions dans _build.gradle_. La première doit lire le fichier package.json et récupérer la version. La seconde function doit générer un nombre entier depuis la version trouvée dans _package.json_ en supprimant les points (".") et en transformant le résultat en entier. Par exemple, "0.0.1" va donner la _versionCode_ 1, "1.0.1" la _versionCode_ 101. Nous commençons par ajouter à l'entête du fichier _build.gradle_ l'import suivant: `import groovy.json.JsonSlurper` Ensuite, nous ajoutons les 2 fonctions dans le corps du fichier
```
def getVersionName() {
    def inputFile = new File("../package.json")
    def packageJson = new JsonSlurper().parseText(inputFile.text)
    return packageJson["version"]
}

def getVersionCode() {
    def versionName = getVersionName()
    def versionCode = versionName.replace('.', '').toInteger()
    return versionCode
}
```
Enfin, nous appellons ces fonctions et plaçons les résultats dans des variables qui seront utilisées dans la configuration comme suit:
```
def generatedVersionName = getVersionName()
def generatedVersionCode = getVersionCode()

android {
    compileSdkVersion 23
    buildToolsVersion "23.0.1"

    defaultConfig {
        applicationId "com.myproject"
        minSdkVersion 16
        targetSdkVersion 22
        versionCode generatedVersionCode
        versionName generatedVersionName
        ndk {
            abiFilters "armeabi-v7a", "x86"
        }
    }
// ...
}
```

### Conclusion

Avec cette modification relativement simple, nous facilitons les prochaines mises à jour prévue sur notre application. C'est du travail en moins mais surtout une source d'erreur en moins pour le projet.