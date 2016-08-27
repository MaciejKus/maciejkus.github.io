---
layout: post
title: "CRUD-job-app"
date: 2016-08-20 11:07:52 -0700
comments: false
categories: react, angular, node
description: a full stack CRUD app used to keep track of jobs one has applied to.
---

I've been making a full-stack CRUD application. It's meant to keep track of jobs that one has applied to. The backend is Nodejs and Mongodb. I built two different front ends, one with React and the other with Angular. There was no need to build two frontends, but I wanted the practice of building the same project using two different frameworks.

The code is at [https://github.com/MaciejKus/job-search-app](https://github.com/MaciejKus/job-search-app). The app allows the user to input job information, such as the company name and the title. This is saved in the database so that the user can keep track of jobs he or she applied to.

Every job can be edited to update if the user got a reply from the company or any other notes that the user may wish to make. Jobs can also be deleted and added. 

I used routing in both the frontends. I didn't necessarily need to, but this app is meant to be a learning/practice experience rather than something I expect others to use.
