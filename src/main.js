/*

    ADD PROJECT WEB COMPONENT

*/

const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const body = document.querySelector('body')
const header = document.querySelector('.header')
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
const greeting = document.getElementById('greeting')
const loader = document.querySelector('.loader')
const homeSection = document.querySelector('.home-section')
const bgIconsBox = document.querySelector('.bg-icons-box')
const navToggler = document.querySelector('.nav-toggler')
const overlay = document.querySelector('.overlay')
const midgetSaltBae = document.querySelector('.midget-salt-bae')
const giantSaltBae = document.querySelector('.giant-salt-bae')
var bgIconsWereActivated = false
var saltBaeWasActivated = false

function scrollInto(selector) {
    document.querySelector(selector).scrollIntoView({
        behavior: 'smooth', block: 'center', inline: 'center'
    })
}

function disableScrolling() {
    body.classList.toggle('disable-scrolling')
}

function hideSection() {
    document.querySelector('section.active').classList.toggle('fade-out')
}

function toggleNavbar() {
    header.classList.toggle('active')
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
    let url = `${window.location.href.split('#')[0]}assets/invaders.html`
    await fetch(url, { method: 'GET' })
        .then((res) => {
            return res.text()
        })
        .then((html) => {
            loader.classList.add('fade-out')
            imageBody.innerHTML =
                `
            <div style="padding:30px;">
                <p style="padding:5px;">
                    press <b>🡰 🡲</b> to move</p> 
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

/* LOADER */

if (window.matchMedia('(max-width: 574px)').matches) {
    document.querySelector('.loader div:nth-child(1)').style.display = 'none'
}

window.addEventListener('load', () => {
    const today = new Date()
    const currentHour = today.getHours()

    greeting.innerText = currentHour < 18 ? 'bonjour' : 'bonsoir'
    loader.classList.add('fade-out')

    setTimeout(() => {
        main.classList.remove('hidden')
        homeSection.classList.add('active')
        bgIconsBox.classList.remove('fade-out')
        scrollInto('#home')
    }, 500)

    console.log(
        '%c perhaps you want to shoot some aliens? click on the ninja icon',
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
    scrollInto('.nav-inner')
    disableScrolling()
    toggleNavbar()
    hideSection()
})

/* CLICK EVENTS */

document.addEventListener('click', (event) => {
    const hash = event.target.hash
    if (event.target.classList.contains('link-item') && hash !== '') {
        // activate overlay to prevent multiple clicks
        overlay.classList.add('active')
        navToggler.classList.add('hide')

        if (event.target.classList.contains('nav-item')) {
            toggleNavbar()
        } else {
            hideSection()
            body.classList.add('disable-scrolling')
        }

        setTimeout(() => {
            document.querySelector('section.active').classList.remove('active', 'fade-out')
            overlay.classList.remove('active')
            document.querySelector(hash).classList.add('active')
            body.classList.remove('disable-scrolling')
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

    if (event.target.classList.contains('view-project-btn')) {
        displayProjectDetails(event.target.parentNode.parentNode)
        projectPopup.scrollTo(0, 0)
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
                    <h4 style="padding:5px;">
                        This requires a PC
                    </h4>
                    <h2>🛸 ⚡ 👾 💥</h2>
                </div>
             `
        } else {
            summonAliens()
        }
        togglePopup()
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
