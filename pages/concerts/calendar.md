---
title: Calendar
layout: calendar
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
        left: 'prev',
        center: 'title',
        right: 'next'
      },
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: '/concerts-calendar/data.json'
    });

});

</script>
<style>
#calendar {
    max-width: 900px;
    padding-top: 90px !important;
  }
</style>
