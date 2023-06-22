const slider = document.querySelector("#slider");

const btnLeft = document.querySelector("#btn-left")

const btnRight = document.querySelector("#btn-right")

const sliderSection = document.querySelectorAll(".slider-section");


const rightMovement = () =>{
  const sliderSectionFirst = document.querySelectorAll(".slider-section")[0];

  slider.style.marginLeft = "-200%";
  slider.style.transition = ".7s";
  setTimeout(() =>{
    slider.style.transition = "none"

    slider.insertAdjacentElement('beforeend', sliderSectionFirst);
    slider.style.marginLeft = "-100%";
  }, 700);
}

const leftMovement = () =>{
  const sliderSection = document.querySelectorAll(".slider-section");
  const sliderSectionLast = sliderSection[sliderSection.length - 1];

  slider.style.marginLeft = "0%";
  slider.style.transition = ".7s";
  setTimeout(() =>{
    slider.style.transition = "none"

    slider.insertAdjacentElement('afterbegin', sliderSectionLast);
    slider.style.marginLeft = "-100%";
  }, 700);
}

let sliderSectionLast = sliderSection[sliderSection.length - 1];

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

btnRight.addEventListener('click', () => rightMovement());

btnLeft.addEventListener('click', () => leftMovement());

  
setInterval(() => rightMovement(), 5000);

