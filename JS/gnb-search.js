const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('input')
const gnbSearchHistory = gnbSearch.querySelector('.search-history')
const gnbSearchHistoryList = gnbSearch.querySelector('ol')

const deleteAllButton = gnbSearchHistory.querySelector(
  '.search-history-header button'
)

const deleteButtonList = gnbSearchHistoryList.querySelectorAll('.delete-button')

function closeGnbSearchHistory() {
  gnbSearchHistory.classList.remove('is-active')
  window.removeEventListener('click', closeGnbSearchHistoryOnClick)
}

// ===========================

function closeGnbSearchHistoryOnClick(e) {
  if (!gnbSearch.contains(e.target)) {
    closeGnbSearchHistory()
  }
}

function openGnbSearchHistory() {
  if (gnbSearchHistoryList.children.length === 0) {
    return
  }

  if (!gnbSearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', closeGnbSearchHistoryOnClick)
  }
  gnbSearchHistory.classList.add('is-active')
}

gnbSearchInput.addEventListener('focus', openGnbSearchHistory)

///=====================================

function deleteAllHistoryItems() {
  // gnb-search-list 안에 있는 모든 li를 삭제
  gnbSearchHistoryList.innerHTML = ''
  closeGnbSearchHistory()
}

deleteAllButton.addEventListener('click', deleteAllHistoryItems)

function deleteSearchHistoryItem(e) {
  e.stopPropagation()
  const itemToDelete = this.parentNode
  gnbSearchHistoryList.removeChild(itemToDelete)

  if (gnbSearchHistoryList.children.length === 0) {
    closeGnbSearchHistory()
  }
}

deleteButtonList.forEach((button) => {
  button.addEventListener('click', deleteSearchHistoryItem)
})
