// document.querySelector('.header__home-icon').addEventListener('click', (e) => {
//   console.log(e.target.getAttribute('src'))
//   e.target.setAttribute('src', './images/home-icon-2.png')
// })

// ---- CREATE SCROLL BAR ----
const makeScrollBar = (scrollContainer, scrollBar) => {
  // Container Height
  const scrollContainerH = scrollContainer.offsetHeight

  // height of the content inside the container
  const scrollContentH = scrollContainer.scrollHeight

  // if the content height is less than the container height => no need for a scroll bar
  if (scrollContainerH >= scrollContentH) return

  // calculate the height of the scroll bar
  // according to the ratio (container height) / (content height) === (scrollbar height) / (container height)
  const scrollBarH = Math.floor(
    (scrollContainerH / scrollContentH) * scrollContainerH
  )

  // scroll bar height
  scrollBar.style.height = `${scrollBarH + 30}px`

  // create scroll effect when using mouse wheel
  scrollContainer.addEventListener('scroll', (e) => {
    // calculate according to the ratio
    // (scrolled distance / content height) === (distance from scroll bar to top / container height)
    const scrolledPixels = Math.floor(
      (scrollContainer.scrollTop / scrollContentH) * scrollContainerH
    )
    scrollBar.style.top = `${scrolledPixels}px`
  })

  // create a scroll effect when dragging the scroll bar
  dragScrollBar(scrollContainer, scrollBar)
}

const dragScrollBar = (scrollContainer, scrollBar) => {
  let isDown = false

  // distance to scroll
  let walk = null

  // position of the mouse cursor when mousedown is triggered
  let startY = null

  // distance scrolled when mousedown trigger
  let scrollTop = null

  let ratio = (
    scrollContainer.offsetHeight / scrollContainer.scrollHeight
  ).toFixed(1) //0.5

  scrollBar.addEventListener('mousedown', (e) => {
    e.preventDefault()

    scrollBar.classList.add('active')
    isDown = true
    startY = e.pageY
    scrollTop = scrollContainer.scrollTop
  })

  scrollBar.addEventListener('mousemove', (e) => {
    e.preventDefault()

    if (!isDown) return
    walk = e.pageY - startY

    if (walk <= 0) {
      // scroll up
      scrollContainer.scrollTop = scrollTop - (walk / ratio) * -1
    } else {
      // scroll down
      scrollContainer.scrollTop = scrollTop + walk / ratio
    }
  })

  scrollBar.addEventListener('mouseup', (e) => {
    isDown = false
    scrollBar.classList.remove('active')
  })

  window.addEventListener('mousemove', (e) => {
    e.preventDefault()
    if (!isDown) return

    walk = e.pageY - startY

    if (walk <= 0) {
      scrollContainer.scrollTop = scrollTop - (walk / ratio) * -1
    } else {
      scrollContainer.scrollTop = scrollTop + walk / ratio
    }
  })

  window.addEventListener('mouseup', (e) => {
    isDown = false
    scrollBar.classList.remove('active')
  })
}

// ------------------------

// CREATE EFFECT WHEN CLICKING HEADER NAV
function activeHeaderNav() {
  let navItems = document.querySelectorAll('.header__nav-item')
  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      handleItemClick(e)
    })
  })
}

const handleItemClick = (e) => {
  e.preventDefault()

  let target = e.currentTarget
  let img = target.firstElementChild.firstElementChild
  let imgSrc = img.getAttribute('src')

  selectSiblings(target).forEach((elm) => {
    if (elm.className.includes('active')) {
      let img = elm.firstElementChild.firstElementChild
      elm.classList.remove('active')
      img.setAttribute('src', img.getAttribute('src').replace('2', '1'))
    }
  })

  target.classList.add('active')
  img.setAttribute('src', imgSrc.replace('1', '2'))
}

const selectSiblings = (currentElm) => {
  let siblings = []
  let node = currentElm.parentNode.firstElementChild

  while (node) {
    if (node !== currentElm) {
      siblings.push(node)
    }
    node = node.nextElementSibling
  }
  return siblings
}

// ------------------------

const disableAnchors = () => {
  const anchors = document.querySelectorAll('a').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
    })
  })
}

const showDropdown = () => {
  const btn = document.querySelectorAll('.header__icon')[0]
  const dropdown = document.querySelector('.dropdown')

  btn.addEventListener('click', () => {
    dropdown.classList.toggle('active')
  })
}

const toggleDarkMode = () => {
  const btn = document.querySelector('.dropdown__darkmode')
  const body = document.querySelector('body')

  btn.addEventListener('click', () => {
    body.classList.toggle('dark')
    btn.classList.toggle('active')
  })
}

window.addEventListener('load', () => {
  disableAnchors()

  makeScrollBar(
    document.querySelectorAll('.scroll__container')[0],
    document.querySelectorAll('.scroll__bar')[0]
  )
  makeScrollBar(
    document.querySelectorAll('.scroll__container')[1],
    document.querySelectorAll('.scroll__bar')[1]
  )

  activeHeaderNav()

  showDropdown()

  toggleDarkMode()
})
