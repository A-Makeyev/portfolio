'use strict'

const icons = '/assets/icons'
const images = '/assets/images'
const imageList = [
    `${icons}/redux.png`, `${icons}/react.png`, `${icons}/python.png`, `${icons}/node.png`, `${icons}/html.png`, `${icons}/css.png`, `${icons}/js.png`,
    `${icons}/saltbae.png`, `${icons}/github-ninja.png`, `${icons}/M.png`, `${images}/about/anatoly.jpg`, `${images}/about/cloudbeat-conference.jpg`,
    `${images}/about/fast-team.jpg`, `${images}/about/startup-awards.jpg`, `${images}/about/awards-video.jpg`, `${images}/about/Responsive-Web-Design.jpg`,
    `${images}/about/JavaScript-Algorithms-and-Data-Structures.jpg`, `${images}/about/Software-Quality-Assurance-Certificate.jpg`, 
    `${images}/projects/Makeyev-Finance.jpg`, `${images}/projects/ChatUp.jpg`, `${images}/projects/portfolio.jpg`, `${images}/projects/portfolio-secret.jpg`,
    `${images}/hole.png`, `${images}/bandage.png`, `${images}/profile.png`, `${images}/avatar.png`, `${images}/astroid.gif`, `${images}/explosion.gif` 
]

const validPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
const validName = /^[^0-9.,_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const body = document.querySelector('body')
const home = document.querySelector('#home')
const activeSection = document.querySelector('section.active')
const header = document.querySelector('.header')
const nav = document.querySelector('.nav-main')
const tabContainer = document.querySelector('.about-tabs')
const aboutSection = document.querySelector('.about-section')
const main = document.querySelector('.main')
const imagePopup = document.querySelector('.image-popup')
const imageBody = document.querySelector('.image-body')
const imagePopupClose = document.querySelector('.image-popup-close')
const imageInner = document.querySelector('.image-inner')
const projectPopup = document.querySelector('.project-popup')
const popupBody = document.querySelector('.popup-body')
const popupThumbnail = document.querySelector('.popup-thumbnail')
const greeting = document.querySelector('#greeting')
const loader = document.querySelector('.loader')
const spaceLoader = document.querySelector('.space-loader')
const homeSection = document.querySelector('.home-section')
const bgIconsBox = document.querySelector('.bg-icons-box')
const navToggler = document.querySelector('.nav-toggler')
const overlay = document.querySelector('.overlay')
const logo = document.querySelector('.m-logo')
const midgetSaltBae = document.querySelector('.midget-salt-bae')
const giantSaltBae = document.querySelector('.giant-salt-bae')
const classified = document.querySelector('.classified')
const submit = document.querySelector('#submit')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const phoneInput = document.getElementById('phone')
var bgIconsWereActivated = false
var saltBaeWasActivated = false
var currentSection = ''

async function preloadImages() {
    await Promise.all(imageList.map((img) =>
        new Promise((res) => {
            let image = new Image()
            image.onload = res
            image.src = img
        }))
    )
}

function toggleNavbar() {
    header.classList.toggle('active')
}

function disableScrolling() {
    body.classList.toggle('disable-scrolling')
}

function scrollInto(selector) {
    if (selector == 'top') window.scrollTo({top: 0, behavior: 'smooth'})
    if (selector == 'bottom') window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    if (selector != null && typeof selector == 'object') selector.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
}

function hideSection() {
    document.querySelector('section.active').classList.toggle('fade-out')
}

function toggleProjectPopup() {
    main.classList.toggle('fade-out')
    projectPopup.classList.toggle('open')
}

function displayProjectDetails(projectItem) {
    let projectImageSrc = projectItem.querySelector('.project-item-thumbnail img').src
    projectImageSrc = projectImageSrc.includes('portfolio') ? projectImageSrc.replace('portfolio', 'portfolio-secret') : projectImageSrc
    popupBody.innerHTML = projectItem.querySelector('.project-item-details').innerHTML
    loadImage(projectImageSrc, 'projects') 
}

function togglePopup(message) {
    scrollInto(imageBody)
    main.classList.add('fade-out')
    imagePopup.classList.add('open')
    body.classList.add('disable-scrolling')

    if (message) imageBody.innerHTML = 
    `
        <div style="max-width: 300px;">
            <h3>${message}</h3>
        </div>
    `

    const close = () => {
        main.classList.remove('fade-out')
        imagePopup.classList.remove('open')
        body.classList.remove('disable-scrolling')
        imageBody.innerHTML = ''
    }

    imagePopupClose.addEventListener('click', close)
    imageInner.addEventListener('click', close)
}

function displayImage(id) {
    id = id.replace('img-to-display-', '')
    if (id.includes('facepalm')) projectPopup.classList.toggle('open')
    loadImage(`${images}/${currentSection}/${id}.jpg`, 'popup')
}

function displaySocials(links, action) {
    setTimeout(() => {
        for (let i = 0; i < links.length; i++) {
            setTimeout(() => {
                if (action == 'fadeIn') links[i].classList.remove('fade-out')
                if (action == 'fadeOut') links[i].classList.add('fade-out')
            }, 250 * i)
        }
    }, 1250)
}

function displayCoordinates(links, action) {
    setTimeout(() => {
        for (let i = 0; i < links.length; i++) {
            setTimeout(() => {
                links[i].style.width = '55px'
                links[i].style.height = '55px'
                links[i].style.border = 'none'
                links[i].style.cursor = 'text'
                links[i].style.fontWeight = 'bold'
                links[i].style.padding = '15px 5px'
                links[i].style.color = 'var(--dark-blue)'
                links[i].style.backgroundColor = 'transparent'
                links[i].style.textShadow = '0.5px 0.5px var(--white-alpha-40)'

                if (links[i].classList.contains('exposed')) {
                    links[i].textContent = '😳'
                    links[i].style.cursor = 'help'
                    links[i].style.pointerEvents = 'auto'
                    links[i].setAttribute('title', '👀')
                } else {
                    links[i].textContent = '?'
                    links[i].style.pointerEvents = 'none'
                }

                if (links[i].classList.contains('link-to-remove')) links[i].remove()
                if (action == 'fadeIn') links[i].classList.remove('fade-out')
                if (action == 'fadeOut') links[i].classList.add('fade-out')
            }, 250 * i)
        }
    }, 1250)
}

async function loadImage(url, location) {
    loader.classList.remove('fade-out')
    let res = await fetch(url, { method: 'GET' })
    if (res.status === 200) {
        url = url.split('/')

        let imageBlob = await res.blob()
        let imageObjectURL = URL.createObjectURL(imageBlob);
        let image = document.createElement('img')
        let imageId = url[url.length - 1]

        image.src = imageObjectURL
        image.alt = imageId
        
        loader.classList.add('fade-out')
        if (location == 'popup') {
            togglePopup()
            imageBody.innerHTML = `<img src="${imageObjectURL}" alt="${imageId}">`           
        } else if (location == 'projects') {
            toggleProjectPopup()
            popupThumbnail.innerHTML = `<img src="${imageObjectURL}" alt="${imageId}">`
        }
    } else {
        alert(res.status)
    }
}

async function summonAliens() {
    main.classList.add('fade-out')
    spaceLoader.classList.remove('fade-out')
    let invaders = `${window.location.href.split('#')[0]}assets/invaders.html`
    await fetch(invaders, { method: 'GET' })
    .then((res) => {
        return res.text()
    })
    .then((html) => {
        const displayBoard = () => {
            imagePopup.style.display = 'block'
            imageBody.innerHTML = `<iframe class="invaders"></iframe>`
            let invadersFrame = document.querySelector('.invaders').contentWindow.document
            invadersFrame.open()
            invadersFrame.write(html)
            invadersFrame.close()
            document.querySelector('.invaders').contentWindow.focus()
            scrollInto(imageBody)
        }

        if (isMobileDevice) {
            setTimeout(() => {
                togglePopup()
                spaceLoader.classList.add('fade-out')
                imagePopup.style.display = 'none'
                displayBoard()
            }, 2000)
        } else {
            setTimeout(() => {
                togglePopup()
                spaceLoader.classList.add('fade-out')
                imageBody.innerHTML = 
                `
                    <div style="padding:30px;">
                        <p style="padding:5px;">
                            press <b style="font-size: x-large;">↔️</b> to move</p>
                        <p>and <b>space</b> to shoot</p>
                    </div>
                `
            }, 1500)
            setTimeout(() => { 
                displayBoard()  
            }, 3500)
        }
    }).catch((err) => {
        alert(`Failed to fetch ${url}`, err)
    })
}

function validate(input, regex) {
    input.addEventListener('input', (event) => {
        if (event.target.value.match(regex)) {
            input.style.boxShadow = '4px 4px 4px var(--green)'
        } else {
            input.style.boxShadow = '4px 4px 4px var(--red)'
        }
    })
}

/* LOADER */

window.addEventListener('load', () => {
    greeting.innerText = new Date().getHours() < 18 ? 'bonjour' : 'bonsoir'
    loader.classList.add('fade-out')

    console.log(
        '%c asd asd ',
        [ 
            'padding: 10px',
            'color: aliceblue',
            'font-size: xx-large',
            'text-shadow: 2px 2px 2px black',
            'background: linear-gradient(0deg, aliceblue, darkblue)',
        ].join(';')
    )

    setTimeout(() => {
        main.classList.remove('hidden')
        homeSection.classList.add('active')
        bgIconsBox.classList.remove('fade-out')
        spaceLoader.classList.remove('hidden')
    }, 500)

    preloadImages()
})

/* MAIN NAV */

navToggler.addEventListener('click', () => {
    disableScrolling()
    scrollInto('top')
    toggleNavbar()
    hideSection()  
})

/* CLICK EVENTS */

document.addEventListener('click', (event) => {
    const hash = event.target.hash

    if (event.target.classList.contains('link-item') && hash !== '') {
        event.preventDefault()
        currentSection = hash.split('#')[1]

        scrollInto('top')
        overlay.classList.add('active')
        navToggler.classList.add('hide')

        if (event.target.classList.contains('nav-item')) {
            toggleNavbar()
        } else {
            disableScrolling()
            hideSection()
        }

        setTimeout(() => {
            document.querySelector('section.active').classList.remove('active', 'fade-out')
            document.querySelector(hash).classList.add('active')
            body.classList.remove('disable-scrolling')
            navToggler.classList.remove('hide')
            overlay.classList.remove('active')
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

    if (event.target.classList.contains('view-project-btn')) {
        displayProjectDetails(event.target.parentNode.parentNode)
        scrollInto(projectPopup)
    }

    if (event.target.classList.contains('popup-close') || event.target.classList.contains('popup-inner')) {
        popupThumbnail.innerHTML = ''
        toggleProjectPopup()
    }

    if (event.target.id != 'undefined' && event.target.id.includes('img-to-display')) {
        if (!(event.target.id.includes('anatoly') && window.innerWidth < 750)) {
            displayImage(event.target.id)
        }
    }

    if (event.target.classList.contains('activate-salt-bae')) {
        if (!saltBaeWasActivated) {
            setTimeout(() => {
                midgetSaltBae.click()
                saltBaeWasActivated = true
            }, 1500)
        } 

        if (!bgIconsWereActivated) {
            setTimeout(() => {
                logo.click()
                bgIconsWereActivated = true
            }, 1750)
        }
    }

    if (event.target.classList.contains('m-logo')) {
        bgIconsBox.classList.toggle('active')
        bgIconsWereActivated = true
    }

    if (event.target.classList.contains('github-ninja')) {
        summonAliens()
    }
})

/* ABOUT TABS */

tabContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('tab-item') && !event.target.classList.contains('active')) {
        tabContainer.querySelector('.active').classList.remove('active')
        event.target.classList.add('active')

        let target = event.target.getAttribute('data-target')
        aboutSection.querySelector('.tab-content.active').classList.remove('active')
        aboutSection.querySelector(target).classList.add('active')
    }
})

/* SECRET SURPRISE */

midgetSaltBae.addEventListener('click', () => {
    const links = document.querySelectorAll('.secret-links a')

    if (saltBaeWasActivated && window.innerWidth >= 1045) {
        const displayPosition = (event) => {
            let rectX = Math.floor(classified.getBoundingClientRect().x)
            let rectY = Math.floor(classified.getBoundingClientRect().y)
            let positionX = (rectX + 200 < event.pageX || rectX - 200 > event.pageX)
            let positionY = (rectY + 200 < event.pageY || rectY - 200 > event.pageY)

            document.querySelector('.secret-links a:nth-child(1)').textContent = 'X'
            document.querySelector('.secret-links a:nth-child(2)').textContent = event.pageX
            document.querySelector('.secret-links a:nth-child(3)').textContent = positionX ? '❄️' : '🔥'

            document.querySelector('.secret-links a:nth-child(4)').textContent = 'Y'
            document.querySelector('.secret-links a:nth-child(5)').textContent = event.pageY
            document.querySelector('.secret-links a:nth-child(6)').textContent = positionY ? '❄️' : '🔥'
        }
        body.addEventListener('mouseover', displayPosition) 

        classified.classList.add('exposed')
        classified.addEventListener('mouseover', () => {
            let exposed = document.querySelector('.exposed')
            exposed.classList.remove('classified')

            window.addEventListener('resize', () => {
                if (window.innerWidth == 1400 && window.innerHeight == 700) { 
                    exposed.style.pointerEvents = 'auto'
                    exposed.style.cursor = 'pointer'
                    exposed.onclick = () => {

                        exposed.textContent = '🙃'
                        setTimeout(() => {
                            document.querySelector('.secret-links a:nth-child(1)').textContent = '❤️'
                            document.querySelector('.secret-links a:nth-child(2)').textContent = '🤍'
                            document.querySelector('.secret-links a:nth-child(3)').textContent = '💘'
                            document.querySelector('.secret-links a:nth-child(4)').textContent = '🖤'
                            document.querySelector('.secret-links a:nth-child(5)').textContent = '❤️'
                            document.querySelector('.secret-links a:nth-child(6)').textContent = '💜'
                        }, 3000)

                        togglePopup('🚩')
                        
                        body.style.animation = 'restore 3s ease-in-out forwards'
                        setTimeout(() => { 
                            document.getElementById('crash-site').style.backgroundImage = 'url(/assets/images/bandage.png)'
                            body.style.backgroundImage = 'linear-gradient(to bottom right, var(--light-blue), var(--light-purple))'
                        }, 3000)
                    }
                } else {
                    exposed.style.pointerEvents = 'none'
                }
            })
        })

        const sendAstroid = () => {  
            new Audio('/assets/sounds/impact.mp3').play()

            giantSaltBae.style.pointerEvents = 'none'
            body.removeEventListener('mouseover', displayPosition) 

            let astroid = document.createElement('div')
            astroid.setAttribute('id', 'crash-site')
            body.appendChild(astroid)
            astroid.style.animation = 'crash 6s linear'
            body.style.animation = 'shake 6s ease-in-out forwards'

            setTimeout(() => {
                document.querySelector('.secret-links a:nth-child(1)').textContent = 'MTQ'
                document.querySelector('.secret-links a:nth-child(2)').textContent = 'wMC'
                document.querySelector('.secret-links a:nth-child(3)').textContent = 'B4I'
                document.querySelector('.secret-links a:nth-child(4)').textContent = 'Dcw'
                document.querySelector('.secret-links a:nth-child(5)').textContent = 'MA'
                document.querySelector('.secret-links a:nth-child(6)').textContent = '=='
                document.querySelector('.secret-links a:nth-child(7)').textContent = '😨'
                body.style.backgroundImage = 'linear-gradient(to bottom right, var(--red), var(--dark-blue))'

                if (!bgIconsWereActivated) {
                    logo.click()
                    bgIconsWereActivated = true
                }
            }, 3000)

            // execute only once
            classified.removeEventListener('mouseover', sendAstroid)
        }
        classified.addEventListener('mouseover', sendAstroid)

        giantSaltBae.classList.remove('fade-out')
        midgetSaltBae.classList.add('fade-out')
        displayCoordinates(links, 'fadeIn')
    } else {
        giantSaltBae.classList.remove('fade-out')
        midgetSaltBae.classList.add('fade-out')
        displaySocials(links, 'fadeIn')
    }

    giantSaltBae.addEventListener('click', () => {
        giantSaltBae.classList.add('fade-out')
        displaySocials(links, 'fadeOut')
        setTimeout(() => {
            midgetSaltBae.classList.remove('fade-out')
        }, 500 * links.length)
    })
    saltBaeWasActivated = true
})

/* CONTACT */

validate(nameInput, validName)
validate(emailInput, validEmail)
validate(phoneInput, validPhone)

submit.addEventListener('click', (event) => {
    if (!nameInput.value.match(validName) || !emailInput.value.match(validEmail) || !phoneInput.value.match(validPhone)) {
        event.preventDefault()
    } else {
        togglePopup('Why would you use this form? Just email/call me directly :)')
    }
})
