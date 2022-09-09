---
title: Years
layout: default
permalink: /years/
---

<script>
  window.onload = function() { scrollBy(0, -70) };
</script>

{% include generateArray.html %}

{% for year in yearlistuniq reversed %}
  {% assign nbConcerts = 0 %}
  {% for it in yearlist %}
    {% if it == year %}
      {% assign nbConcerts = nbConcerts | plus: 1 %}
	{% endif %}
  {% endfor %}
  <a name="{{ year | downcase }}"/>
### {{ year }} ({{ nbConcerts }})
  {% include generatePostsListByYear.html year=year %}
{% endfor %}
