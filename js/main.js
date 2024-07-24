
const header = document.querySelector('.header');
const headerNav = document.querySelector('.header__nav');
const navTargetSections = document.querySelectorAll('[data-target ="nav-target"]')
const headerLinks = [...document.querySelectorAll(".header__link")]
const headerNavList = document.querySelector('.header__list')
let scrollTimeout

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header--active');
    } else {
        header.classList.remove('header--active');
    }

    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
        setActiveNavLinks()
    }, 100);
});

function isBurgerMenuInit() {
    return window.innerWidth <= 768
}

function setActiveNavLinks() {
    headerLinks.forEach(link => link.classList.remove('link--active'))
    if (window.scrollY <= navTargetSections[0].clientHeight / 2) {
        document.querySelector(`[href= "#${navTargetSections[0].id}"]`).classList.add('link--active')
        return
    }
    if ((innerHeight + scrollY >= document.documentElement.scrollHeight - 5)) {
        document.querySelector(`[href= "#${navTargetSections[navTargetSections.length - 1].id}"]`).classList.add('link--active')
        return
    }
    for (let i = navTargetSections.length - 1; i > 0; i--) {
        if (window.scrollY > navTargetSections[i].getBoundingClientRect().top + window.scrollY - header.clientHeight) {
            let targetLink = document.querySelector(`[href= "#${navTargetSections[i].id}"]`)
            targetLink.classList.add('link--active')
            break
        }
    }
}

headerNavList.addEventListener('click', (e) => {
    e.preventDefault()
    if (!e.target.classList.contains('header__link')) {
        return
    } else {
        scrollByTarget(e.target.hash)
        if (isBurgerMenuInit()) { toogleActiveNav(headerNavList) }
    }
})

function scrollByTarget(linkHash) {
    let elemTarget = document.querySelector(`${linkHash}`)
    let coord = elemTarget.getBoundingClientRect().top - headerNav.clientHeight
    scrollByY(coord)
}

function scrollByY(topPosition,) {
    window.scrollBy({
        top: topPosition,
        behavior: "smooth"
    });
}

const headerBurger = document.querySelector('.header__burger');

headerBurger.addEventListener('click', function () {
    toogleActiveNav(headerNavList)
})


function toogleActiveNav(nav) {
    if (nav.classList.contains('header__list--active')) {
        headerBurger.classList.remove('header__burger--active')
        let animCloseNav = nav.animate([{ transform: 'translateX(-100%)' }], { duration: 200 })
        animCloseNav.addEventListener('finish', function () { nav.classList.remove('header__list--active') })
        hideOverflowBody(true)
    } else {
        headerBurger.classList.add('header__burger--active')
        nav.classList.add('header__list--active')
        hideOverflowBody(false)
    }
}


function hideOverflowBody(isHidden) {
    isHidden ? document.body.style.overflowY = "" : document.body.style.overflowY = "hidden"
}

class AdaptiveSlider {
    constructor() {
        this.slider = document.querySelector('.portfolio__slider');
        this.slides = document.querySelectorAll('.portfolio__slide');
        this.sliderLine = document.querySelector('.portfolio__slider-line');
        this.pagination = document.querySelector('.portfolio__paginations');
        this.paginationDots = document.querySelectorAll('.portfolio__indicator');
        this.btnPrev = document.querySelector('.portfolio__button-previous');
        this.btnNext = document.querySelector('.portfolio__button-next');
        this.current = 0
        this.resizeTimeout
        this.slideWith

        this.btnPrev.addEventListener('click', () => {
            this.prev()
        })

        this.btnNext.addEventListener('click', () => {
            this.next()
        })

        this.init()

        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout)
            this.resizeTimeout = setTimeout(() => {
                this.init()
            }, 200);
        })

        this.pagination.addEventListener('click', (e) => {
            e.preventDefault()
            this.clickOnPagination(e)
        })
    }

    clickOnPagination(e) {
        if (!e.target.classList.contains('portfolio__indicator') || e.target.classList.contains('portfolio__indicator--active')) {
            return
        } else {
            this.current = e.target.dataset.number
            this.rollSlider()
        }
    }

    setActivePaginatonDot() {
        this.paginationDots.forEach(p => p.classList.remove('portfolio__indicator--active'))
        this.paginationDots[this.current].classList.add(('portfolio__indicator--active'))
        this.toogleActiveButton()
    }


    init() {
        this.setSliderSizes()
        this.rollSlider()

    }

    prev() {
        if (this.current === 0) {
            return
        } else {
            --this.current
            this.rollSlider()
            this.toogleActiveButton()
        }
    }


    next() {
        if (this.current === this.slides.length - 1) {
            return
        } else {
            ++this.current
            this.rollSlider()
            this.toogleActiveButton()
        }
    }


    rollSlider() {
        this.setActivePaginatonDot()
        this.sliderLine.style.transform = `translate(-${this.slideWith * this.current}px)`;
    }


    setSliderSizes(visibleSlides) {
        let sliderWidth = this.slider.clientWidth
        this.slideWith = sliderWidth / (visibleSlides || 1)
        this.sliderLine.style.width = this.slideWith * this.slides.length + 'px'
    }

    toogleActiveButton() {
        [this.btnPrev, this.btnNext].forEach(b => b.classList.remove('portfolio__button--disable'))
        this.current == 0
            ? this.btnPrev.classList.add('portfolio__button--disable')
            : this.current == this.slides.length - 1
                ? this.btnNext.classList.add('portfolio__button--disable')
                : null
    }

}

new AdaptiveSlider()




