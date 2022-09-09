---
title: Cities
layout: default
permalink: /cities/
---

<script>
  window.onload = function() { scrollBy(0, -70) };
</script>

{% include generateArray.html %}

{% for city in citylistuniq %}
  {% assign nbConcerts = 0 %}
  {% for it in citylist %}
    {% if it == city %}
      {% assign nbConcerts = nbConcerts | plus: 1 %}
	{% endif %}
  {% endfor %}
  <a name="{{ city | downcase }}"/>
### {{ city }} ({{ nbConcerts }})
  {% include generatePostsListByCity.html city=city %}
{% endfor %}
