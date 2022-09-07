---
title: Top places
layout: default
permalink: /topplaces/
---

<script>
  window.onload = function() { scrollBy(0, -70) };
</script>

{% include generateArray.html %}

{% assign topplaces = "" %}
{% for place in placelistuniq %}
  {% assign topplaceitem = "" %}
  {% assign nbConcerts = 0 %}
  {% for it in placelist %}
    {% if it == place %}
      {% assign nbConcerts = nbConcerts | plus: 1 %}
	{% endif %}
  {% endfor %}
  {% assign topplaceitem = nbConcerts | append: '#' | append: place %}
  {% assign topplaces = topplaces | append: topplaceitem %}
{% endfor %}

{% assign topplaces = topplaces | sort %}
{% for numberplace in topplaces %}
  {% assign it = numberplace | split: '#' %}
  {{ it[1] }} ({{ it[0] }})
{% endfor %}
