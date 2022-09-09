---
title: Stats
layout: default
permalink: /stats/
---

<script>
  window.onload = function() { scrollBy(0, -70) };
</script>

{% assign posts_per_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}

<ul>
{% for current_year in posts_per_year %}
<li>
<a name="{{ current_year.name }}"/>
<a href="/years/#{{current_year.name}}">
{{ current_year.name }} ({{ current_year.size }})
</a>
</li>
{% endfor %}
</ul>

<ul>
{% assign previouscity = "" %}
{% assign previouscountry = "" %}
{% assign nbConcerts = 0 %}
{% assign needflush = false %}
{% assign sortedPosts = site.posts | sort: 'city' %}
{% for post in sortedPosts %}
  {% assign city = post.city %}
  {% assign citydowncase = city | downcase %}
  {% if previouscity == city %}
    {% assign nbConcerts = nbConcerts | plus: 1 %}
	{% assign needflush = true %}
	{% continue %}
  {% else %}
    {% if previouscity != "" %}
<li>
      {% assign previouscitydowncase = previouscity | downcase %}
<a name="{{ previouscitydowncase }}"/>
<a href="/cities/#{{previouscitydowncase}}">
{{ previouscity }}, {{ previouscountry }} ({{ nbConcerts }})
</a>
</li>
      {% assign nbConcerts = 1 %}
      {% assign needflush = false %}
	{% else %}  
	  {% assign nbConcerts = 1 %}
	{% endif %}
    {% assign previouscity = city %}
	{% assign previouscountry = post.country %}
  {% endif %}
{% endfor %}
{% if needflush == true %}
<li>
{% assign previouscitydowncase = previouscity %}
<a name="{{ previouscitydowncase }}"/>
<a href="/cities/#{{previouscitydowncase}}">
{{ previouscity }}, {{ previouscountry }} ({{ nbConcerts }})
</a>
</li>
{% endif %}
</ul>