---
title: Concerts
layout: default
permalink: /concerts/
---

### Concerts:

{% assign artistList = '' %}
<ul>
{% assign nbConcerts = 0 %}
{% for post in site.posts %}
  {% if post.category == "concert" %}
    {% assign nbConcerts = nbConcerts | plus: 1 %}
    <li>
      <a href="{{ post.url }}">
       {{ post.date | date_to_string }} : {{ post.title }}
      </a>
    </li>
    {% for artist in post.artists %}
      {% unless artistList contains artist %}
        {% assign artistList = artistList | append: artist %}
      {% endunless %}
    {% endfor %}
  {% endif %}
{% endfor %}
</ul>

{% include generateArray.html %}
### Bands:

{% include generateList.html list=bandlist root="bands"%}

### Places:

{% include generateList.html list=placelist root="places"%}

### Calendar:
