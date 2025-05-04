---
title: Top places
layout: default
permalink: /topplaces/
---

<script>
  window.onload = function() { scrollBy(0, -70) };
</script>

{% include generateArray.html %}

{%- assign previous = "" -%}
{%- assign placenumarray = "" -%}
{%- assign placenumcurrent = "" -%}
{%- assign nbConcerts = 10000 -%}
{%- for place in placelist -%}
  {%- if previous != place and previous != "" -%}
    {%- if placenumarray != "" -%}
      {%- assign placenumarray = placenumarray | append: '|' | append: placenumcurrent -%}
    {%- else -%}
      {%- assign placenumarray = placenumarray | append: placenumcurrent -%}
    {%- endif -%}
    {%- assign nbConcerts = 10001 -%}
  {%- else -%}
    {%- assign nbConcerts = nbConcerts | plus: 1 -%}
  {%- endif -%}
  {%- assign placenumcurrent = nbConcerts | append: '#' | append: place -%}
  {%- assign previous = place -%}
{%- endfor -%}

{%- if placenumarray != "" -%}
  {%- assign placenumarray = placenumarray | append: '|' | append: placenumcurrent -%}
{%- else -%}
  {%- assign placenumarray = placenumarray | append: placenumcurrent -%}
{%- endif -%}

{%- assign placenumarray = placenumarray | split: '|' | sort -%}

<ul>
{%- for it in placenumarray reversed -%}
  {%- assign itarray = it | split: '#' -%}
  {%- assign place = itarray[1] -%}
  {%- assign placedowncase = place | downcase -%}
<li>
<a name="{{ placedowncase }}"/>
<a href="/places/#{{placedowncase}}">
{{ place }} ({{ itarray[0] | minus: 10000 }})
</a>
</li>
{%- endfor -%}
</ul>

