document.addEventListener("DOMContentLoaded", function () {
  const topInput = document.querySelector("#door-top-scroll");
  const bottomInput = document.querySelector("#door-bottom-scroll");
  const doorTop = document.querySelector("#door-top");
  const doorBottom = document.querySelector("#door-bottom");

  const mainUps = document.querySelectorAll(".main-up");
  const mainDowns = document.querySelectorAll(".main-down");

  const bg8 = document.querySelector(".bg8");
  const long1 = document.querySelector(".long1");
  const long3 = document.querySelector(".long3");

  // 각 요소에 대한 이미지 배열
  const bg8Images = [
    "url('img_long/Amanda_Mundy_h.png')",
    "url('img_long/Brady_George_h.png')",
    "url('img_long/Jason_Dong.png')",
    "url('img_long/Lauren_Greenblatt_h.png')",
    "url('img_long/Xuru_Zhao.png')",
  ];

  const long1Images = [
    "url('img_long/Brady_George_h.png')",
    "url('img_long/Ghazaleh_Farrokhi.png')",
    "url('img_long/Jason_Dong.png')",
    "url('img_long/Jingyi_Zhang.png')",
    "url('img_long/Maidah_Salman_h.png')",
    "url('img_long/Manjing_Chen.png')",
    "url('img_long/Micaela_Sato.png')",
    "url('img_long/Neve_Luo.png')",
    "url('img_long/Xinran_Wang.png')",
    "url('img_long/Xiuqi_Ran.png')",
    "url('img_long/Yuhong_Hui.png')",
  ];

  const long3Images = [
    "url('img_long/Amanda_Mundy_h.png')",
    "url('img_long/Caitlin_Lu.png')",
    "url('img_long/Hangi_Cho.png')",
    "url('img_long/Lauren_Greenblatt_h.png')",
    "url('img_long/Lucy_Purvis.png')",
    "url('img_long/Manjing_Chen.png')",
    "url('img_long/Neve_Luo.png')",
    "url('img_long/Niharika_Yellamraju_h.png')",
    "url('img_long/Ruoshui_Liu.png')",
    "url('img_long/Wenbin_Huang_h.png')",
    "url('img_long/Xinran_Wang.png')",
    "url('img_long/Xuru_Zhao.png')",
  ];

  // 랜덤 이미지 선택 함수
  function getRandomImage(imageArray) {
    return imageArray[Math.floor(Math.random() * imageArray.length)];
  }

  // 초기 로딩 시 랜덤한 배경 이미지 적용
  bg8.style.backgroundImage = getRandomImage(bg8Images);
  long1.style.backgroundImage = getRandomImage(long1Images);
  long3.style.backgroundImage = getRandomImage(long3Images);



  const sliderRanges = [
    { min: 0, max: 10, type: 'initial' },
    { min: 11, max: 14, type: 'midLow' },
    { min: 15, max: 20, type: 'midHigh' },
    { min: 21, max: 99, type: 'high' },
    { min: 5, max: 30, type: 'background' },
    { min: 21, max: 99, type: 'contentMove' },
    { min: 100, max: 100, type: 'reset' }
  ];

  if (topInput && bottomInput && doorTop && doorBottom && mainUps.length && mainDowns.length) {
    // 페이지 로딩 시 슬라이더 값을 모두 0으로 설정
    topInput.value = 0;
    bottomInput.value = 0;

    // 슬라이더 값에 맞는 범위 찾기
    function getSliderRange(sliderValue) {
      return sliderRanges.find(range => sliderValue >= range.min && sliderValue <= range.max);
    }

    // translateY 값 업데이트 함수
    function updateTranslateY(sliderValue, targetElement, isTop) {
      const range = getSliderRange(sliderValue);
      let translateValue = 0;

      switch (range.type) {
        case 'initial':
          translateValue = (sliderValue / 10) * 20;
          translateValue = isTop ? -translateValue : translateValue;
          break;
        case 'midLow':
          translateValue = isTop ? -20 : 20;
          break;
        case 'midHigh':
          translateValue = ((sliderValue - 10) / 10) * 87;
          translateValue = isTop ? -translateValue : translateValue;
          break;
        case 'high':
          translateValue = isTop ? -87 : 87;
          break;
        case 'reset':
          topInput.value = 0;
          bottomInput.value = 0;
          document.querySelector("#content").style.transform = `translateX(0px)`;
          window.scrollTo(0, 0);
          break;
        default:
          translateValue = 0;
      }

      targetElement.style.transform = `translateY(${translateValue}%)`;
    }


    
    // main-up과 main-down에 대해 transform을 업데이트하는 함수
    function updateMainBackgroundPosition(sliderValue) {
      if (sliderValue >= 5 && sliderValue <= 30) {
        let mainDownTransformValue = -10000 + (sliderValue - 5) * 200;
        let mainUpTransformValue = (sliderValue - 5) * -200;

        mainDowns.forEach(mainDown => {
          mainDown.style.transform = `translateX(0px) translateY(${mainDownTransformValue}px)`;
        });

        mainUps.forEach(mainUp => {
          mainUp.style.transform = `translateX(0px) translateY(${mainUpTransformValue}px)`;
        });
      }

      // 슬라이더 값이 50부터 80 사이일 때 body의 배경색을 검정으로 변경
      if (sliderValue >= 30 && sliderValue <= 45) {
        document.body.style.backgroundColor = "black";
        document.querySelectorAll("h2").forEach(p => {p.style.color = "white";});
        document.querySelectorAll("h2").forEach(p => {p.style.textShadow = "0 0 14px #000000";});
        document.querySelectorAll("h4").forEach(p => {p.style.color = "white";});
        document.querySelectorAll("h4").forEach(p => {p.style.textShadow = "1px 2px 2px #000000";});
        document.querySelectorAll("p").forEach(p => {p.style.color = "white";});
        document.querySelectorAll("p").forEach(p => {p.style.textShadow = "1px 2px 2px #000000";});
      } else {
        // 다른 범위에서는 배경색을 초기화
        document.body.style.backgroundColor = "";
        document.querySelectorAll("h2").forEach(p => {p.style.color = "";});
        document.querySelectorAll("h2").forEach(p => {p.style.textShadow = "";});
        document.querySelectorAll("h4").forEach(p => {p.style.color = "";});
        document.querySelectorAll("h4").forEach(p => {p.style.textShadow = "";});
        document.querySelectorAll("p").forEach(p => {p.style.color = "";});
        document.querySelectorAll("p").forEach(p => {p.style.textShadow = "";});
      }

      // 슬라이더 값이 30부터 50 사이일 때 .long1 요소의 background-position Y 값을 업데이트
      if (sliderValue >= 20 && sliderValue <= 50) {
        // 슬라이더 값에 비례하여 background-position Y 값 증가
        const backgroundPositionY = (sliderValue - 30) * 100; // 값에 따라 증가하도록 비례 설정
        long1.style.backgroundPositionY = `${backgroundPositionY}px`;
      }

      // 슬라이더 값이 30부터 50 사이일 때 .long1 요소의 background-position Y 값을 업데이트
      if (sliderValue >= 30 && sliderValue <= 80) {
        // 슬라이더 값에 비례하여 background-position Y 값 증가
        const backgroundPositionY = (sliderValue - 30) * 100; // 값에 따라 증가하도록 비례 설정
        long3.style.backgroundPositionY = `${backgroundPositionY}px`;
      }

      // 슬라이더 값이 30부터 50 사이일 때 .long1 요소의 background-position Y 값을 업데이트
      if (sliderValue >= 53 && sliderValue <= 54) {
        document.body.style.backgroundImage = "url('img_long/Amanda_Mundy_h.png')";
      } else if (sliderValue >= 55 && sliderValue <= 56) {
        document.body.style.backgroundImage = "url('img_long/Brady_George_h.png')";
      } else if (sliderValue >= 57 && sliderValue <= 58) {
        document.body.style.backgroundImage = "url('img_long/Caitlin_Lu.png')";
      } else if (sliderValue >= 59 && sliderValue <= 60) {
        document.body.style.backgroundImage = "url('img_long/Ghazaleh_Farrokhi.png')";
      } else if (sliderValue >= 61 && sliderValue <= 62) {
        document.body.style.backgroundImage = "url('img_long/Hangi_Cho.png')";
      } else if (sliderValue >= 63 && sliderValue <= 64) {
        document.body.style.backgroundImage = "url('img_long/Jason_Dong.png')";
      } else if (sliderValue >= 65 && sliderValue <= 66) {
        document.body.style.backgroundImage = "url('img_long/Jingyi_Zhang.png')";
      } else if (sliderValue >= 67 && sliderValue <= 68) {
        document.body.style.backgroundImage = "url('img_long/Lauren_Greenblatt_h.png')";
      } else if (sliderValue >= 69 && sliderValue <= 70) {
        document.body.style.backgroundImage = "url('img_long/Lucy_Purvis.png')";
      } else if (sliderValue >= 71 && sliderValue <= 72) {
        document.body.style.backgroundImage = "url('img_long/Maidah_Salman_h.png')";
      } else if (sliderValue >= 73 && sliderValue <= 74) {
        document.body.style.backgroundImage = "url('img_long/Manjing_Chen.png')";
      } else if (sliderValue >= 75 && sliderValue <= 76) {
        document.body.style.backgroundImage = "url('img_long/Micaela_Sato.png')";
      } else if (sliderValue >= 77 && sliderValue <= 78) {
        document.body.style.backgroundImage = "url('img_long/Neve_Luo.png')";
      } else if (sliderValue >= 79 && sliderValue <= 80) {
        document.body.style.backgroundImage = "url('img_long/Niharika_Yellamraju_h.png')";
      } else if (sliderValue >= 81 && sliderValue <= 82) {
        document.body.style.backgroundImage = "url('img_long/Ruoshui_Liu.png')";
      } else if (sliderValue >= 83 && sliderValue <= 84) {
        document.body.style.backgroundImage = "url('img_long/Wenbin_Huang_h.png')";
      } else if (sliderValue >= 85 && sliderValue <= 86) {
        document.body.style.backgroundImage = "url('img_long/Xinran_Wang.png')";
      } else if (sliderValue >= 87 && sliderValue <= 88) {
        document.body.style.backgroundImage = "url('img_long/Xiuqi_Ran.png')";
      } else if (sliderValue >= 89 && sliderValue <= 90) {
        document.body.style.backgroundImage = "url('img_long/Xuru_Zhao.png')";
      } else if (sliderValue >= 91 && sliderValue <= 99) {
        document.body.style.backgroundImage = "url('img_long/Yuhong_Hui.png')";
      } else {
        document.body.style.backgroundImage = "";
      }

    }

    // content의 translateX를 업데이트하는 함수
    function updateContentPosition(sliderValue) {
      if (sliderValue >= 21 && sliderValue <= 100) {
        let translateXValue = ((sliderValue - 21) / (100 - 21)) * 25000;
        document.querySelector("#content").style.transform = `translateX(-${translateXValue}px)`;
      } else {
        document.querySelector("#content").style.transform = `translateX(0px)`;
      }
    }

    // 슬라이더 값 변경 시 동기화하는 함수
    function syncSliderValue(event) {
      if (event.target === bottomInput) {
        topInput.value = bottomInput.value;
        updateTranslateY(bottomInput.value, doorBottom, false);
        updateTranslateY(topInput.value, doorTop, true);
        updateMainBackgroundPosition(bottomInput.value);
        updateContentPosition(bottomInput.value);
        scrollToPosition(bottomInput.value);
      } else if (event.target === topInput) {
        bottomInput.value = topInput.value;
        updateTranslateY(topInput.value, doorTop, true);
        updateTranslateY(bottomInput.value, doorBottom, false);
        updateMainBackgroundPosition(topInput.value);
        updateContentPosition(topInput.value);
        scrollToPosition(topInput.value);
      }
    }

    // 슬라이더 값에 맞춰 스크롤 위치를 설정하는 함수
    function scrollToPosition(sliderValue) {
      const bodyHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPosition = (sliderValue / 100) * bodyHeight;
      window.scrollTo(0, scrollPosition);
    }

    // 슬라이더 이벤트 리스너 추가
    bottomInput.addEventListener("input", syncSliderValue);
    topInput.addEventListener("input", syncSliderValue);

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      const bodyHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / bodyHeight) * 100;

      topInput.value = scrollPercentage;
      bottomInput.value = scrollPercentage;

      if (scrollPercentage >= 100) {
        topInput.value = 0;
        bottomInput.value = 0;
        document.querySelector("#content").style.transform = `translateX(0px)`;
        window.scrollTo(0, 0);
      }

      updateTranslateY(topInput.value, doorTop, true);
      updateTranslateY(bottomInput.value, doorBottom, false);
      updateMainBackgroundPosition(topInput.value);
      updateMainBackgroundPosition(bottomInput.value);
      updateContentPosition(scrollPercentage);
    });
  }
});
