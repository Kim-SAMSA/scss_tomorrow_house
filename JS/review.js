const reviewLikeButtonList = document.querySelectorAll(
  '.review-card-footer button'
)

const HELPFUL = '도움됨'
const NOT_HELPFUL = '도움이 돼요'

function toggleReviewLikeButton() {
  // 1. btn class changed
  // 2. text changed
  // 3. count

  const isLiked = this.classList.contains('btn-primary')
  const textElement = this.nextElementSibling
  const reviewCardFooter = this.parentNode

  if (isLiked) {
    // 비활성화
    this.innerHTML = NOT_HELPFUL
  } else {
    // 활성화
    this.innerHTML = HELPFUL

    const checkIcon = document.createElement('i')
    checkIcon.classList.add('ic-check')
    checkIcon.setAttribute('aria-hidden', true)
    this.prepend(checkIcon)
  }

  if (textElement) {
    // N명 > N값을 업데이트
    const countSpan = textElement.querySelector('span')
    const count = Number(countSpan.innerHTML.replaceAll(',', ''))

    let newCount = count
    if (isLiked) {
      // 비활성화 count -1
      newCount = newCount - 1

      if (newCount === 0) {
        // textelement 삭제
        reviewCardFooter.removeChild(textElement)
      }

      countSpan.innerHTML = newCount.toLocaleString()
    } else {
      // 활성화 count +1
      newCount = newCount + 1
      countSpan.innerHTML = newCount.toLocaleString()
    }
  } else {
    if (!isLiked) {
      // 활성화 될 예정 > 1명 +
      // TextElement 생성 > review-carf-footer의 마지막 자식
      const newTextElement = document.createElement('p')
      newTextElement.innerHTML =
        '<strong><span>1</span>명</strong>에게 도움이 되었습니다.'
      reviewCardFooter.appendChild(newTextElement)
    }
  }

  this.classList.toggle('btn-primary')
  this.classList.toggle('btn-outlined')
}

reviewLikeButtonList.forEach((button) => {
  button.addEventListener('click', toggleReviewLikeButton)
})
