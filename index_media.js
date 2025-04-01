const sliderContainer = document.querySelector(".slider-container");
const sliderWrapper = document.querySelector(".slider-wrapper");
const sliderItems = Array.from(document.querySelectorAll(".slider-item"));

let translateValue = window.innerWidth <= 530 ? 78 : 87;

const updateTranslateValue = () => {
  translateValue = window.innerWidth <= 530 ? 78 : 87;
};

window.addEventListener("resize", updateTranslateValue);

const duplicateItems = () => {
  sliderItems.forEach(item => {
    const clone = item.cloneNode(true);
    sliderWrapper.appendChild(clone);
  });
};

duplicateItems();

const animateSlider = () => {
  let startTime;

  const step = timestamp => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const distance = (elapsed / 1000) * (translateValue / 5); // Adjust speed here
    sliderWrapper.style.transform = `translateX(-${distance}%)`;

    if (distance >= translateValue) {
      startTime = timestamp;
      sliderWrapper.style.transform = "translateX(0)";
    }

    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

animateSlider();


// =============================


function updateTextBasedOnWidth() {
  const buElement = document.getElementById("m-bu");
  const mfaElement = document.getElementById("m-mfa");
  const dateElement = document.getElementById("m-date");
  const gallElement = document.getElementById("m-gall");
  
  if (window.innerWidth < 1120) {
    if (buElement) buElement.textContent = "BU MFA GD";
    if (mfaElement) mfaElement.textContent = "APR 8–19";
    if (dateElement) dateElement.textContent = "APR 8–19";
    if (gallElement) gallElement.textContent = "BU MFA GD";
  } else {
    if (buElement) buElement.textContent = "Boston University";
    if (mfaElement) mfaElement.textContent = "MFA GRAPHIC DESIGN";
    if (dateElement) dateElement.textContent = "APRIL 8–19, 2025";
    if (gallElement) gallElement.textContent = "808 GALLERY";
  }
}

// 페이지 로드 및 창 크기 변경 시 이벤트 리스너 추가
window.addEventListener("load", updateTextBasedOnWidth);
window.addEventListener("resize", updateTextBasedOnWidth);



