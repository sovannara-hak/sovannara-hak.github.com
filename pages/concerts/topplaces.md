---
title: Top places
layout: default
permalink: /topplaces/
---

<script>
  window.onload = function() { scrollBy(0, -70) };
</script>

{% include generateArray.html %}

{% assign previous = "" %}
{% assign placenumarray = "" %}
{% assign placenumcurrent = "" %}
{% assign nbConcerts = 1000 %}
{% for place in placelist %}
  {% if previous != place and previous != "" %}
	{% assign placenumarray = placenumarray | append: '|' | append: placenumcurrent %}
    {% assign nbConcerts = 1001 %}
  {% else %}
    {% assign nbConcerts = nbConcerts | plus: 1 %}
  {% endif %}
  {% assign placenumcurrent = nbConcerts | append: '#' | append: place %}
  {% assign previous = place %}
{% endfor %}

{% assign placenumarray = placenumarray | append: '|' | append: placenumcurrent %}

{% assign placenumarray = placenumarray | split: '|' | sort %}

{% for it in placenumarray reversed %}
  {% assign itarray = it | split: '#' %}
  <a name="{{ itarray[1] | downcase }}"/>
### {{ itarray[1] }} ({{ itarray[0] | minus: 1000 }})
{% endfor %}