const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const LONG_QUOTE_THRESHOLD = 90;

function loading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new quote
function newQuote() {
  loading();
  const randomIndex = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randomIndex];

  authorText.textContent = quote.author || 'Unknown';
  quoteText.textContent = quote.text;

  if (quote.text.length > LONG_QUOTE_THRESHOLD) {
    quoteText.classList.add('long-quote');
    return complete();
  }

  quoteText.classList.remove('long-quote');
  complete();
}

// Get quotes from the API
async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

    setTimeout(newQuote, 700);
  } catch (error) {
    console.log(error);
  }
}

// Tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Onload
getQuotes();

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
