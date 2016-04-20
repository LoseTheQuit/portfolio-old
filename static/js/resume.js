   (function () {
       'use strict';
       if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
           var msViewportStyle = document.createElement('style')
           msViewportStyle.appendChild(
               document.createTextNode(
                   '@-ms-viewport{width:auto!important}'
               )
           )
           document.querySelector('head').appendChild(msViewportStyle)
       }
   });


   $(window).scroll(function () {
       if ($(document).scrollTop() > 50) {
           $('nav').addClass('shrink');
       } else {
           $('nav').removeClass('shrink');
       }
   });

   // custom transformation: scale header's title
   var titleStyle = document.querySelector('.title').style;
   addEventListener('core-header-transform', function (e) {
       var d = e.detail;
       var m = d.height - d.condensedHeight;
       var scale = Math.max(0.75, (m - d.y) / (m / 0.25) + 0.75);
       titleStyle.transform = titleStyle.webkitTransform =
           'scale(' + scale + ') translateZ(0)';
   });

   var app = document.querySelector('#app');
   app.heading = 'Hello Polycasters';
   app.selected = 0;
   app.page = 'Home';

   page('/', home);
   page('/portfolio', portfolio);
   page('/contact', contact);

   page({
       hashbang: true
   });

   function home() {

       app.route = 'Home';
   }

   function portfolio() {

       app.route = 'Portfolio';
   }

   function contact() {

       app.route = 'Contact';
   }

   app.addEventListener('template-bound', function () {

       console.log(document.querySelector('core-menu'));

   });

   document.addEventListener('polymer-ready', function () {

       var navicon = document.getElementById('navicon');
       var naviconXD = document.getElementById('naviconXD');
       var drawerPanel = document.getElementById('drawerPanel');

       navicon.addEventListener('click', function () {

           drawerPanel.togglePanel();

       });

       naviconXD.addEventListener('click', function () {

           drawerPanel.togglePanel();

       });
   });
   var main = function () {
           $('.dropdown-toggle').click(function () {
               $('.dropdown-menu').toggle();
           });


           $('.arrow-next').click(function () {
               var currentSlide = $('.active-slide');
               var nextSlide = currentSlide.next();

               var currentDot = $('.active-dot');
               var nextDot = currentDot.next();

               if (nextSlide.length === 0) {
                   nextSlide = $('.slide').first();
                   nextDot = $('.dot').first();
               }

               currentSlide.fadeOut(600).removeClass('active-slide');
               nextSlide.fadeIn(600).addClass('active-slide');

               currentDot.removeClass('active-dot');
               nextDot.addClass('active-dot');
           });


           $('.arrow-prev').click(function () {
               var currentSlide = $('.active-slide');
               var prevSlide = currentSlide.prev();

               var currentDot = $('.active-dot');
               var prevDot = currentDot.prev();

               if (prevSlide.length === 0) {
                   prevSlide = $('.slide').last();
                   prevDot = $('.dot').last();
               }

               currentSlide.fadeOut(600).removeClass('active-slide');
               prevSlide.fadeIn(600).addClass('active-slide');

               currentDot.removeClass('active-dot');
               prevDot.addClass('active-dot');
           });
           $('.parallax-window').parallax({
               imageSrc: '/6:28/header-base.png'
           });
           var main = function () {
               $('.dropdown-toggle').click(function () {
                   $('.dropdown-menu').toggle();
               });


           }

           $(document).ready(main);