function renderTime(){var e,t,n=new Date,o=n.getFullYear(),a=n.getDay(),l=n.getMonth()+1,s=new Date(2001,1,16),r=s.getYear()+1900,c=s.getMonth(),i=s.getDate(),u=o-r;e=c<=l?l-c:(o--,12+l-c),i<=a?t=a-i:(t=31+a-i,--e<0&&(e=11,u--));var d=new Date,n=d.getHours(),s=d.getMinutes(),r=d.getSeconds();24==n?n=0:12<n&&(n-=0),n<10&&(n="0"+n),s<10&&(s="0"+s),r<10&&(r="0"+r);o=document.getElementById("years"),l=document.getElementById("months"),c=document.getElementById("days"),a=document.getElementById("hours"),i=document.getElementById("minutes"),d=document.getElementById("seconds");o.innerText=u,l.innerText=e,c.innerText=t,a.innerText=n,i.innerText=s,d.innerText=r,o.style.color=`#ed4747`,l.style.color=`#ed4747`,c.style.color=`#ed4747`,a.style.color=`#0099ff`,i.style.color=`#0099ff`,d.style.color=`#0099ff`,setTimeout("renderTime()",1e3)}$(document).ready(function(){$(window).scroll(function(){20<this.scrollY?$(".header").addClass("sticky"):$(".header").removeClass("sticky"),20<this.scrollY?$(".scroll-up-btn").addClass("show"):$(".scroll-up-btn").removeClass("show")}),$(".scroll-up-btn").click(function(){$("html").animate({scrollTop:0}),$("html").css("scrollBehavior","auto")}),$(".navbar .menu li a").click(function(){$("html").css("scrollBehavior","smooth"),$(".navbar .menu li a").removeClass("nav-active"),$(this).addClass("nav-active"),$(".navbar .menu").toggleClass("active"),$(".menu-btn i").toggleClass("active")}),$(".menu-btn").click(function(){$(".navbar .menu").toggleClass("active"),$(".menu-btn i").toggleClass("active")}),$(".contact-btn").click(function(){$(".contact-btn").toggleClass("contact-active"),$(".button-contact").toggleClass("contact-active")});new Typed(".typing",{strings:["Developer","Designer","Freelancer"],typeSpeed:100,backSpeed:60,loop:!0}),new Typed(".typing-name",{strings:["Nguyen Thanh Nam"],typeSpeed:80,backSpeed:60,loop:!0});$(".carousel").owlCarousel({autoplay:!0,autoplayTimeout:3e3,autoplaySpeed:1500,margin:20,loop:!0,nav:!1,dot:!0,responsive:{0:{items:1},600:{items:2},1024:{items:3}}})}),renderTime();var cursors=[{cursor_id:"3",cursor_type:"0",cursor_shape:"11",cursor_image:"",default_cursor:"auto",hover_effect:"plugin",body_activation:"1",element_activation:"0",selector_type:"tag",selector_data:"body",color:"#f72c26",width:"30",blending_mode:"normal"}];function alertCV(){swal("Opps, 404","Sorry! You can't download CV, please try the next time. Thank you!!!","error")}