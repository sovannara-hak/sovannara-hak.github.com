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
### {{ place }}
  {% include generatePostsListByPlace.html place=place %}
{% endfor %}
