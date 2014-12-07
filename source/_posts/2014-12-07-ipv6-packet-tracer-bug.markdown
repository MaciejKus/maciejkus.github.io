---
layout: post
title: "IPv6 Packet Tracer Bug"
date: 2014-12-07 14:46:08 -0800
comments: false
categories: IPv6
description: A bug regarding IPv6 routing in Cisco's Packet Tracer 6.1
---
<p>After about an hour of struggling I finally figured out that Cisco's Packet Tracer 6.1 has a bug in it in terms of IPv6 routing. When using the {% codeblock %}ipv6 route{% endcodeblock %} command, be sure to use an IP address for the destination, not a port address. </p>
<!-- more -->
<p>I created a simple little setup, based on the hands-on lab 14.2 in Todd Lamme
l's CCNa book. Three routers, one connected to second which was connected to a t
hird. RouterA---RouterB---RouterC. Simple. I turned on ipv6 routing, assigned an
 address, and created IPv6 routes using the outgoing interface. And then no matt
er what I tried, I could not ping between the two subnets. I was able to ping to
 one interface on the middle router, but not to the other interface. I checked f
or mistypes, did the same thing for IPv4 and that worked fine. I couldn't find t
he problem at all. So I started to change things, and eventually used the neighboring IP address rather than the interface, and magically things started to work.</p>
<p>So the point is, if you are playing around with IPv6 in Packet Tracer, do this:
{% codeblock %}ipv6 route 2001:db8:3c4d:1::/64 2001:db8:3c4d:2::1{% endcodeblock %}
rather than this:
{% codeblock %}ipv6 route 2001:db8:3c4d:1::/64 g0/0{% endcodeblock %}
</p>
