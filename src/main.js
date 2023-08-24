'use strict'

const icons = '/assets/icons'
const images = '/assets/images'

const secretImages = [`${images}/astroid.gif`, `${images}/explosion.gif`, `${images}/hole.png`]

const generalImages = [
    `${images}/already-inside.jpg`, `${images}/already-inside-facepalm.jpg`,
    `${images}/profile.png`, `${images}/avatar.png`, `${icons}/saltbae.png`, `${icons}/github-ninja.png`, `${icons}/M.png`,
    `${icons}/redux.png`, `${icons}/react.png`, `${icons}/python.png`, `${icons}/node.png`, `${icons}/html.png`, `${icons}/css.png`, `${icons}/js.png`,
    `${images}/about/Quality-Assurance-Certificate.jpg`, `${images}/about/Responsive-Web-Design.jpg`, `${images}/about/JavaScript-Algorithms-and-Data-Structures.jpg`,
    `${images}/about/anatoly.jpg`, `${images}/about/fast-team.jpg`, `${images}/about/startup-awards.jpg`, `${images}/about/awards-video.jpg`, `${images}/about/cloudbeat-conference.jpg`
]

const dev = 'http://127.0.0.1:5500/'
const prod = 'https://makeyev.onrender.com/'
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
const imageContent = document.querySelector('.image-content')
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
const submitBtn = document.querySelector('#submit')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const phoneInput = document.getElementById('phone')
const messageInput = document.getElementById('message')
const areaListener = new AbortController()
var bgIconsWereActivated = false
var saltBaeWasActivated = false
var currentSection = ''
var flagFound = false

async function preloadImages(src) {
    if (Array.isArray(src)) {
        await Promise.all(src.map((img) =>
            new Promise((res) => {
                let image = new Image()
                image.onload = res
                image.src = img
            }))
        )
    } else {
        await new Promise((res) => {
            let image = new Image()
            image.onload = res
            image.src = src
        })
    }
}

function randomNumber(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min
  }

function toggleNavbar() {
    header.classList.toggle('active')
}

function toggleScrolling() {
    body.classList.toggle('disable-scrolling')
}

function scrollInto(selector) {
    if (selector == 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
    if (selector == 'bottom') window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    if (selector != null && typeof selector == 'object') selector.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
}

function hideSection() {
    document.querySelector('section.active').classList.toggle('fade-out')
}

function toggleProjectPopup() {
    main.classList.toggle('fade-out')
    projectPopup.classList.toggle('open')
}

function getParent(initialElement, targetElementSelector, tries) {
    let target = initialElement.querySelector(targetElementSelector)
    if (tries === 0) return
    return (target !== null && target !== undefined) ? target : getParent(initialElement.parentNode, targetElementSelector, tries - 1)
}

async function displayProjectDetails(projectItem) {
    loader.classList.remove('fade-out')
    let projectSrc = getParent(projectItem, '.project-thumbnail-scale iframe', 10).src

    await fetch(projectSrc, { method: 'GET', accept: 'text/html', mode: 'no-cors' })
        .then((res) => {
            res.text()
        })
        .then(() => {
            let projectDetails = getParent(projectItem, '.project-item-details', 10).innerHTML

            popupBody.innerHTML = projectDetails
            popupThumbnail.innerHTML =
            `
                <div class="project-main-container">
                    <div class="project-main-scale">
                        <iframe src="${projectSrc}" frameborder="0"></iframe>
                    </div>
                </div> 
            `

            loader.classList.add('fade-out')
            toggleProjectPopup()
        })
}

function togglePopup(message, status) {
    scrollInto(imageBody)
    main.classList.add('fade-out')
    imagePopup.classList.add('open')
    body.classList.add('disable-scrolling')
    imageContent.style.border = `2px solid ${status == 'success' ? '#40BD1A' : status == 'failure' ? '#A00023' : 'rgba(225, 255, 255, 0.40'}`

    if (message) imageBody.innerHTML =
        `
        <div style="min-height: 150px; max-width: 300px; padding: 50px 25px;">
            <div style="margin: 10px 0;">
                ${message === '🚩' ? `<h1>${message}</h1>` : `<h3>${message}</h3>`}  
            </div>
        </div>
    `

    const close = () => {
        imageBody.innerHTML = ''
        main.classList.remove('fade-out')
        imagePopup.classList.remove('open')
        body.classList.remove('disable-scrolling')
    }

    imagePopupClose.addEventListener('click', close)
    // imageInner.addEventListener('click', close)
}

function displayImage(id) {
    id = id.replace('img-to-display-', '')
    if (id.includes('facepalm')) projectPopup.classList.toggle('open')
    loadImage(currentSection == 'projects' ? `${images}/${id}.jpg` : `${images}/${currentSection}/${id}.jpg`, 'popup')
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

function changeLoaderColor() {
    let exposed = 'exposed' in localStorage || 'exposedInMobile' in localStorage
    document.querySelector('.loader div:nth-child(1)').style.borderColor = exposed ? 'var(--cyan)' : 'var(--dark-blue)'
    document.querySelector('.loader div:nth-child(2)').style.borderColor = exposed ? 'var(--orange)' : 'var(--red)'
    document.querySelector('.loader div:nth-child(3)').style.borderColor = exposed ? 'var(--cyan)' : 'var(--dark-blue)'
    document.querySelector('.loader div:nth-child(4)').style.borderColor = exposed ? 'var(--orange)' : 'var(--red)'
}

function sendAstroid() {
    preloadImages(secretImages)

    setTimeout(() => {
        document.getElementById('impact').play()
        giantSaltBae.style.pointerEvents = 'none'
        body.removeEventListener('mouseover', displayPosition)

        let astroid = document.createElement('div')
        astroid.setAttribute('id', 'crash-site')
        body.appendChild(astroid)
        astroid.style.animation = 'crash 6s linear'
        body.style.animation = 'shake 6s ease-in-out forwards'
        // astroid.style.top = randomNumber(5, 70) + 'vh'
        // astroid.style.right = randomNumber(window.innerWidth >= 1045 ? 20 : 5, window.innerWidth >= 1045 ? 70 : 55) + 'vw'

        setTimeout(() => {
            setHint()
            changeLoaderColor()
            body.style.backgroundImage = 'var(--red-background)'

            if (!bgIconsWereActivated) {
                logo.click()
                bgIconsWereActivated = true
            }
        }, 6000)
    }, 250)
}

function displayCoordinates(links, action) {
    toggleScrolling()
    setTimeout(() => {
        for (let i = 0; i < links.length; i++) {
            setTimeout(() => {
                links[i].style.width = '55px'
                links[i].style.height = '55px'
                links[i].style.border = 'none'
                links[i].style.cursor = 'text'
                links[i].style.fontWeight = 'bold'
                links[i].style.color = 'var(--dark-blue)'
                links[i].style.backgroundColor = 'transparent'
                links[i].style.textShadow = '0.5px 0.5px var(--white-alpha-40)'
                links[i].classList.add('coordinate')

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
                if (i == links.length) toggleScrolling()
            }, 250 * i)
        }
    }, 1250)
}

function displayPosition(event) {
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

function setHint() { // Ⓖ Ⓔ Ⓣ Ⓐ Ⓟ Ⓒ 💻
    setTimeout(() => { document.querySelector('.secret-links a:nth-child(1)').textContent = !isMobileDevice ? 'MTQ' : '010' }, 500) 
    setTimeout(() => { document.querySelector('.secret-links a:nth-child(2)').textContent = !isMobileDevice ? 'wMC' : '100' }, 1000)
    setTimeout(() => { document.querySelector('.secret-links a:nth-child(3)').textContent = !isMobileDevice ? 'B4I' : '00 ' }, 1500)
    setTimeout(() => { document.querySelector('.secret-links a:nth-child(4)').textContent = !isMobileDevice ? 'Dcw' : '🌌' }, 2000)
    setTimeout(() => { document.querySelector('.secret-links a:nth-child(5)').textContent = !isMobileDevice ? 'MA' : '01' }, 2500)
    setTimeout(() => { document.querySelector('.secret-links a:nth-child(6)').textContent = !isMobileDevice ? '==' : '000' }, 3000)
    setTimeout(() => { 
        body.style.cursor = 'progress'
        document.querySelector('.secret-links a:nth-child(7)').textContent = !isMobileDevice ? '🤔' : '011'
        !isMobileDevice && document.querySelector('.secret-links a:nth-child(7)').setAttribute('title', 'ベース64のように見えます')
    }, 3500)
}

async function loadImage(url) {
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
        imageBody.innerHTML = `<img src="${imageObjectURL}" alt="${imageId}">`
        togglePopup()
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
                            <div style="margin-bottom:10px;">
                                <p>press <b style="font-size: x-large;">↔️</b> to move</p>
                                <p>and <b>space</b> to shoot</p>
                            </div>
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

function captureTheFlag() {
    let exposed = document.querySelector('.exposed')

    if (!flagFound) {
        console.log(
            `%c${window.innerWidth} x ${window.innerHeight}`,
            ['padding: 10px',
                'color: aliceblue',
                'font-size: xx-large',
                'text-shadow: 2px 2px 2px black',
                'background: linear-gradient(0deg, aliceblue, darkblue)',
            ].join(';')
        )
    }

    if (window.innerWidth == 1400 && window.innerHeight == 700) {
        exposed.style.pointerEvents = 'auto'
        exposed.style.fontSize = 'x-large'
        exposed.style.cursor = 'pointer'
        exposed.removeAttribute('title')
        exposed.classList.add('😱')
        exposed.textContent = '😰'
        body.style.cursor = 'wait'
        
        exposed.onclick = () => {
            window.removeEventListener('resize', captureTheFlag)
            togglePopup('🚩')
            flagFound = true
            
            if (!isMobileDevice) {
                localStorage.setItem('flagFound', true)
                localStorage.removeItem('exposedInMobile')
                localStorage.removeItem('exposed')
                changeLoaderColor()
            }

            console.clear()
            console.log('🙂')
            exposed.textContent = '🙃'
            preloadImages(`${images}/bandage.png`)
            body.style.animation = 'restore 3s ease-in forwards'
            body.style.cursor = 'auto'

            setTimeout(() => {
                giantSaltBae.style.pointerEvents = 'auto'
                giantSaltBae.click()
            }, 1000)

            setTimeout(() => {
                toggleScrolling()
                document.querySelector('.secret-links a:nth-child(7)').remove()
                document.querySelector('.secret-links a:nth-child(6)').textContent = '💜'
                document.querySelector('.secret-links a:nth-child(5)').textContent = '💖'
                document.querySelector('.secret-links a:nth-child(4)').textContent = '🖤'
                document.querySelector('.secret-links a:nth-child(3)').textContent = '💘'
                document.querySelector('.secret-links a:nth-child(2)').textContent = '🤍'
                document.querySelector('.secret-links a:nth-child(1)').textContent = '❤️'
                body.style.backgroundImage = 'linear-gradient(to bottom right, var(--light-blue), var(--light-purple))'
                setTimeout(() => { document.getElementById('crash-site').style.backgroundImage = 'url(/assets/images/bandage.png)' }, 2000)
                setTimeout(() => { midgetSaltBae.click() }, 10000)
            }, 4000)
        }
    } else {
        exposed.textContent = !isMobileDevice ? '😨' : '11'
        exposed.style.pointerEvents = 'none'
        exposed.style.fontSize = 'larger'
        exposed.style.cursor = 'help'
        body.style.cursor = 'progress'
    }
}

function validate(input, regex) {
    submitBtn.style.pointerEvents = 'none'
    input.addEventListener('input', (event) => {
        if (event.target.value.match(regex)) {
            input.style.boxShadow = '4px 4px 4px var(--green)'
        } else {
            input.style.boxShadow = '4px 4px 4px var(--red)'
        }

        if (!nameInput.value.match(validName) || !emailInput.value.match(validEmail) || !phoneInput.value.match(validPhone)) {
            submitBtn.setAttribute('disabled', '')
            submitBtn.style.pointerEvents = 'none'
        } else {
            submitBtn.removeAttribute('disabled')
            submitBtn.style.pointerEvents = 'auto'
        }

        if (!submitBtn.hasAttribute('disabled')) {
            submitBtn.onclick = () => {
                sendEmail()
            }
        }
    })
}

function sendEmail() {
    loader.classList.remove('fade-out')

    try {
        if (typeof Email == 'undefined') {
            loader.classList.add('fade-out')
            togglePopup('Something is blocking me from sending emails on this device', 'failure')
        } else {
            Email.send({
                // https://smtpjs.com
                // https://elasticemail.com
                // SMTP Host & Domain -> smtp.elasticemail.com
                SecureToken: 'b52b8a29-d8bb-4e74-bff5-3c1dbf06d967',
                To: 'anatoly.makeyev@gmail.com',
                From: 'anatoly.makeyev@gmail.com',
                Subject: 'New Client 🤩',
                Body: createEmailBody()
            })
            .then(response => {
                console.log(response)
                // handle communication buffer resources
                if (response.includes('deadlock victim')) {
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
                    console.log(`Process (${response.match(/\d/g).join('')}) was deadlocked, resending email...`)
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
                    sendEmail()
                } else if (!response.includes('OK')) {
                    loader.classList.add('fade-out')
                    togglePopup(`There was a problem with sending your message: ${response}`, 'failure')
                } else {
                    loader.classList.add('fade-out')
                    togglePopup('Your message was sent, thanks for reaching out!', 'success')
                }
            })
        }
    } catch (error) {
        loader.classList.add('fade-out')
        console.log(error)
    }

    document.querySelectorAll('.input-control').forEach((i) => {
        i.style.boxShadow = ''
        i.value = ''
    })
}

function createEmailBody() {
    return `
        <div>
            <h4>
                <span>New submission from</span> 
                <a href="${prod}" target="_blank" style="text-decoration: none;">
                    <span style="color: #2A85BE;">Portfolio Website</span>
                </a>
            </h4>
            <table style="border: 1px solid #555555; border-collapse: collapse; width: 100%;">
                <tbody style="font-family: 'Fira Code', sans-serif; font-size: 15px; text-align: center; color: #18293C">
                    <tr style="border: 1px solid #2A85BE; background: #2A85BE; color: #F4FAFD; padding: 15px 10px;">
                        <td style="padding: 10px;"><strong>Details</strong></td>
                        <td></td>
                    </tr>
                    <tr style="border: 1px solid #555555;">
                        <td style="width: 20%; border-right: 1px solid #555555; padding: 10px;">
                            <strong>Name</strong>
                        </td>
                        <td style="padding:10px;">
                            <pre style="margin: 0; white-space: pre-wrap;">${nameInput.value}</pre>
                        </td>
                    </tr>
                    <tr style="border: 1px solid #555555;">
                        <td style="width: 20%; border-right: 1px solid #555555; padding: 10px;">
                            <strong>Phone</strong>
                        </td>
                        <td style="padding: 10px;">
                            <a href="tel:${phoneInput.value}" target="_blank" style="margin: 0; white-space: pre-wrap; text-decoration: none;">${phoneInput.value}</a>
                        </td>
                    </tr>
                    <tr style="border: 1px solid #555555;">
                        <td style="width: 20%; border-right: 1px solid #555555; padding: 10px;">
                            <strong>Email</strong>
                        </td>
                        <td style="padding: 10px;">
                            <a href="mailto:${emailInput.value}" target="_blank" style="margin: 0; white-space: pre-wrap; text-decoration: none;">${emailInput.value}</a>
                        </td>
                    </tr>
                    ${messageInput.value.trim() !== '' ?
            `
                        <tr style="border: 1px solid #555555;">
                            <td style="width: 20%; border-right: 1px solid #555555; padding: 10px;">
                                <strong>Message</strong>
                            </td>
                            <td style="padding: 10px;">
                                <pre style="margin: 0; white-space: pre-wrap;">${messageInput.value}</pre>
                            </td>
                        </tr>
                    `
            : ``}
                </tbody>
            </table>
            <div style="text-align: center; margin-top: 50px;">
                <img src="${prod}assets/icons/M.png" style="max-width: 250px;">
            </div>
        </div>
    `
}

/* LOADER */

if ('exposed' in localStorage) {
    changeLoaderColor()
    body.style.cursor = 'progress'
    body.style.transform = 'rotate(16deg)'
    body.style.backgroundImage = 'var(--red-background)' 
}

window.addEventListener('load', () => {
    let url = window.location.href
    if (url.includes('index.html') || url.includes('/?fbclid=')) window.location.replace('/')
    greeting.innerText = new Date().getHours() < 18 ? 'bonjour' : 'bonsoir'
    loader.classList.add('fade-out')

    setTimeout(() => {
        main.classList.remove('hidden')
        homeSection.classList.add('active')
        bgIconsBox.classList.remove('fade-out')
        spaceLoader.classList.remove('hidden')
    }, 500)

    if ('exposed' in localStorage) {
        setTimeout(() => { 
            let astroid = document.createElement('div')
            astroid.setAttribute('id', 'crash-site')
            body.appendChild(astroid)
         }, 600)

        saltBaeWasActivated = true
        bgIconsWereActivated = true

        logo.click()
        midgetSaltBae.click()
        areaListener.abort()

        setTimeout(() => { setHint() }, 3500)
        setTimeout(() => {
            let exposed = document.querySelector('.exposed')
            exposed.classList.remove('classified')
            classified.removeEventListener('mouseover', sendAstroid)
        }, 7500)
    }

    if ('flagFound' in localStorage) {
        let pikachu = document.querySelector('.pikachu')
        pikachu.style.display = 'inline-block'
        pikachu.onclick = () => {
            toggleScrolling()
            localStorage.clear()
            navToggler.style.display = 'none'
            pikachu.style.transform = 'translate(50%, -350%) scale(5)'
            setTimeout(() => { pikachu.style.transform = 'translate(50%, -350%) scale(15) rotate(-50deg)' }, 500)
            setTimeout(() => { pikachu.style.transform = 'translate(50%, -350%) scale(25) rotate(50deg)' }, 1000)
            setTimeout(() => { pikachu.style.transform = 'translate(50%, -350%) scale(50) rotate(750deg)' }, 1500)
            setTimeout(() => { pikachu.style.transform = 'translate(50%, -350%) scale(55) rotate(700deg)' }, 2500)
            setTimeout(() => { location.reload(true) }, 4000)
        }
    }
})

preloadImages(generalImages)

/* MAIN NAV */

navToggler.addEventListener('click', () => {
    toggleScrolling()
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

        overlay.classList.add('active')
        navToggler.classList.add('hide')
        if (isMobileDevice) scrollInto('top')

        if (event.target.classList.contains('nav-item')) {
            toggleNavbar()
        } else {
            toggleScrolling()
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
        displayProjectDetails(event.target)
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

    if (saltBaeWasActivated && !flagFound) {
        body.addEventListener('mouseover', displayPosition, { signal: areaListener.signal })

        classified.classList.add('exposed')
        classified.addEventListener('mouseover', () => {
            console.clear()

            if (!isMobileDevice) {
                localStorage.setItem('exposed', true)
            } else {
                localStorage.setItem('exposedInMobile', true)
            }

            let exposed = document.querySelector('.exposed')
            exposed.classList.remove('classified')
            window.addEventListener('resize', captureTheFlag)
        })

        classified.addEventListener('mouseover', sendAstroid, { once: true })
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
