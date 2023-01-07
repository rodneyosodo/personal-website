---
title: Cloudflare is moving away from Nginx
description: People who are really serious about software should make their own hardware.
date: '2022-10-21T15:10:45.227Z'
categories: []
keywords: []
slug: /@rodneyosodo/cloudflare-is-moving-away-from-nginx-248831c3b22
---

> People who are really serious about software should make their own hardware.

> [**Alan Kay**](https://www.brainyquote.com/authors/alan-kay-quotes)

![](/images/blogimages/0__QqnGe0zcFVmyeKhy.jpg)

We will start by demystifying a few concepts. Cloudflare is a content delivery network (CDN) that primarily acts as a reverse proxy between a website visitor and a Cloudflare customer.  
A reverse proxy is an intermediate connection point that sits in front of a web server and receives all the requests before they reach the origin server. A reverse proxy handles requests from the user on behalf of the server. The client does not realize that another server processed its request because it only talks directly with the reverse proxy server. It can check for authorization, and authentication or even do rate limiting on behalf of the actual web server. Here is a diagrammatic representation of a reverse proxy.

![](/images/blogimages/0__Vuk9eAnYMY4ZkqX9.png)

A proxy, on the other hand, is an intermediate connection point that sits in front of a client and a web server that handles traffic routing between clients and a web server, typically one outside the network. By doing this, it can enforce security protocols, convert and mask client IP addresses, control traffic per predefined policies, and prevent unauthorized communication.

![](/images/blogimages/0__DXSOI8l3367sghd__.jpg)

Cloudflare is commonly used in comprehensive coverage of all CDN markets, advanced firewalls, CDN caching, image optimization, and intelligent traffic, among others. According to data supplied on the Cloudflare website, more than 25 million websites or properties use Cloudflare. Additionally, thousands of new users join their network every day and according to estimates, Cloudflare powers over 25 million HTTP requests per second and roughly 20% of the top 1000 websites. This is just to demonstrate the type of software that runs on Cloudflare infrastructure need to be robust, available and scalable.

#### Why use Cloudflare?

1\. Cloudflare assists in limiting or obstructing hacking and brute-force attacks.  
2\. There is no need to await DNS propagation.  
3\. Free Cloud Delivery Network is available (CDN)  
4\. Use less server bandwidth

Initially, Cloudflare used Nginx as its proxy. Nginx was designed to have high concurrency and little memory utilization. Nginx employs an asynchronous, event-driven strategy where requests are handled in a single thread rather than starting new processes for each web request.

One master process can manage numerous worker processes when using Nginx. While the workers carry out the actual processing, the master manages the worker processes. Each request can be processed by the worker simultaneously without affecting other requests as Nginx is asynchronous.

Typical characteristics of Nginx include:

Reverse proxy with caching, load balancing, Static file management, index file management, auto-indexing and TLS/SSL with SNI support.

Some high-profile companies using Nginx include Autodesk, Atlassian, T-Mobile, GitLab, DuckDuckGo, Microsoft, IBM, Google, Adobe, Salesforce, VMWare, LinkedIn, Cisco, Facebook, Twitter, Apple, Intel, and many more

Cloudflare has eventually developed its own HTTP proxy stack after “outgrowing” Nginx. Nginx’s worker process architecture, according to Cloudflare, had issues, particularly with CPU resources. This is because, in NGINX, each request is handled by a single worker, resulting in an unbalanced load across the CPU. It also proved challenging to adapt Nginx to their requirements, Pingora was designed to solve this issue.

Pingora was created internally by Cloudflare engineers from the ground up. The memory safety of the Rust programming language, which yet offers C-like performance, was a deciding factor. To meet their various needs, Cloudflare also developed their own HTTP library for Rust. Instead of using many processes, Pingora makes use of a multi-threaded architecture. Pingora consumes about 70% less CPU and 67% less memory compared to our old service with the same traffic load.

> “We evaluated these options every quarter for the past few years. There is no obvious formula to tell which choice is the best. For several years, we continued with the path of the least resistance, continuing to augment NGINX. However, at some point, building our own proxy’s return on investment seemed worth it. We made a call to build a proxy from scratch and began designing the proxy application of our dreams. ”

If you liked this article, click the 👏 multiple times below so other people will see it here on Medium.

Let’s be friends on [Twitter](https://twitter.com/b1ackd0t). Happy Coding 😉

#### References:

1\. [https://www.nginx.com/success-stories/cloudflare-boosts-performance-stability-millions-websites-with-nginx](https://www.nginx.com/success-stories/cloudflare-boosts-performance-stability-millions-websites-with-nginx)  
2\. [https://www.wpoven.com/blog/cloudflare-market-share/](https://www.wpoven.com/blog/cloudflare-market-share/)  
3\. [https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/](https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/)  
4\. [https://stack.g2.com/company/nginx](https://stack.g2.com/company/nginx)  
5\. [https://www.nginx.com/blog/nx\_info\_types/whitepaper/](https://www.nginx.com/blog/nx_info_types/whitepaper/)  
6\. [https://www.cloudflare.com/resources/images/slt3lc6tev37/6mpY5zjlPP3b2twznUQOki/b221bc7b49723deb2c09a4b30747f685/cloudflare-cdn-whitepaper-19Q4.pdf](https://www.cloudflare.com/resources/images/slt3lc6tev37/6mpY5zjlPP3b2twznUQOki/b221bc7b49723deb2c09a4b30747f685/cloudflare-cdn-whitepaper-19Q4.pdf)

a. [https://www.reddit.com/r/ProgrammerHumor/comments/l9w2ls/good\_job\_cloudflare/https://www.linuxbabe.com/wp-content/uploads/2016/01/reverse-proxy-1.png](https://www.reddit.com/r/ProgrammerHumor/comments/l9w2ls/good_job_cloudflare/https://www.linuxbabe.com/wp-content/uploads/2016/01/reverse-proxy-1.png)

b[.](https://www.nginx.com/success-stories/cloudflare-boosts-performance-stability-millions-websites-with-nginx) [https://www.linuxbabe.com/wp-content/uploads/2016/01/reverse-proxy-1.png](https://www.linuxbabe.com/wp-content/uploads/2016/01/reverse-proxy-1.png)

c. [https://marvel-b1-cdn.bc0a.com/f00000000216283/www.fortinet.com/content/fortinet-com/en\_us/resources/cyberglossary/proxy-server/\_jcr\_content/par/c05\_container\_copy\_c/par/c28\_image\_copy\_copy\_.img.jpg/1625683502431.jpg](https://marvel-b1-cdn.bc0a.com/f00000000216283/www.fortinet.com/content/fortinet-com/en_us/resources/cyberglossary/proxy-server/_jcr_content/par/c05_container_copy_c/par/c28_image_copy_copy_.img.jpg/1625683502431.jpg)