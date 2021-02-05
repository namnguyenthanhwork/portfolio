$(document).ready(function () {
    $(window).scroll(function () {
        // sticky navbar on scroll script
        if (this.scrollY > 20) {
            $('.header').addClass("sticky");
        } else {
            $('.header').removeClass("sticky");
        }

        // scroll-up button show/hide script
        if (this.scrollY > 20) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({
            scrollTop: 0
        });
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $(".navbar .menu li a").click(function () {
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
        $('.navbar .menu li a').removeClass("nav-active");
        $(this).addClass("nav-active");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["YouTuber", "Developer", "Blogger", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["YouTuber", "Developer", "Blogger", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-name", {
        strings: ["Nguyen Thanh Nam"],
        typeSpeed: 80,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 1500,
        margin: 20,
        loop: true,
        nav: false,
        dot: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1024: {
                items: 3
            }
        }
    });
});
// current realtime
function renderTime() {
    // get date current time
    var dateRealTime = new Date();
    var yearNow = dateRealTime.getFullYear();
    var dateNow = dateRealTime.getDay();
    var monthNow = dateRealTime.getMonth() + 1;

    // date of birth
    var dob = new Date(2001, 01, 16);
    var yearDob = dob.getYear() + 1900;
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();

    // processing 
    var yearAge = yearNow - yearDob;
    if (monthNow >= monthDob)
        var monthAge = monthNow - monthDob;
    else {
        yearNow--;
        var monthAge = 12 + monthNow - monthDob;
    }
    if (dateNow >= dateDob)
        var dateAge = dateNow - dateDob;
    else {
        monthAge--;
        var dateAge = 31 + dateNow - dateDob;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }

    // time
    var currentTime = new Date();
    var h = currentTime.getHours();
    var m = currentTime.getMinutes();
    var s = currentTime.getSeconds();
    if (h == 24) {
        h = 0;
    } else {
        if (h > 12)
            h -= 0;
    }
    if (h < 10)
        h = "0" + h;
    if (m < 10)
        m = "0" + m;
    if (s < 10)
        s = "0" + s;

    var myYears = document.getElementById("years");
    var myMonths = document.getElementById("months");
    var myDays = document.getElementById("days");
    var myHours = document.getElementById("hours");
    var myMinutes = document.getElementById("minutes");
    var mySeconds = document.getElementById("seconds");

    myYears.innerText = yearAge;
    myMonths.innerText = monthAge;
    myDays.innerText = dateAge;
    myHours.innerText = h;
    myMinutes.innerText = m;
    mySeconds.innerText = s;

    myYears.style.color = `red`;
    myMonths.style.color = `red`;
    myDays.style.color = `red`;
    myHours.style.color = `red`;
    myMinutes.style.color = `red`;
    mySeconds.style.color = `red`;


    setTimeout("renderTime()", 1000);
}
renderTime();

// init cursor
var cursors = [{
    "cursor_id": "3",
    "cursor_type": "0",
    "cursor_shape": "11",
    "cursor_image": "",
    "default_cursor": "auto",
    "hover_effect": "plugin",
    "body_activation": "1",
    "element_activation": "0",
    "selector_type": "tag",
    "selector_data": "body",
    "color": "#f72c26",
    "width": "30",
    "blending_mode": "normal"
}];

function alertCV() {
    swal("Opps, 404", "Sorry! You can't download CV, please try the next time. Thank you!!!", "error");
}