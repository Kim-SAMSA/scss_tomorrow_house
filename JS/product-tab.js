const productTab = document.querySelector('.product-tab')
const productTabButtonList = productTab.querySelectorAll('button')
const TOP_HEADER_DESKTOP = 80 + 50 + 54
const TOP_HEADER_MOBILE = 50 + 40 + 40

let currentActiveTab = productTab.querySelector('.is-active')
let disableUpdating = false

function toggleActiveTab() {
  const tabItem = this.parentNode

  if (currentActiveTab !== tabItem) {
    disableUpdating = true
    tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = tabItem

    setTimeout(() => {
      disableUpdating = false
    }, 1000)
  }
}

function scrollToTabPanel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')
  const tabPanel = document.querySelector(`#${tabPanelId}`)

  const scrollAmount =
    tabPanel.getBoundingClientRect().top -
    (window.innerWidth > 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE)

  window.scrollBy({
    top: scrollAmount,
    behavior: 'smooth',
  })
}

productTabButtonList.forEach((button) => {
  button.addEventListener('click', toggleActiveTab)
  button.addEventListener('click', scrollToTabPanel)
})

// 사전정보: 각 tabPanel의 y축 위치(문서의 시작점에서부터 얼마나 아래에 있는지)
// 요소의 y축 위치  = window.scrollY + element.getBoundingClientRect().top

const productTabPanelIdList = [
  'product-spec',
  'product-review',
  'product-inquiry',
  'product-shipment',
  'product-recommendation',
]

const productTabPanelList = productTabPanelIdList.map((panelId) => {
  const tabPanel = document.querySelector(`#${panelId}`)
  return tabPanel
})
const productTabPanelPositionMap = {}

function detectTabPanelPosition() {
  productTabPanelList.forEach((panel) => {
    const id = panel.getAttribute('id')
    const position = window.scrollY + panel.getBoundingClientRect().top

    productTabPanelPositionMap[id] = position
  })

  updateActiveTabOnScroll()
}

function updateActiveTabOnScroll() {
  if (disableUpdating) {
    return
  }
  // 스크롤 위치에 따라서 activeTab 업데이트
  // 1. 현재 유저가 스크롤한 정도
  // 2. 각 tabPanel y축 위치
  const scrolledAmount =
    window.scrollY +
    (window.innerWidth > 768 ? TOP_HEADER_DESKTOP + 80 : TOP_HEADER_MOBILE + 8)

  let newActiveTab

  if (scrolledAmount > productTabPanelPositionMap['product-recommendation']) {
    newActiveTab = productTabButtonList[4] //추천 버튼
  } else if (scrolledAmount > productTabPanelPositionMap['product-shipment']) {
    newActiveTab = productTabButtonList[3] //배송환불 버튼
  } else if (scrolledAmount > productTabPanelPositionMap['product-inquiry']) {
    newActiveTab = productTabButtonList[2] //문의 버튼
  } else if (scrolledAmount > productTabPanelPositionMap['product-review']) {
    newActiveTab = productTabButtonList[1] //리뷰 버튼
  } else {
    newActiveTab = productTabButtonList[0] //상품정보 버튼
  }

  // 추가: 페이지를 끝까지 스크롤한 경우 = 추천탭
  // window.scrollY + window.innerHeight
  // window.innerWidth < 1200 - orderCta, 56px

  const bodyHeight =
    document.body.offsetHeight + (window.innerWidth < 1200 ? 56 : 0)
  if (window.scrollY + window.innerHeight === bodyHeight) {
    newActiveTab = productTabButtonList[4]
  }

  if (Math.abs(window.scrollY + window.innerHeight - bodyHeight) <= 1) {
    newActiveTab = productTabButtonList[4]
  }

  if (newActiveTab) {
    newActiveTab = newActiveTab.parentNode

    if (newActiveTab !== currentActiveTab) {
      newActiveTab.classList.add('is-active')
      if (currentActiveTab !== null) {
        currentActiveTab.classList.remove('is-active')
      }
      currentActiveTab = newActiveTab
    }
  }
}

window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', _.throttle(detectTabPanelPosition, 1000))
window.addEventListener('scroll', _.throttle(updateActiveTabOnScroll, 300))
