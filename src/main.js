/*

    ADD PROJECT WEB COMPONENT

*/

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
const homeSection = document.querySelector('.home-section')
const bgIconsBox = document.querySelector('.bg-icons-box')
const navToggler = document.querySelector('.nav-toggler')
const overlay = document.querySelector('.overlay')
const midgetSaltBae = document.querySelector('.midget-salt-bae')
const giantSaltBae = document.querySelector('.giant-salt-bae')
const form = document.querySelector('form')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const phoneInput = document.getElementById('phone')
var bgIconsWereActivated = false
var saltBaeWasActivated = false

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

function togglePopup() {
    main.classList.add('fade-out')
    imagePopup.classList.add('open')
    body.classList.add('disable-scrolling')

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
    let folder = window.location.href.split('#')[1]
    id = id.replace('img-to-display-', '')

    if (id.includes('facepalm')) projectPopup.classList.toggle('open')
    loadImage(`assets/images/${folder}/${id}.jpg`, 'popup')
}

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
            // imageBody.appendChild(image)
            imageBody.innerHTML = `<img src="${imageObjectURL}" alt="${imageId}">`           
        } else if (location == 'projects') {
            toggleProjectPopup()
            // popupThumbnail.appendChild(image)
            popupThumbnail.innerHTML = `<img src="${imageObjectURL}" alt="${imageId}">`
        }
    } else {
        alert(res.status)
    }
}

async function summonAliens() {
    loader.classList.remove('fade-out')
    let invaders = `${window.location.href.split('#')[0]}assets/invaders.html`
    await fetch(invaders, { method: 'GET' })
    .then((res) => {
        return res.text()
    })
    .then((html) => {
        togglePopup()
        loader.classList.add('fade-out')
        imageBody.innerHTML =
        `
            <div style="padding:30px;">
                <p style="padding:5px;">
                    press <b style="font-size: x-large;">↔️</b> to move</p>
                <p>and <b>space</b> to shoot</p>
            </div>
        `

        setTimeout(() => {
            imageBody.innerHTML = `<iframe class="invaders"></iframe>`
            let invadersFrame = document.querySelector('.invaders').contentWindow.document
            invadersFrame.open()
            invadersFrame.write(html)
            invadersFrame.close()
            document.querySelector('.invaders').contentWindow.focus()
        }, 2000)
    })
    .catch((err) => {
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

if (window.matchMedia('(max-width: 574px)').matches) {
    document.querySelector('.loader div:nth-child(1)').style.display = 'none'
}

// window.addEventListener('hashchange', () => {
//     let currentSection = window.location.href.split('#')[1]
//     console.log(currentSection) 
// })

window.addEventListener('load', () => {
    if (window.location.href.includes('#')) 
        window.location.href = window.location.href.split('#')[0]
    else if (window.location.href.includes('?'))
        window.location.href = window.location.href.split('?')[0]

    const today = new Date()
    const currentHour = today.getHours()

    greeting.innerText = currentHour < 18 ? 'bonjour' : 'bonsoir'
    loader.classList.add('fade-out')

    setTimeout(() => {
        main.classList.remove('hidden')
        homeSection.classList.add('active')
        bgIconsBox.classList.remove('fade-out')
        scrollInto(home)
    }, 500)

    console.log(
        '%c perhaps you want to shoot some aliens? Check out the top right icon',
        [
            'padding: 10px',
            'color: aliceblue',
            'font-size: xx-large',
            'text-shadow: 2px 2px 2px black',
            'background: linear-gradient(0deg, aliceblue, darkblue)',
        ].join(';')
    )
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
            scrollInto('top')
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
        displayImage(event.target.id)
    }

    if (event.target.classList.contains('activate-salt-bae')) {
        if (!saltBaeWasActivated) {
            setTimeout(() => {
                midgetSaltBae.click()
                saltBaeWasActivated = true

                if (!bgIconsWereActivated) {
                    document.querySelector('.m-logo').click()
                    bgIconsWereActivated = true
                }
            }, 1000)
        }
    }

    if (event.target.classList.contains('m-logo')) {
        bgIconsBox.classList.toggle('active')
        bgIconsWereActivated = bgIconsBox.classList.contains('active') ? true : false
    }

    if (event.target.classList.contains('github-ninja')) {
        if (isMobileDevice) {
            imageBody.innerHTML =
                `   <div style="padding:10px;">
                    <h3 style="padding:5px;">
                        This requires a PC
                    </h3>
                    <h2>🛸 ⚡ 👾 💥</h2>
                </div>
             `
             togglePopup()
        } else {
            summonAliens()
        }
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

    giantSaltBae.classList.remove('fade-out')
    midgetSaltBae.classList.add('fade-out')
    displaySocials(links, 'fadeIn')

    giantSaltBae.addEventListener('click', () => {
        giantSaltBae.classList.add('fade-out')
        displaySocials(links, 'fadeOut')
        setTimeout(() => {
            midgetSaltBae.classList.remove('fade-out')
        }, 500 * links.length)
    })
})

/* CONTACT */

validate(nameInput, validName)
validate(emailInput, validEmail)
validate(phoneInput, validPhone)

form.addEventListener('submit', (event) => {
    if (!nameInput.value.match(validName) || !emailInput.value.match(validEmail) || !phoneInput.value.match(validPhone)) {
        event.preventDefault()
    } else {
        alert('Why would you use this form? Just email/call me directly :)')
    }
})
