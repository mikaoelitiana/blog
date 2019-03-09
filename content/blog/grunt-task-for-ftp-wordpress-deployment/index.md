---
layout: post
title: "Grunt task for FTP Wordpress deployment"
lang: en
author: mikaoelitiana
date: 2016-01-12T15:24:02+01:00
categories: ["deploy", "DevOps", "English", "ftp", "grunt", "Wordpress"]
slug: grunt-task-for-ftp-wordpress-deployment
excerpt: "
				"
draft: false
meta_title: "Grunt task for FTP Wordpress deployment"
---

You may certainly say  "FTP??? Nooooo!!!!". But yes, FTP is still used on many "basic" websites and I ran on of them today. I needed to deploy a Wordpress website via FTP on a shared hosting server. So to ease the job, I created a [Grunt](http://gruntjs.com/) task to upload files so it can be done automatically.  If you are new to grunt, you can learn more [here](http://gruntjs.com/getting-started).  Grunt is a javascript task runner we can use it to minify files, deploy changes, run tests, etc... You are required to install npm modules grunt, grunt-cli to run Grunt on a machine. I then searched through the web and found the very nice [grunt-ftp-deploy](https://github.com/zonak/grunt-ftp-deploy) module. We just need to make some configuration to make it work. Let's just create the Gruntfile.js file with the following content in your Wordpress folder:
```
module.exports = function (grunt) {
  grunt.initConfig({
    'ftp-deploy': {
      build: {
        auth: {
          host: 'YOUR-FTP-HOST',
          port: 21,
          authKey: 'key1',
          authPath: '.ftpconfig'
        },
        src: 'YOUR-LOCAL-PATH',
        dest: 'YOUR-REMOTE-PATH',
        exclusions: ['.git*', 'node_modules', 'wp-admin', 'wp-content/uploads', '.DS_Store', 'search*', '.ftpconfig', 'wp-config*'],
        forceVerbose: true
      },
      theme: {
        auth: {
          host: 'YOUR-FTP-HOST',
          port: 21,
          authKey: 'key1',
          authPath: '.ftpconfig'
        },
        src: 'YOUR-LOCAL-PATH/wp-content/themes/THEME',
        dest: 'YOUR-REMOTE-PATH/wp-content/themes/THELE',
        exclusions: ['.git*', 'node_modules', 'wp-admin', 'wp-content/uploads', '.DS_Store', 'search*', '.ftpconfig'],
        forceVerbose: true
      }
    },
  });

  grunt.loadNpmTasks('grunt-ftp-deploy');

  grunt.registerTask('deploy', [
    'ftp-deploy'
  ]);
  grunt.registerTask('deploy:theme', [
    'ftp-deploy:theme'
  ]);
};

```
You will need to replace YOUR-FTP-HOST, YOUR-LOCAL-PATH, YOUR-REMOTE-PATH and THEME variables.  You will also create the .ftpconfig file to store authentication parameters as follows :
```
{
  "key1": {
    "username": "USERNAME",
    "password": "PASSWORD"
  }
}
```
I decided to create two main tasks : one to upload all files, one to upload only the specific theme files because they are often updated and I don't need to upload all files when only theme is changed. You can create as much tasks as you need, say to upload only plugins, languages, etc... For that, you will add a new json structure under ftp-deploy in  grunt.initConfig and a news grunt.registerTask just as in the example. We can finally execute the main task in your console with: `$ grunt deploy` To run the theme deployment task only, use `$ grunt deploy:theme` This helped me ease the website deployment process and I hope this will be helpfull for you as well.