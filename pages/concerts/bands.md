---
title: Bands
layout: default
permalink: /bands/
---

<script>
  window.onload = function() { scrollBy(0, -70) };
</script>

{% include generateArray.html %}

{% for band in bandlistuniq %}
  <a name="{{ band | downcase }}"/>
### {{ band }}
  {% include generatePostsListByBand.html artist=band %}
{% endfor %}
