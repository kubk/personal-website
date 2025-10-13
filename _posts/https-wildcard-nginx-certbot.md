---
title: "Configure HTTPS for wildcard domains with Nginx and Certbot"
excerpt: "Certbot allows to automatically install Letsencrypt certificates on a server. For a regular website with only 1 domain, the process of installing can be described as ordinary 'Next next install'. Things are getting complicated if you need to create a wildcard certificate."
date: "2021-03-21"
---

Certbot allows to automatically install Letsencrypt certificates on a server. For a regular website with only 1 domain, the process of installing can be described as ordinary "Next next install". Things are getting complicated if you need to create a wildcard certificate. Suppose you are creating a white-label website and each company should have its own unique subdomain.

Let's start with a simple Nginx config:

```nginx
server {
  listen 80;
  root /path/to/project;
  client_max_body_size 100M;
  location / {
    try_files $uri $uri/ /index.html$is_args$args;
  }
}
```

We've skipped server_name because it's gonna contain the wildcard.

## Step 1: Create the certificates

```bash
certbot certonly -d *.project.com --manual --preferred-challenges dns
```

Certbot will ask you to deploy a TXT record under the name _acme-challenge.project.com

## Step 2: Create a TXT record

Create a TXT record and make sure it's propagated before continue. For example, [this online service](https://mxtoolbox.com/TXTLookup.aspx) allows to lookup TXT records of a domain.

## Step 3: Configure Nginx

After successfully deploying the TXT record you can proceed to create the certificates. Certbot will create fullchain.pem and privkey.pem files for you. Copy their paths into the Nginx config:

```nginx
server {
  listen 80;
  root /path/to/project;
  server_name *.project.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name *.project.com;
  ssl_certificate /etc/letsencrypt/live/project.com-0001/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/project.com-0001/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
  root /path/to/project;
  client_max_body_size 100M;
  location / {
    try_files $uri $uri/ /index.html$is_args$args;
  }
}
```

That's it. Reload Nginx to apply the changes. Wish your multitenant projects grow.
