---
title: Calendar
layout: default
permalink: /concerts-calendar/
---
<script type="text/javascript" src="/js/jquery.min.js"></script>
<script type="text/javascript" src="/js/moment.min.js"></script>
<script type="text/javascript" src="/js/fullcalendar.min.js"></script>
<link rel="stylesheet" href="/css/fullcalendar.min.css"/>
<link rel="stylesheet" media="print" href="/css/fullcalendar.print.min.css"/>

<script>
$(document).ready(function() {

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      defaultDate: '2018-04-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: '/concerts-calendar/data.json'
    });

});

</script>
<div id="calendar"></div>
