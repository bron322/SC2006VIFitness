---
title: "/v1/addMeal"
description: "Reference pages are ideal for outlining how things work in terse and clear terms."
summary: ""
date: 2023-09-07T16:13:18+02:00
lastmod: 2023-09-07T16:13:18+02:00
draft: false
menu:
  docs:
    parent: ""
    identifier: "example-235"
weight: 1070
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

#### POST

add a meal to user

#### Example request

`https://expensive-eel-wrap.cyclic.app/vifitness/v1/addMeal`

###### Parameters

| Name         | Description                             |
| ------------ | --------------------------------------- |
| foodName     | Name of food                            |
| calorie      | Amount of calorie of food (Cal)         |
| protein      | Amount of protein in food (g)           |
| carbohydrate | Amount of carbohydrate in food (g)      |
| fat          | Amount of fat in food (g)               |
| mealType     | Options: "breakfast", "lunch", "dinner" |

###### Response

| Code | Description                   |
| ---- | ----------------------------- |
| 401  | Unauthorised                  |
| 400  | Bad request or invalid syntax |
| 500  | Internal server error         |
| 200  | Success                       |

### Example response

```json
{
  code: 200,
  message: "Meal added
}
```
