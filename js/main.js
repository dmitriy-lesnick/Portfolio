const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header--active');
    } else {
        header.classList.remove('header--active');
    }
});

const headerLinks = document.querySelectorAll(".header__link");

function scrollByTarget(id) {
    const headerElHeight = header.clientHeight;
    const scrollTarget = document.getElementById(id);
    const elementPosition = scrollTarget.getBoundingClientRect().top - headerElHeight;

    window.scrollBy({
        top: elementPosition,
        behavior: "smooth"
    });
    headerList.classList.remove('header__list--open')
    headerBurger.classList.remove('header__burger--close')
    setTimeout(() => {
        headerList.classList.remove('header__list--transition')
    }, 500);
};

headerLinks.forEach(link => link.addEventListener('click', function (event) {
    event.preventDefault();
    const href = this.getAttribute('href').substring(1);
    scrollByTarget(href)
}));

const headerBurger = document.querySelector('.header__burger');
const headerList = document.querySelector('.header__list');

headerBurger.addEventListener('click', () => {
    if (headerList.classList == 'header__list header__list--transition header__list--open') {
        setTimeout(() => {
            headerList.classList.remove('header__list--transition')
        }, 500);
    }

    headerList.classList.add('header__list--transition')
    headerList.classList.toggle('header__list--open')
    headerBurger.classList.toggle('header__burger--close')

});

const portfolioSliders = document.querySelectorAll('.portfolio__slide');
const portfolioSlidersLine = document.querySelector('.portfolio__slider-line');
const portfolioSlider = document.querySelector('.portfolio__slider');
const portfolioPagination = document.querySelector('.portfolio__paginations');
const portfolioIndicators = document.querySelectorAll('.portfolio__indicator');
const arrowPrev = document.querySelector('.portfolio__button-previous');
const arrowNext = document.querySelector('.portfolio__button-next');

let portfolioSliderWidth;
adaptationSliderSize();
rollSlider();

window.addEventListener('resize', init)

function init() {
    adaptationSliderSize();
    rollSlider(indicatorId);
};

function adaptationSliderSize() {
    portfolioSliderWidth = portfolioSlider.offsetWidth;
    portfolioSlidersLine.style.width = portfolioSliderWidth * portfolioSliders.length + "px";
};

portfolioPagination.addEventListener('click', selectSlide);

let indicatorId = 0;

function selectSlide(event) {
    if (event.target.className !== "portfolio__indicator" || event.target.className == "portfolio__indicator portfolio__indicator--active") {
        return
    } else {
        this.querySelector('.portfolio__indicator--active').classList.remove('portfolio__indicator--active');
        event.target.classList.add('portfolio__indicator--active');
        indicatorId = parseInt(event.target.id);
        arrowStyleChange();
        rollSlider(indicatorId);
    }
};

function indicatorStyleChange() {
    portfolioIndicators.forEach(indicator => {
        if (indicator.id == indicatorId) {
            indicator.classList.add('portfolio__indicator--active');
        } else {
            indicator.classList.remove('portfolio__indicator--active');
        }
    })
};

function rollSlider(indicatorId) {
    portfolioSlidersLine.style.transform = 'translate(-' + indicatorId * portfolioSliderWidth + 'px)';
};

const portfolioArrows = document.querySelectorAll('.portfolio__arrow')
portfolioArrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        if (arrow.className == "portfolio__arrow portfolio__button-previous" && indicatorId == 0 || arrow.className == "portfolio__arrow portfolio__button-next" && indicatorId == portfolioSliders.length - 1) {
            return
        }
        if (arrow.className == "portfolio__arrow portfolio__button-previous") {
            indicatorId -= 1;
            arrowStyleChange()
            indicatorStyleChange()
            rollSlider(indicatorId)
        }
        if (arrow.className == "portfolio__arrow portfolio__button-next") {
            indicatorId += 1;
            arrowStyleChange()
            indicatorStyleChange()
            rollSlider(indicatorId)
        }

    })
});

function arrowStyleChange() {
    if (indicatorId == portfolioSliders.length - 1) {
        arrowNext.classList.add('portfolio__button--none')
    } else {
        arrowNext.classList.remove('portfolio__button--none')
    };
    if (indicatorId == 0) {
        arrowPrev.classList.add('portfolio__button--none')
    } else {
        arrowPrev.classList.remove('portfolio__button--none')
    };
};




