var saltBaeWasActivated = false

function disableScrolling() {
    document.querySelector('body').classList.toggle('disable-scrolling')
}

function hideSection() {
    document.querySelector('section.active').classList.toggle('fade-out')
}

function toggleNavbar() {
    document.querySelector('.header').classList.toggle('active')
}

function scrollInto(selector) {
    document.querySelector(selector).scrollIntoView({ 
        behavior: 'smooth', block: 'center', inline: 'center' 
    })
}

/* LOADER */

if (window.matchMedia('(max-width: 574px)').matches) {
    document.querySelector('.loader div:nth-child(1)').style.display = 'none'
}

window.addEventListener('load', () => {
    const today = new Date()
    const currentHour = today.getHours()
    const greeting = document.getElementById('greeting')
    greeting.innerText = currentHour < 18 ? 'bonjour' : 'bonsoir'

    document.querySelector('.loader').classList.add('fade-out')
    setTimeout(() => {
        document.querySelector('.loader').remove()
        document.querySelector('.main').classList.remove('hidden')
        document.querySelector('.home-section').classList.add('active')
        document.querySelector('.bg-icons-box').classList.remove('fade-out')
        scrollInto('#home')
        setTimeout(() => {
            document.querySelector('.m-logo').click()
        }, 2500)
    }, 500)
})

/* MAIN NAV */

const navToggler = document.querySelector('.nav-toggler')
navToggler.addEventListener('click', () => {
    scrollInto('.nav-inner')
    disableScrolling()
    toggleNavbar()
    hideSection()
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

    if (event.target.hasAttribute('href') && event.target.href.includes('#')) {
        let title = hash.replace(/[^\w\s]/gi, '')
        title = title.charAt(0).toUpperCase() + title.slice(1)
        if (title.includes('Home')) {
            document.title = `Anatoly Makeyev`
        } else {
            document.title = `AM | ${title}`
        }
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

/* POPUPS */

function toggleProjectPopup() {
    document.querySelector('.main').classList.toggle('fade-out')
    document.querySelector('.project-popup').classList.toggle('open')
}

function displayProjectDetails(projectItem) {
    const projectImage = projectItem.querySelector('.project-item-thumbnail img').src
    const projectDetails = projectItem.querySelector('.project-item-details').innerHTML

    document.querySelector('.popup-thumbnail img').src = projectImage
    document.querySelector('.popup-body').innerHTML = projectDetails
}

function displayImage(id) {
    id = id.replace('img-to-display-', '')
    document.querySelector('.main').classList.add('fade-out')
    document.querySelector('.image-popup').classList.add('open')
    document.querySelector('body').classList.add('disable-scrolling')

    document.querySelector('.image-content').innerHTML = `<p>Loading...</p>`

    setTimeout(() => {
        if (window.location.href.includes('#about')) {
            fetch(`assets/images/timeline/${id}.jpg`)
            .then(res => {
                document.querySelector('.image-content').innerHTML = `<img src="${res.url}" alt="${id}">`
            })
        } else if (window.location.href.includes('#projects')) {
            fetch(`assets/images/projects/${id}.jpg`)
            .then(res => {
                document.querySelector('.image-content').innerHTML = `<img src="${res.url}" alt="${id}">`
            })
        }
    }, 500)

    document.querySelector('.image-popup-close').addEventListener('click', () => {
        document.querySelector('body').classList.remove('disable-scrolling')
        document.querySelector('.image-popup').classList.remove('open')
        document.querySelector('.main').classList.remove('fade-out')
        document.querySelector('.image-content img').src = ''
    })
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('view-project-btn')) {
        toggleProjectPopup()
        displayProjectDetails(event.target.parentNode.parentNode)
        document.querySelector('.project-popup').scrollTo(0, 0)
    }

    if (event.target.classList.contains('popup-inner')) {
        document.querySelector('.popup-thumbnail img').src = ''
        toggleProjectPopup()
    }
    
    if (event.target.id != 'undefined' && event.target.id.includes('img-to-display')) {
        displayImage(event.target.id)
    }

    if (event.target.classList.contains('activate-salt-bae')) {
        if (!saltBaeWasActivated) {
            setTimeout(() => {
                document.querySelector('.midget-salt-bae').click()
                saltBaeWasActivated = true
            }, 3000)
        }
    }

    if (event.target.classList.contains('m-logo')) {
        document.querySelector('.bg-icons-box').classList.toggle('active')
    }
})

document.querySelector('.popup-close').addEventListener('click', toggleProjectPopup)

/* SECRET SURPRISE */

function displaySocials(links, action) {
    setTimeout(() => {
        for (let i = 0; i < links.length; i++) {
            setTimeout(() => {
                if (action == 'fadeOut') links[i].classList.add('fade-out')
                if (action == 'fadeIn') links[i].classList.remove('fade-out')
            }, 250 * i)
        } 
    }, 1000)
}

document.querySelector('.midget-salt-bae').addEventListener('click', () => {
    const links = document.querySelectorAll('.secret-links a')

    document.querySelector('.giant-salt-bae').classList.remove('fade-out')
    document.querySelector('.midget-salt-bae').classList.add('fade-out') 
    displaySocials(links, 'fadeIn')

    document.querySelector('.giant-salt-bae').addEventListener('click', () => {
        document.querySelector('.giant-salt-bae').classList.add('fade-out')
        displaySocials(links, 'fadeOut')
        setTimeout(() => {
            document.querySelector('.midget-salt-bae').classList.remove('fade-out')
        }, 500 * links.length)
    })
})
