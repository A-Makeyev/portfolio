const today = new Date()
const currentHour = today.getHours()
const greeting = document.getElementById('greeting')

if (currentHour < 12) {
    greeting.innerText = 'bonjour'
} else if (currentHour < 18) {
    greeting.innerText = 'bonsoir'
} 

/* LOADER */

window.addEventListener('load', () => {
    document.querySelector('.main').classList.remove('hidden')
    document.querySelector('.home-section').classList.add('active')
    document.querySelector('.loader').classList.add('fade-out')
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none'
    }, 1000)
})

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
    const hash = event.target.hash
    if (event.target.classList.contains('link-item') && hash !== '') {
        // activate overlay to prevent multiple clicks
        document.querySelector('.overlay').classList.add('active')
        navToggler.classList.add('hide')
        if (event.target.classList.contains('nav-item')) {
            toggleNavbar()
        } else {
            hideSection()
            document.body.classList.add('disable-scrolling')
        }
        setTimeout(() => {
            document.querySelector('section.active').classList.remove('active', 'fade-out')
            document.querySelector('.overlay').classList.remove('active')
            document.querySelector(hash).classList.add('active')
            document.body.classList.remove('disable-scrolling')
            navToggler.classList.remove('hide')
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

/* PROJECT ITEM DETAILS POPUP */

function toggleProjectPopup() {
    document.querySelector('.project-popup').classList.toggle('open')
    document.querySelector('.main').classList.toggle('fade-out')
    disableScrolling()
}

function displayprojectDetails(projectItem) {
    const projectImage = projectItem.querySelector('.project-item-thumbnail img').src
    const projectTitle = projectItem.querySelector('.project-item-title').innerHTML
    const projectDetails = projectItem.querySelector('.project-item-details').innerHTML

    document.querySelector('.popup-thumbnail img').src = projectImage
    document.querySelector('.popup-header h2').innerHTML = projectTitle
    document.querySelector('.popup-body').innerHTML = projectDetails
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('view-project-btn')) {
        toggleProjectPopup()
        displayprojectDetails(event.target.parentElement)
        document.querySelector('.project-popup').scrollTo(0, 0)
    }

    if (event.target.classList.contains('popup-inner')) {
        toggleProjectPopup()
    }
})

document.querySelector('.popup-close').addEventListener('click', toggleProjectPopup)
