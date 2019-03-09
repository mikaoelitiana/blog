---
layout: post
title: "Git cache for continuous integration jobs"
lang: en
author: mikaoelitiana
date: 2016-03-04T07:08:08+01:00
categories: ["DevOps", "English", "git"]
slug: git-cache-for-continuous-integration-jobs
excerpt: "
				"
draft: false
meta_title: "Git cache for continuous integration jobs"
---

In this article, I will explain how I solved a large git repository clone issue we had during our continuous integration job. The fact is that we have a Cordova project using multiple plugins. Most of these plugins are stored in git repositories and some of them or their dependencies are really large. This can slow our job execution or even make it fail (due to timeout) as it depends on our internet connection.. ![](./Capture-d’écran-2016-03-04-à-09.01.05-1024x173.png) I decided to find a way to "cache" repository so the build jobs wouldn't use internet connection each time they need to clone the plugin repository without changing plugins files. The solution I found was to use our  locally hosted gitlab as a mirror for the large repository and force git to use it using the git configuration "insteadOf" I created a new repository in our gitlab to host the large plugin repository and I cloned it's content from remote location once. I then added the following configuration for git inside the CI job runner machine: `git config --global url."<url of local gitlab mirror>".insteadOf "<url of primary repository>"` Now I just need to regularly update the local mirror with a simple cron job for example. The Gitlab Enterprise Edition can also automatically update it's repository from remote origin. The result is just impressive : one job that could take more than an hour before of large repository clone will now execute in less than 10min. ![CI Job successes](./Capture-d’écran-2016-03-04-à-08.59.56-1024x181.png)