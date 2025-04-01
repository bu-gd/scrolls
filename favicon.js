const favicons = [
  'favicons/favicon-01.png',
  'favicons/favicon-02.png',
  'favicons/favicon-03.png',
  'favicons/favicon-04.png',
  'favicons/favicon-05.png',
  'favicons/favicon-06.png',
  'favicons/favicon-07.png',
];

let currentIndex = 0;

function changeFavicon() {
  const link = document.querySelector("link[rel~='icon']");
  if (!link) {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      document.head.appendChild(newLink);
  }
  
  document.querySelector("link[rel~='icon']").href = favicons[currentIndex];
  
  currentIndex = (currentIndex + 1) % favicons.length;
}

window.addEventListener('scroll', changeFavicon);