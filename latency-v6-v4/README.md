Test and compare IPv4 versus IPv6 latency directly from the user's browser. No need to use Flash or Java. This test relies solely on JavaScript and a modern browser.

Requires a server serving two small images, one accessible over IPv4 only and one accessible over IPv6 only. In this example the images are hosted on dev.maciejkus.com. For the image files being served, be sure to add header info for cross site. 
see  https://www.w3.org/TR/resource-timing/#timing-allow-origin

Modern browsers use resource timing
https://www.w3.org/TR/resource-timing/

Older browsers have a much less accurate fallback test which uses a timer to see how long it took to load an image.
