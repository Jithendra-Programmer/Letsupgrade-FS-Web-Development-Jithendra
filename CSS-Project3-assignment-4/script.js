window.onscroll = () => {
    if (window.pageYOffset > 120) {
        document.getElementById('nav-container').style.width = '100%';
        document.getElementById('nav-container').style.position = 'fixed';
        document.getElementById('nav-container').style.top = '0px';
        document.getElementById('nav-container').style.left = '0px';
        document.getElementById('nav-container').style.backgroundColor = '#fff';
        document.getElementById('navbar').style.width = '1170px';
        document.getElementById('navbar').style.maxWidth = '95%';
        document.getElementById('nav-links').style.color = '#000';
        document.getElementById('frist-nav-link').style.color = '#0473db';
    } else {
        document.getElementById('nav-container').style.width = 'auto';
        document.getElementById('nav-container').style.position = 'static';
        document.getElementById('nav-container').style.top = '0';
        document.getElementById('nav-container').style.left = '0';
        document.getElementById('nav-container').style.backgroundColor =
            'transparent';
        document.getElementById('navbar').style.width = '100%';
        document.getElementById('navbar').style.maxWidth = 'auto';
        document.getElementById('nav-links').style.color = '#fff';
        document.getElementById('frist-nav-link').style.color = '#f8ea49';
    }

    if (window.pageYOffset > 775) {
        document.getElementById('nav-container').style.boxShadow =
            '0px 1px 2px #d5d5d5';
    } else {
        document.getElementById('nav-container').style.boxShadow = 'none';
    }

    if (window.pageYOffset > 520) {
        document.getElementById('btt').style.transform = 'translateY(0vh)';
    } else {
        document.getElementById('btt').style.transform = 'translateY(15vh)';
    }
};

let scrollValue;

function scrollToTop() {
    window.scrollTo(0, scrollValue);

    if (scrollValue > 0) {
        scrollValue -= 50;
    } else {
        cancelAnimationFrame(anim);
    }

    let anim = requestAnimationFrame(scrollToTop);
}

document.getElementById('btt').addEventListener('click', function () {
    scrollValue = window.pageYOffset;
    scrollToTop();
});

let mobNavStatus = false;

document.getElementById('menu-lines').addEventListener('click', function () {
    if (!mobNavStatus) {

        // document.getElementById('menu-lines').style.margin = '0px 10px';

        document.getElementById('mob-logo').style.marginLeft = '20px';

        document.getElementById('line-1').style.transform = 'rotate(45deg)';
        document.getElementById('line-1').style.transformOrigin = '50% 50%';
        document.getElementById('line-1').style.position = 'absolute';

        document.getElementById('line-2').style.opacity = '0';
        document.getElementById('line-2').style.position = 'absolute';

        document.getElementById('line-3').style.transform = 'rotate(-45deg)';
        document.getElementById('line-3').style.transformOrigin = '50% 50%';
        document.getElementById('line-3').style.position = 'absolute';

        document.getElementById('mob-nav').style.marginLeft = "0px";

        mobNavStatus = true;
    } else {

        // document.getElementById('menu-lines').style.margin = '0px 0px';

        document.getElementById('line-1').style.transform = 'rotate(0deg)';
        document.getElementById('line-1').style.position = 'static';

        document.getElementById('line-2').style.opacity = '1';
        document.getElementById('line-2').style.position = 'static';

        document.getElementById('line-3').style.transform = 'rotate(0deg)';
        document.getElementById('line-3').style.position = 'static';

        document.getElementById('mob-nav').style.marginLeft = "-270px";

        document.getElementById('mob-logo').style.marginLeft = '6px';

        mobNavStatus = false;
    }
});

let mobContactStatus = false;

document.getElementById('menu-dots').addEventListener("click", function () {

    if(!mobContactStatus) {
        document.getElementById('mob-contact').style.opacity = '1';
        document.getElementById('mob-contact').style.top = '55px';
        document.getElementById('menu-dots').style.transform = 'rotateX(180deg)';

        mobContactStatus = true;
    }

    else {

        document.getElementById('mob-contact').style.opacity = '0';
        document.getElementById('mob-contact').style.top = '40px';
        document.getElementById('menu-dots').style.transform = 'rotateX(0deg)';

        mobContactStatus = false;
    }

})
