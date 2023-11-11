---
title: "/v1/getUserMeals"
description: "Reference pages are ideal for outlining how things work in terse and clear terms."
summary: ""
date: 2023-09-07T16:13:18+02:00
lastmod: 2023-09-07T16:13:18+02:00
draft: false
menu:
  docs:
    parent: ""
    identifier: "example-235"
weight: 1030
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

#### GET

returns a list of all meals of a user.

#### Example request

`https://expensive-eel-wrap.cyclic.app/vifitness/v1/getUserMeals`

### Example response

````json
[
    {
        "foodName": "chicken",
        "calorie": "12",
        "protein": "23",
        "carbohydrate": "34",
        "fat": "45",
        "mealType": "lunch",
        "createdAt": "2023-11-03T04:11:01.137Z"
    },
    {
        "foodName": "cake",
        "calorie": 261.97,
        "protein": 2,
        "carbohydrate": 37.65,
        "fat": 12,
        "mealType": "dinner",
        "createdAt": "2023-11-03T10:42:25.220Z"
    },
    {
        "foodName": "chicken",
        "calorie": 187,
        "protein": 20.37,
        "carbohydrate": 0.04,
        "fat": 11.11,
        "mealType": "dinner",
        "createdAt": "2023-11-04T17:57:17.549Z"
    },
    {
        "foodName": "beef fried rice",
        "calorie": 336.84,
        "protein": 16.47,
        "carbohydrate": 24.99,
        "fat": 18.52,
        "mealType": "dinner",
        "createdAt": "2023-11-05T14:34:44.668Z"
    }]```
````
