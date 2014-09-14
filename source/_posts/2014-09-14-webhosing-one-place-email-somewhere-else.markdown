---
layout: post
title: "Webhosing one place email somewhere else"
date: 2014-09-14 15:42:25 -0700
comments: false
categories: DNS, webhosting, email
description: A description of how to seperate webhosting and email services using DNS
---
<p>A somewhat common problem that comes up at work is users wanting to host their website one place and have their email services go through somewhere else. The main issue is knowing how to setup DNS correctly.</p>
<p>Start with the webhosting. Here you need an A record pointing to the IP address of the webhost. Say you want example.com to be hosted by 192.168.0.1.</p>
{% codeblock %}
example.com.	86400 	IN 	A	192.168.0.1
{% endcodeblock %}
<p>Then you need to create an A record for a subdomain which will point at the IP address of the email server you are going to use. Lets say the email server is on 10.0.0.2.</p>
{% codeblock %}
mail.example.com.	86400	IN 	A 	10.0.0.2
{% endcodeblock %}
<p>I use the 'mail' prefix, but this could be any subdomain that is not being used. Now you must create a MX record which tells emails that are sent to @example.com where to go. For this you will point the top level domain to the newly created subdomain. A common mistake is to try to point the MX record to an IP address. An MX record must point to an A record.</p>
{% codeblock %}
example.com.	86400	IN	MX	10 mail.example.com. 
{% endcodeblock %}
<p>That's it. Now any requests, such as a HTTP request, looking for example.com will be sent to 192.168.0.1 and any email sent to @example.com will be forwarded on to mail.example.com which goes to 10.0.0.2.</p>
<p>The above can and probably should also be done with IPv6 when IPv6 addresses are available. For that just add AAAA records in the same maner as the A records above. You will need one AAAA record for example.com pointing to the webhosting IPv6 address, and one AAAA record pointing mail.example.com pointing to the mail server's IPv6 address.</p>
