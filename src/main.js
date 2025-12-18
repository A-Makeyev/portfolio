'use strict'

const dev = 'http://127.0.0.1:5500/'
const prod = 'https://makeyev.onrender.com/'
const github = 'https://github.com/A-Makeyev/'
const images = '/assets/images'
const icons = '/assets/icons'

const projectNames = [
    'portfolio', 
    'makeyev-finance', 
    'relearn-online-courses-platform',
    'chatup',
    'ecommecre-shop'
]

const projectUrls = [
    window.location.href, 
    'https://makeyev-finance.onrender.com', 
    'https://rilon.onrender.com',
    'https://chatup.onrender.com',
    'https://ecommecre-shop.onrender.com', 
]

const secretImages = [
    `${images}/astroid.gif`, 
    `${images}/explosion.gif`, 
    `${images}/hole.png`
]

const generalImages = [
    `${images}/already-inside.jpg`, `${images}/already-inside-facepalm.jpg`,
    `${images}/profile.png`, `${images}/avatar.png`, `${icons}/saltbae.png`, `${icons}/github-ninja.png`, `${icons}/M.png`,
    `${icons}/redux.png`, `${icons}/react.png`, `${icons}/python.png`, `${icons}/node.png`, `${icons}/html.png`, `${icons}/css.png`, `${icons}/js.png`,
    `${images}/about/Quality-Assurance-Certificate.jpg`, `${images}/about/Responsive-Web-Design.jpg`, `${images}/about/JavaScript-Algorithms-and-Data-Structures.jpg`,
    `${images}/about/anatoly.jpg`, `${images}/about/fast-team.jpg`, `${images}/about/startup-awards.jpg`, `${images}/about/awards-video.jpg`, `${images}/about/cloudbeat-conference.jpg`
]

const validPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
const validName = /^[^0-9.,_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const userPlatform = window.navigator.userAgentData.platform
const userDevice = document.getElementById('userDevice')
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
const projectItems = document.querySelectorAll('.project-item')
const popupBody = document.querySelector('.popup-body')
const popupThumbnail = document.querySelector('.popup-thumbnail')
const greeting = document.querySelector('#greeting')
const loader = document.querySelector('.loader')
const spaceLoader = document.querySelector('.space-loader')
const homeSection = document.querySelector('.home-section')
const bgIconsBox = document.querySelector('.bg-icons-box')
const navToggler = document.querySelector('.nav-toggler')
const overlay = document.querySelector('.overlay')
const profile = document.querySelector('.profile')
const logo = document.querySelector('.m-logo')
const midgetSaltBae = document.querySelector('.midget-salt-bae')
const giantSaltBae = document.querySelector('.giant-salt-bae')
const classified = document.querySelector('.classified')
const submitBtn = document.querySelector('#submit')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const phoneInput = document.getElementById('phone')
const messageInput = document.getElementById('message')
const offline = document.getElementById('offline')
const floatRight = document.getElementsByClassName('soon-to-float-right')
const floatLeft = document.getElementsByClassName('soon-to-float-left')
const flagFoundMessage = document.getElementById('flagFoundMessage')
const areaListener = new AbortController()
var bgIconsWereActivated = false
var saltBaeWasActivated = false
var flagFound = false
var currentSection = ''

function getUserDevice() {
    let device = 'Unknown'
    const agent = {
        'Generic Linux': /Linux/i,
        'Android': /Android/i,
        'BlackBerry': /BlackBerry/i,
        'Bluebird': /EF500/i,
        'Chrome OS': /CrOS/i,
        'Datalogic': /DL-AXIS/i,
        'Honeywell': /CT50/i,
        'iPad': /iPad/i,
        'iPhone': /iPhone/i,
        'iPod': /iPod/i,
        'macOS': /Macintosh/i,
        'Windows': /IEMobile|Windows/i,
        'Zebra': /TC70|TC55/i,
    }
    Object.keys(agent).map(v => navigator.userAgent.match(agent[v]) && (device = v))
    return device
}

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

function loadProjects(projects) {
    for (let p = 0; p < projects.length; p++) {
        let title = projectNames[p].split('-')
        title = title.map(t => t.charAt(0).toUpperCase() + t.slice(1))
        title = title.join(' ') === 'Portfolio' ? 'This Portfolio Website' : title.join(' ')

        projectItems[p].setAttribute('id', projects[p])
        projectItems[p].querySelector('.project-item-title').textContent = title

        projectItems[p].querySelectorAll('.project-details').forEach((x) => {
            !isMobileDevice && x.setAttribute('data-tooltip', 'view project details')
        })
        
        projectItems[p].querySelectorAll('.github-link').forEach((x) => {
            x.href = github + projectNames[p]
            !isMobileDevice && x.setAttribute('data-tooltip', 'view source code')
        })
        
        projectItems[p].querySelectorAll('.link').forEach((x) => {
            x.href = projectUrls[p] === window.location.href ? 'javascript:void(0)' : projectUrls[p]
            !isMobileDevice && x.setAttribute('data-tooltip', 'view live website')
        })
        
        projectItems[p].querySelectorAll('.project-item-btn').forEach(x => x.style.pointerEvents = 'none')

        let loader = document.querySelector(`#${projects[p]} .loader`)
        loader.style.transform = 'scale(2.5)'        

        fetch(projectUrls[p], { method: 'GET', accept: 'text/html', mode: 'no-cors' })
        .then(() => {
            loader.classList.add('fade-out')
            projectItems[p].querySelector('.project-frame').src = projectUrls[p]
            projectItems[p].querySelectorAll('.project-item-btn').forEach(x => x.style.pointerEvents = 'auto')
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
    if (window.navigator.onLine) {
        loader.classList.remove('fade-out')
        let projectSrc = getParent(projectItem, '.project-thumbnail-scale iframe', 10).src

        await fetch(projectSrc, { method: 'GET', accept: 'text/html', mode: 'no-cors' })
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
    } else {
        togglePopup('Can\'t open project because you are offline ¯\\_(ツ)_/¯')
    }
}

function togglePopup(message, status) {
    scrollInto(imageBody)
    main.classList.add('fade-out')
    imagePopup.classList.add('open')
    if (!('exposed' in localStorage)) body.classList.add('disable-scrolling')
    imageContent.style.border = `2px solid ${status == 'success' ? '#40BD1A' : status == 'failure' ? '#A00023' : 'rgba(225, 255, 255, 0.40'}`

    if (message) imageBody.innerHTML =
        `
            <div style="min-height: 150px; max-width: 300px; padding: 50px 25px;">
                <div style="margin: 10px 0;">
                    ${message === '🚩' ? `<h1><a href="https://anatoly-makeyev.onrender.com" target="_blank" class="flag">${message}</a></h1>` : `<h3>${message}</h3>`}  
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
    let exposed = 'exposed' in localStorage
    document.querySelector('.loader div:nth-child(1)').style.borderColor = exposed ? 'var(--cyan)' : 'var(--dark-blue)'
    document.querySelector('.loader div:nth-child(2)').style.borderColor = exposed ? 'var(--orange)' : 'var(--red)'
    document.querySelector('.loader div:nth-child(3)').style.borderColor = exposed ? 'var(--cyan)' : 'var(--dark-blue)'
    document.querySelector('.loader div:nth-child(4)').style.borderColor = exposed ? 'var(--orange)' : 'var(--red)'
}

function makeThemFloat() {
    for (let x = 0; x < floatRight.length; x++) floatRight[x].style.animation = 'floating-right 2.5s normal forwards ease-in-out'
    for (let x = 0; x < floatLeft.length; x++) floatLeft[x].style.animation = 'floating-left 2.5s normal forwards ease-in-out'
}

function backToNormal() {
    for (let x = 0; x < floatRight.length; x++) floatRight[x].style.animation = 'reset-floating-right 2.5s normal forwards ease-in-out'
    for (let x = 0; x < floatLeft.length; x++) floatLeft[x].style.animation = 'reset-floating-right 2.5s normal forwards ease-in-out'
}

function sendAstroid() {
    giantSaltBae.style.pointerEvents = 'none'

    setTimeout(() => {
        document.getElementById('impact').play()
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
            body.style.overflowX = 'visible'
            body.style.backgroundImage = 'var(--red-background)'

            if (!bgIconsWereActivated) {
                profile.click()
                bgIconsWereActivated = true
            }
        }, 6000)

        setTimeout(() => {
            makeThemFloat()
        }, 4000)
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

    let exposed = document.querySelector('.exposed')
    exposed.onclick = () => {
      const links = [
        'https://www.base64decode.org',
        'https://md5decrypt.net/en/Brainfuck-translator'
      ]
      window.open(links[Math.random() < 0.5 ? 0 : 1], '_blank')
    }
}

async function loadImage(url) {
    if (window.navigator.onLine) {
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
            console.log(res.status)
        }
    } else {
        togglePopup('Can\'t open image because you are offline ¯\\_(ツ)_/¯')
    }
}

async function summonAliens() {
    if (window.navigator.onLine) {
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
                    imageBody.innerHTML = `<iframe class="window-frame"></iframe>`
                    let invadersFrame = document.querySelector('.window-frame').contentWindow.document
                    invadersFrame.open()
                    invadersFrame.write(html)
                    invadersFrame.close()
                    document.querySelector('.window-frame').contentWindow.focus()
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
                                <p>press <b style=";">🡨🡪</b> to move</p>
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
    } else {
        togglePopup('Can\'t summon aliens because you are offline ¯\\_(ツ)_/¯')
    }
}

async function openTaskList() {
    if (window.navigator.onLine) {
        main.classList.add('fade-out')
        loader.classList.remove('fade-out')
        let tasks = `${window.location.href.split('#')[0]}assets/tasks.html`
        await fetch(tasks, { method: 'GET' })
            .then((res) => {
                return res.text()
            })
            .then((html) => {
                const displayBoard = () => {
                    imagePopup.style.display = 'block'
                    imageBody.innerHTML = `<iframe class="window-frame"></iframe>`
                    let tasksFrame = document.querySelector('.window-frame').contentWindow.document
                    tasksFrame.open()
                    tasksFrame.write(html)
                    tasksFrame.close()
                    document.querySelector('.window-frame').contentWindow.focus()
                    scrollInto(imageBody)
                }

                togglePopup()
                loader.classList.add('fade-out')
                imagePopup.style.display = 'none'
                displayBoard()

                let flagTask = 'Find some flag or whatever'
                let flagXpath = `(//p[text()="${flagTask}"])[1]`
                let checkFlagXpath = flagXpath + '//..//..//li'
                let window = document.querySelector('.window-frame').contentWindow.document
                let flagElement = window.evaluate(flagXpath, window, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
                let taskChecked = localStorage.getItem('taskChecked') ? localStorage.getItem('taskChecked') : false
                let taskAdded = localStorage.getItem('taskAdded') ? localStorage.getItem('taskAdded') : false

                if (flagElement === null && !taskAdded) {
                    setTimeout(() => window.getElementById('task-input').value = 'Find some flag or whatever', 500)
                    setTimeout(() => window.getElementById('add-task').click(), 1000)
                    localStorage.setItem('taskAdded', true)
                }

                setTimeout(() => {
                    flagElement = window.evaluate(checkFlagXpath, window, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
                    if (flagElement !== null) {
                        if (!('flagFound' in localStorage)) {
                            flagElement.style.pointerEvents = 'none'
                        } else {
                            flagElement.style.pointerEvents = 'auto'
                        }
                    }
                }, 1500)

                setTimeout(() => {
                    if ('flagFound' in localStorage && !taskChecked) {
                        window.evaluate(checkFlagXpath, window, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()
                        localStorage.setItem('taskChecked', true)
                    }
                }, 2000)
            }).catch((err) => {
                togglePopup(err, 'failure')
            })
    } else {
        togglePopup('You are offline ¯\\_(ツ)_/¯')
    }
}

function summonPikachu() {
    if (document.querySelector('.pikachu').style.display == '') {
        let pikachu = addIcon('.pikachu', 1000)
        pikachu.onclick = () => {
            toggleScrolling()
            navToggler.style.display = 'none'
            pikachu.style.transform = 'translate(50%, -350%) scale(5)'
            setTimeout(() => { pikachu.style.transform = `translate(50%, -350%) scale(${isMobileDevice ? '10' : '15'}) rotate(-50deg)` }, 500)
            setTimeout(() => { pikachu.style.transform = `translate(50%, -350%) scale(${isMobileDevice ? '30' : '55'}) rotate(750deg)` }, 1000)
            setTimeout(() => { pikachu.style.transform = `translate(50%, -350%) scale(${isMobileDevice ? '40' : '65'}) rotate(700deg)` }, 2000)
            setTimeout(() => { new Audio('../assets/sounds/meow.mp3').play() }, 3000)
            setTimeout(() => { location.reload(true) }, 5000)
            localStorage.clear()
        }
    }
}

function addIcon(query, delay) {
    let element = document.querySelector(query)
    element.style.display = 'inline-block'
    element.style.opacity = '0'
    setTimeout(() => { element.style.opacity = '1' }, delay)
    return element
}

function removeIcon(query, delay) {
    let element = document.querySelector(query)
    setTimeout(() => { element.style.opacity = '0' }, delay)
    setTimeout(() => { element.style.display = 'none' }, delay + 1000)
    return element
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
            flagFoundMessage.innerHTML = '<span>Congratulations on finding the <a onclick="openEasterEggs()">🚩</a></span>'
            togglePopup('🚩')
            flagFound = true

            localStorage.setItem('flagFound', true)
            localStorage.removeItem('taskAdded')
            localStorage.removeItem('exposed')
            changeLoaderColor()

            console.clear()
            console.log('🙂')
            exposed.textContent = '🙃'
            preloadImages(`${images}/bandage.png`)
            body.style.animation = 'restore 3s ease-in forwards'
            body.style.cursor = 'auto'

            setTimeout(() => {
                giantSaltBae.style.pointerEvents = 'auto'
                giantSaltBae.click()
                backToNormal()
            }, 2000)

            setTimeout(() => {
                toggleScrolling()
                body.style.overflowX = 'none'
                document.querySelector('.secret-links a:nth-child(7)').remove()
                document.querySelector('.secret-links a:nth-child(6)').textContent = '💜'
                document.querySelector('.secret-links a:nth-child(5)').textContent = '💖'
                document.querySelector('.secret-links a:nth-child(4)').textContent = '🖤'
                document.querySelector('.secret-links a:nth-child(3)').textContent = '💘'
                document.querySelector('.secret-links a:nth-child(2)').textContent = '🤍'
                document.querySelector('.secret-links a:nth-child(1)').textContent = '❤️'
                body.style.backgroundImage = 'linear-gradient(to bottom right, var(--light-blue), var(--light-purple))'
                setTimeout(() => { document.getElementById('crash-site').style.backgroundImage = 'url(/assets/images/bandage.png)' }, 2000)
                setTimeout(() => { addIcon('.instagram', 1000) }, 4000)
                setTimeout(() => { summonPikachu() }, 6000)
                setTimeout(() => {
                    setTimeout(() => { midgetSaltBae.click() }, 1500)
                    setTimeout(() => { removeIcon('.html') }, 1200)
                    setTimeout(() => { removeIcon('.css') }, 1100)
                    setTimeout(() => { removeIcon('.js') }, 1000)
                }, 10000)
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

function openEasterEggs() {
    setTimeout(() => { document.querySelector('.popup-close').click() }, 500)
    setTimeout(() => { document.querySelector('.nav-toggler').click() }, 1000)
    setTimeout(() => { document.querySelector('[href="#home"]').click() }, 1500)

    setTimeout(() => {
        if (!('exposed' in localStorage) && !('flagFound' in localStorage)) document.querySelector('.github-ninja').click()
        else if ('flagFound' in localStorage) document.querySelector('.pikachu').click()
        else if ('exposed' in localStorage) logo.click()
    }, 2500)
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
                sendEmail(nameInput.value)
            }
        }
    })
}

function sendEmail(contactName) {
    if (window.navigator.onLine) {
        loader.classList.remove('fade-out')
        try {
            if (typeof emailjs === 'undefined') {
                loader.classList.add('fade-out')
                togglePopup('Something is blocking me from sending emails on this device', 'failure')
                return 
            }

            const params = {
                subject: 'New Client 🤩',
                name: nameInput.value,
                phone: phoneInput.value,
                email: emailInput.value,
                message: messageInput.value
            }

            emailjs.send(
                '<?= process.env.EMAILJS_SERVICE_ID ?>',
                '<?= process.env.EMAILJS_TEMPLATE_ID ?>',
                'service_k2c0eve', 
                'template_kmxsnuc',
                params, {
            }).then(response => {
                console.log(response)
                if (response.status !== 200) { 
                    loader.classList.add('fade-out')
                    togglePopup(`There was a problem with sending your message: ${response.text || 'Unknown error'}`, 'failure')
                } else {
                    loader.classList.add('fade-out')
                    togglePopup(`Your message was sent, thanks for reaching out ${contactName}!`, 'success')
                }
            }).catch(error => {
                loader.classList.add('fade-out')
                console.error('EmailJS error:', error)
                togglePopup(`There was a problem with sending your message: ${error.text || error.message}`, 'failure')
            })
        } catch (error) {
            loader.classList.add('fade-out')
            console.log(error)
            togglePopup('An unexpected error occurred while sending the email', 'failure')
        }
        document.querySelectorAll('.input-control').forEach((i) => {
            i.style.boxShadow = ''
            i.value = ''
        })
    } else {
        togglePopup('Can\'t send your message because you are offline ¯\\_(ツ)_/¯')
    }
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
    body.style.backgroundImage = 'var(--red-background)'
    body.style.transform = 'rotate(16deg)'
    body.style.overflowX = 'visible'
    body.style.cursor = 'progress'
    changeLoaderColor()
    toggleScrolling()
    makeThemFloat()
}

window.addEventListener('online', () => { offline.style.opacity = '0' })
window.addEventListener('offline', () => { offline.style.opacity = '1' })

window.addEventListener('load', () => {
    preloadImages(generalImages)
    preloadImages(secretImages)
    loadProjects(projectNames)

    userDevice.textContent = getUserDevice() + `${getUserDevice() == 'Windows' ? ' PC' : ''}`
    if ('flagFound' in localStorage) {
        flagFoundMessage.innerHTML = '<span>Congratulations on finding the <a onclick="openEasterEggs()">🚩</a></span>'
    }

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

    midgetSaltBae.addEventListener('mouseenter', () => {
        setTimeout(() => { removeIcon('.js') }, 150)
        setTimeout(() => { removeIcon('.css') }, 250)
        setTimeout(() => { removeIcon('.html') }, 350)

        setTimeout(() => {
            if (document.querySelector('.js') !== null) removeIcon('.js')
            if (document.querySelector('.css') !== null) removeIcon('.css')
            if (document.querySelector('.html') !== null) removeIcon('.html')
        }, 650)
    })

    midgetSaltBae.addEventListener('mouseleave', () => {
        if (giantSaltBae.classList.contains('fade-out')) {
            setTimeout(() => { addIcon('.html') }, 150)
            setTimeout(() => { addIcon('.css') }, 250)
            setTimeout(() => { addIcon('.js') }, 350)

            setTimeout(() => {
                if (document.querySelector('.html') !== null) addIcon('.html')
                if (document.querySelector('.css') !== null) addIcon('.css')
                if (document.querySelector('.js') !== null) addIcon('.js')
            }, 650)
        }
    })

    if ('exposed' in localStorage) {
        setTimeout(() => {
            let astroid = document.createElement('div')
            astroid.setAttribute('id', 'crash-site')
            body.appendChild(astroid)
        }, 600)

        saltBaeWasActivated = true
        bgIconsWereActivated = true

        profile.click()
        midgetSaltBae.click()
        giantSaltBae.style.pointerEvents = 'none'
        areaListener.abort()

        setTimeout(() => { summonPikachu() }, 9000)
        setTimeout(() => { setHint() }, 3500)
        setTimeout(() => {
            let exposed = document.querySelector('.exposed')
            exposed.classList.remove('classified')
            classified.removeEventListener('mouseover', sendAstroid)
        }, 7500)
    } else {
        midgetSaltBae.style.pointerEvents = 'none'
        setTimeout(() => { addIcon('.html', 1000) }, 300)
        setTimeout(() => { addIcon('.css', 1000) }, 600)
        setTimeout(() => { addIcon('.js', 1000) }, 900)
        setTimeout(() => { midgetSaltBae.style.pointerEvents = 'auto' }, 2000)
    }

    if ('flagFound' in localStorage) {
        setTimeout(() => { summonPikachu() }, 3000)
    }
})

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
            setTimeout(() => { removeIcon('.js') }, 1000)
            setTimeout(() => { removeIcon('.css') }, 1100)
            setTimeout(() => { removeIcon('.html') }, 1200)
        }

        if (!bgIconsWereActivated) {
            setTimeout(() => {
                profile.click()
                bgIconsWereActivated = true
            }, 1750)
        }
    }

    if (event.target.classList.contains('profile')) {
        bgIconsBox.classList.toggle('active')
        bgIconsWereActivated = true
    }

    if (event.target.classList.contains('m-logo')) {
        openTaskList()
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

    setTimeout(() => { removeIcon('.js') }, 100)
    setTimeout(() => { removeIcon('.css') }, 200)
    setTimeout(() => { removeIcon('.html') }, 300)

    if (saltBaeWasActivated && !flagFound) {
        body.addEventListener('mouseover', displayPosition, { signal: areaListener.signal })

        classified.classList.add('exposed')
        classified.addEventListener('mouseover', () => {
            if ('taskAdded' in localStorage) localStorage.removeItem('taskAdded')
            localStorage.setItem('exposed', true)
            console.clear()

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
        midgetSaltBae.style.pointerEvents = 'none'
        giantSaltBae.classList.add('fade-out')
        displaySocials(links, 'fadeOut')
        setTimeout(() => {
            midgetSaltBae.classList.remove('fade-out')
        }, 500 * links.length)
        setTimeout(() => { addIcon('.html') }, 550 * links.length)
        setTimeout(() => { addIcon('.css') }, 600 * links.length)
        setTimeout(() => { addIcon('.js') }, 650 * links.length)
        setTimeout(() => { midgetSaltBae.style.pointerEvents = 'auto' }, 700 * links.length)
    })
    saltBaeWasActivated = true
})

/* CONTACT */

validate(nameInput, validName)
validate(emailInput, validEmail)
validate(phoneInput, validPhone)
