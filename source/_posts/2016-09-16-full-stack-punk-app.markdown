---
layout: post
title: "full stack punk app"
date: 2016-09-16 17:46:13 -0700
comments: false
description: A full stack app using React, Mongo, Nodejs
categories: javascript, react, mongo, nodejs
---

The San Francisco Bay Area is lucky enough to have someone named Steve who compiled a list of concerts in a simple text format for the last 20+ years. This served as a way for people to know where to find punk rock shows. You can see it <a href="http://jon.luini.com/thelist/thelist.txt">here</a>.

Because the format of the concert listings has largely been the same over the years I was about to use NodeJS to scrape this data. I wrote a script which looked at the archive of concerts, and extracted the band names, the dates, and the venue names. 

The script then searches for duplicates. This was a bit challenging as some listings were the same show but with a minor spelling error one week. By looking at band names, concert dates and venue names I was able to remove most duplicates. 

After removing duplicates and cleaning out a few other things I had a list of concerts with the dates, bands and venues. I saved this into JSON format and CSV format. 

I then used the CSV format to create a network <a href="http://bayareapunk.com/graphs/">graph</a> of each yeah from 1994 to 2015 (I am waiting for 2016 to be over before adding 2016). These graphs show a social network of bands connected to one another with shows that they played. In other words, the graphs are a network of bands who are connected if they shared a stage in that particular year.

After these (pretty massive) graphs were finished I used the Gephi SigmaJS exporter to create JavaScript versions of each graph.

Finally, I added the JSON data to a Mongo database and created a front-end for the site using Ractjs. The routing for the site is fairly simple, so I avoided using React Router. There was no need for it in this case. The final site can be found at <a href="http://bayareapunk.com">bayareapunk.com</a>.

Now I can write NodeJS scripts to query this database. For example, I can see which bands played the most shows since 1994.
