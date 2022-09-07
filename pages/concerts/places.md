---
title: Places
layout: default
permalink: /places/
---

<script>
  window.onload = function() { scrollBy(0, -70) };
</script>

{% include generateArray.html %}

{% for place in placelistuniq %}
  {% assign nbConcerts = 0 %}
  {% for it in placelist %}
    {% if it == place %}
      {% assign nbConcerts = nbConcerts | plus: 1 %}
	{% endif %}
  {% endfor %}
  <a name="{{ place | downcase }}"/>
### {{ place }} ({{ nbConcerts }})
  {% include generatePostsListByPlace.html place=place %}
{% endfor %}
