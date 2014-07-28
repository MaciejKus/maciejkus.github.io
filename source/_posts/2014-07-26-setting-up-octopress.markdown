---
layout: post
title: "Setting Up Octopress"
date: 2014-07-26 12:13:08 -0700
comments: false
description: 'Setting up an Octopress site'
categories: [blog, Octopress]
---
<p>This site is powered by Octopress. Octopress is a static site generator. I am still working on getting things to look just how I want, but I am pretty happy so far. For a website I want something simple and to the point. I want content to be the first thing a visitor sees. </p>
<p>A lot of webpages, especially those that use Twitter Bootstrap hide the content. Instead when visiting a page the user is greeted with a full-screen image or graphic of some kind. Usually the user is expected to scroll down to view the actual content of the site, and even then instead of content the site is filled with links and more images. This may be impressive the first time one sees such a  page, but usually I am looking for information and not pretty graphics. I hope my site remains simple and content is accessible. Users should never feel like they have to search  through a site to find content. </p>
<!-- more -->
<p>With all that in mind, I did have a couple issues when setting up Octopress. First, when installing either the default theme or the <a href ='https://github.com/shashankmehta/greyshade'>Greyshade</a> theme which I ended up using, I received the following errors:
{% codeblock %}
:rake install
rake aborted!
LoadError: cannot load such file -- stringex
/var/www/maciej/octopress/Rakefile:3:in `require'
/var/www/maciej/octopress/Rakefile:3:in `<top (required)>'
(See full trace by running task with --trace)
{% endcodeblock %}
and
{% codeblock %}
rake install['greyshade'] --trace
rake aborted!
LoadError: cannot load such file -- stringex
/var/www/maciej/maciejkus925.github.io/octopress/Rakefile:3:in `require'
/var/www/maciej/maciejkus925.github.io/octopress/Rakefile:3:in `<top (required)>'
/var/lib/gems/1.9.1/gems/rake-10.3.2/lib/rake/rake_module.rb:28:in `load'
/var/lib/gems/1.9.1/gems/rake-10.3.2/lib/rake/rake_module.rb:28:in `load_rakefile'
/var/lib/gems/1.9.1/gems/rake-10.3.2/lib/rake/application.rb:687:in `raw_load_rakefile'
/var/lib/gems/1.9.1/gems/rake-10.3.2/lib/rake/application.rb:94:in `block in load_rakefile'
/var/lib/gems/1.9.1/gems/rake-10.3.2/lib/rake/application.rb:176:in `standard_exception_handling'
/var/lib/gems/1.9.1/gems/rake-10.3.2/lib/rake/application.rb:93:in `load_rakefile'
/var/lib/gems/1.9.1/gems/rake-10.3.2/lib/rake/application.rb:77:in `block in run'
/var/lib/gems/1.9.1/gems/rake-10.3.2/lib/rake/application.rb:176:in `standard_exception_handling'
/var/lib/gems/1.9.1/gems/rake-10.3.2/lib/rake/application.rb:75:in `run'
/var/lib/gems/1.9.1/gems/rake-10.3.2/bin/rake:33:in `<top (required)>'
/usr/local/bin/rake:23:in `load'
/usr/local/bin/rake:23:in `<main>'
{% endcodeblock %}

The issue ended up being that my Gemfile was pointing to an old version of stringex. To get things working I changed my Gemfile from
{% codeblock %}gem 'stringex', '~> 1.4.0'{% endcodeblock %}
to
{% codeblock %}gem 'stringex', '~> 2.5.2'{% endcodeblock %}
</p>
<p>The second issue was that when I moved the default index.html file to blog/index.html as described on the Octopress <a href='http://octopress.org/docs/theme/template/'>website</a> blog/index.html would show up blank. There was no blog entries being listed on the page. When I moved the file back to the home directory the most recent blog posts once again showed up. The fix was to update _config.yml and set 
{% codeblock %}paginate_path: "posts/:num"{% endcodeblock %}
to 
{% codeblock %}paginate_path: "blog/posts/:num"{% endcodeblock %}
It's a simple step that the Octopress documentation did not mention.</p>
<p>Beyond that, the setup was pretty painless.</p>
