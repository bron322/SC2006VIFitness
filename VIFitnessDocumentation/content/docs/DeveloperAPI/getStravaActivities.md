---
title: "/v1/getUserStravaActivities"
description: "Reference pages are ideal for outlining how things work in terse and clear terms."
summary: ""
date: 2023-09-07T16:13:18+02:00
lastmod: 2023-09-07T16:13:18+02:00
draft: false
menu:
  docs:
    parent: ""
    identifier: "example-235"
weight: 1050
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

#### GET

returns a list of all strava activities of a user.

#### Example request

`https://expensive-eel-wrap.cyclic.app/vifitness/v1/getUserStravaActivities`

### Example response

```json
[
  {
    "name": "test",
    "type": "Run",
    "date": "2023-11-06T08:31:20.000Z",
    "distance": 771.9,
    "calorieBurned": 46,
    "duration": 319
  },
  {
    "name": "test",
    "type": "Run",
    "date": "2023-11-06T08:31:20.000Z",
    "distance": 771.9,
    "calorieBurned": 46,
    "duration": 319
  }
]
```
