---
title: "Authorisation"
description: "Reference pages are ideal for outlining how things work in terse and clear terms."
summary: ""
date: 2023-09-07T16:13:18+02:00
lastmod: 2023-09-07T16:13:18+02:00
draft: false
menu:
  docs:
    parent: ""
    identifier: "example-234"
weight: 1020
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

Congraduations on obtaining your own client ID and client Secret. Follow along this guide to make your first request to VI Fitness' API endpoint

## Base URL

All request should be made to this base URL: `https://expensive-eel-wrap.cyclic.app/vifitness`

## Headers

You have to include `clientid` and `clientsecret` inside the request header for authorisation.

Any invalid headers will return a error 401 Unauthorised response.

Your header should include this 2 fields:

```json
{
  clientid: <<CLIENT_ID>>,
  clientsecret: <<CLIENT_SECRET>>
}
```
