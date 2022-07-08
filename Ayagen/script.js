const quoteContainer = document.getElementById("quote-container");
const quoteTextA = document.getElementById("quotea");
const quoteTextE = document.getElementById("quotee");
const ayahText = document.getElementById("ayah");
const teleBtn = document.getElementById("tele");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const splash = document.querySelector('.splash')


document.addEventListener('DOMContentLoaded',(e)=>
{
  setTimeout(() => {
    splash.classList.add('display-none');  
  }, 2000);
  
})



let apiQuote = [];

let url = new URL("https://ayahgen-lyart.vercel.app/");

console.log(url)



//show new quote

//Show loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loader
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

async function newQuote() {
  loading();

  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  let verse = 0;
  if (urlParams.get("v") == null) {
    verse = Math.floor(Math.random() * 6237) + 1;
    
  } else {
    verse = urlParams.get("v");
  }
  const apiurl =
    "https://api.alquran.cloud/ayah/" +
    verse +
    "/editions/quran-uthmani,en.pickthall";

  try {
    let time1 = performance.now();
    const response = await fetch(apiurl);
    apiQuote = await response.json();
    let time2= performance.now();
    console.log('newQuote() performance:')
    console.log(time2-time1);
    console.log(apiQuote);
  } catch (error) {
    //catch error
  }

  //check quote length to decide style

  arabic = apiQuote["data"][1]["text"];
  english = apiQuote["data"][0]["text"];

  if (english.length > 50) {
    quoteTextA.classList.add("long-quote");
    quoteTextE.classList.add("long-quote");
    console.log("long");
  } else {
    quoteTextA.classList.remove("long-quote");
    quoteTextE.classList.remove("long-quote");
  }

  quoteTextA.textContent = arabic;
  quoteTextE.textContent = english;
ayahText.textContent =
    apiQuote["data"][0]["surah"]["englishName"] +
    "(" +
    apiQuote["data"][0]["surah"]["number"] +
    ")" +
    ":" +
    apiQuote["data"][0]["numberInSurah"];
    url.searchParams.append("v",verse)
  window.history.replaceState(null,null,`?v${verse}`);
  console.log(url);

  link = url.href;
  console.log(link)
  complete();
  url.searchParams.delete("v") 
}


function telegram() {
  const teleurl = `https://t.me/share/url?url=${link}&text=${"Take a minute to read this :)"}`;
  window.open(teleurl, "_blank");

}

function duasearch() {
  window.location.href = "../dua/duafind.html";
}

//Eventlistner

newQuoteBtn.addEventListener("click", newQuote);
teleBtn.addEventListener("click", telegram);


newQuote();

