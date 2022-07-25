/* MAIN NAV */

function disableScrolling() {
    document.querySelector('body').classList.toggle('disable-scrolling')
}

function hideSection() {
    document.querySelector('section.active').classList.toggle('fade-out')
}

function toggleNavbar() {
    document.querySelector('.header').classList.toggle('active')
}

const navToggler = document.querySelector('.nav-toggler')
navToggler.addEventListener('click', () => {
    hideSection()
    toggleNavbar()
    disableScrolling()
})

/* SECTIONS */

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('link-item') && event.target.hash !== '') {
        const hash = event.target.hash
        if (event.target.classList.contains('nav-item')) {
            toggleNavbar()
        } else {
            hideSection()
            document.body.classList.add('disable-scrolling')
        }
        setTimeout(() => {
            document.querySelector('section.active').classList.remove('active', 'fade-out')
            document.querySelector(event.target.hash).classList.add('active')
            document.body.classList.remove('disable-scrolling')
            window.scrollTo(0, 0)
        }, 500)
    }
})

/* ABOUT TABS */

const tabContainer = document.querySelector('.about-tabs')
const aboutSection = document.querySelector('.about-section')

tabContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('tab-item') && !event.target.classList.contains('active')) {
        tabContainer.querySelector('.active').classList.remove('active')
        event.target.classList.add('active')

        let target = event.target.getAttribute('data-target')
        aboutSection.querySelector('.tab-content.active').classList.remove('active')
        aboutSection.querySelector(target).classList.add('active')
    }
})

/* PORTFOLIO ITEM DETAILS POPUP */

function togglePortfolioPopup() {
    document.querySelector('.portfolio-popup').classList.toggle('open')
    document.querySelector('.main').classList.toggle('fade-out')
    disableScrolling()
}

function displayPortfolioDetails(portfolioItem) {
    const portfolioImage = portfolioItem.querySelector('.portfolio-item-thumbnail img').src
    const portfolioTitle = portfolioItem.querySelector('.portfolio-item-title').innerHTML
    const portfolioDetails = portfolioItem.querySelector('.portfolio-item-details').innerHTML

    document.querySelector('.popup-thumbnail img').src = portfolioImage
    document.querySelector('.popup-header h2').innerHTML = portfolioTitle
    document.querySelector('.popup-body').innerHTML = portfolioDetails
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('view-project-btn')) {
        togglePortfolioPopup()
        displayPortfolioDetails(event.target.parentElement)
        document.querySelector('.portfolio-popup').scrollTo(0, 0)
    }

    if (event.target.classList.contains('popup-inner')) {
        togglePortfolioPopup()
    }
})

document.querySelector('.popup-close').addEventListener('click', togglePortfolioPopup)
