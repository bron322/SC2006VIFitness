---
title: "/v1/getUserWorkouts"
description: "Reference pages are ideal for outlining how things work in terse and clear terms."
summary: ""
date: 2023-09-07T16:13:18+02:00
lastmod: 2023-09-07T16:13:18+02:00
draft: false
menu:
  docs:
    parent: ""
    identifier: "example-235"
weight: 1040
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

#### GET

returns a list of all workouts of a user.

#### Example request

`https://expensive-eel-wrap.cyclic.app/vifitness/v1/getUserWorkouts`

### Example response

```json
[
  {
    "name": "Iliotibial band SMR",
    "isCompleted": false,
    "date": "2023-11-10T14:42:38.666Z",
    "month": 11,
    "day": 10,
    "year": 2023,
    "calories": 32.67,
    "createdAt": "2023-11-10T14:42:43.320Z"
  },
  {
    "name": "Elbow plank",
    "isCompleted": false,
    "date": "2023-11-10T14:42:38.666Z",
    "month": 11,
    "day": 10,
    "year": 2023,
    "calories": 32.67,
    "createdAt": "2023-11-10T14:42:43.320Z"
  }
]
```
