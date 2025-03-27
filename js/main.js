'use strict'

const $btnRandom = document.querySelector('#random')
const $btnShare = document.querySelector('#share')

fetch(
  'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json'
)
.then((response) => response.json())
.then((data) => {

  /**
   * 
   * @returns A random index for "data" (different that the last one selected)
   */
  function selectRandomQuote () {
    let newQuoteIndex;
    do {
      newQuoteIndex = Math.floor(Math.random() * data.length)
    } while(newQuoteIndex == previousQuoteIndex)
      
    previousQuoteIndex = newQuoteIndex
    return newQuoteIndex
  }

  /**
   * 
   * @param {String} author Author of the quote
   * @param {Array} tags The differents tags of the quote. e.g. ["Famous Quotes", "Inspiracional"]
   * @param {String} quote The quote :)
   * @returns 
   */
  function generateCardStructure (author = '', tags = '', quote = '') {
    let cardContent = `
    <h2 class="font-bold">${author}</h2>
    <ul class="mt-3 flex gap-3 justify-center flex-wrap capitalize text-(--col-2) text-sm">`
    
    for(const item of tags) {
      cardContent += `<li class="py-1 px-3 border border-(--col-2) rounded-full">${item}</li>`
    }

    cardContent += `
    </ul>
    <p id="quote" class="text-xl text-pretty mt-8">"${quote}"</p>`

    return cardContent
  }

  /**
   * This function selects and draw a new quote in the DOM
   */
  function selectAndShowQuote() {
    cardData = data[selectRandomQuote()]
    $card.innerHTML = generateCardStructure(cardData.author, cardData.tags, cardData.quote)
  }

  const $card = document.querySelector('#card')
  let previousQuoteIndex = -1
  let cardData;

  // Shows a random quote for the first time
  selectAndShowQuote()

  $btnRandom.addEventListener('click', selectAndShowQuote)

  $btnShare.addEventListener('click', () => {
    navigator.clipboard.writeText(document.querySelector('#quote').innerText)
  })

  // Shortcuts
  document.body.addEventListener('keydown', (e) => {
    if(e.key === 'R' || e.key === 'r') {
      selectAndShowQuote()
    }

    if(e.key === 'C' || e.key === 'c') {
      navigator.clipboard.writeText(document.querySelector('#quote').innerText)
    }
  })
})