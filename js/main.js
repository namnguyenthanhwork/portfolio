function renderTime(){var e=new Date,t=new Date("2001-01-16"),n=e.getTime()-t.getTime(),o=new Date(n),a=o.getFullYear()-1970,l=o.getMonth(),s=o.getDate(),r=o.getHours(),c=o.getMinutes(),i=o.getSeconds();24==r?r=0:r>12&&(r-=0),r<10&&(r="0"+r),c<10&&(c="0"+c),i<10&&(i="0"+i);var u=document.getElementById("years"),d=document.getElementById("months"),m=document.getElementById("days"),y=document.getElementById("hours"),g=document.getElementById("minutes"),p=document.getElementById("seconds");u.innerText=a,d.innerText=l,m.innerText=s,y.innerText=r,g.innerText=c,p.innerText=i,u.style.color="#ed4747",d.style.color="#ed4747",m.style.color="#ed4747",y.style.color="#0099ff",g.style.color="#0099ff",p.style.color="#0099ff",setTimeout("renderTime()",1e3)}$(document).ready(function(){$(window).scroll(function(){this.scrollY>20?$(".header").addClass("sticky"):$(".header").removeClass("sticky"),this.scrollY>20?$(".scroll-up-btn").addClass("show"):$(".scroll-up-btn").removeClass("show")}),$(".scroll-up-btn").click(function(){$("html").animate({scrollTop:0}),$("html").css("scrollBehavior","auto")}),$(".navbar .menu li a").click(function(){$("html").css("scrollBehavior","smooth"),$(".navbar .menu li a").removeClass("nav-active"),$(this).addClass("nav-active"),$(".navbar .menu").toggleClass("active"),$(".menu-btn i").toggleClass("active")}),$(".menu-btn").click(function(){$(".navbar .menu").toggleClass("active"),$(".menu-btn i").toggleClass("active")}),$(".contact-btn").click(function(){$(".contact-btn").toggleClass("contact-active"),$(".button-contact").toggleClass("contact-active")}),new Typed(".typing",{strings:["Developer","Designer","Freelancer"],typeSpeed:100,backSpeed:60,loop:!0}),new Typed(".typing-name",{strings:["Nguyen Thanh Nam"],typeSpeed:80,backSpeed:60,loop:!0}),$(".carousel").owlCarousel({autoplay:!0,autoplayTimeout:3e3,autoplaySpeed:1500,margin:20,loop:!0,nav:!1,dot:!0,responsive:{0:{items:1},600:{items:2},1024:{items:3}}})}),renderTime();var cursors=[{cursor_id:"3",cursor_type:"0",cursor_shape:"11",cursor_image:"",default_cursor:"auto",hover_effect:"plugin",body_activation:"1",element_activation:"0",selector_type:"tag",selector_data:"body",color:"#f72c26",width:"30",blending_mode:"normal"}];function alertCV(){swal("Opps, 404","Sorry! You can't download CV, please try the next time. Thank you!!!","error")}function alertClickFail(){swal("Opps","Sorry! Link isn't ready, please try the next time. Thank you!!!","error")}AOS.init({offset:150,delay:0,duration:1e3});