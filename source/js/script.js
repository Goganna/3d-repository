let menuBtn = document.querySelector('.menu__btn');
/*console.log(menuBtn);*/
let menu = document.querySelector('.menu__body');
menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
})

const acc = document.querySelector('price__info--title')
const accPanel = document.querySelector('.price__info')

acc.addEventListener("click", function(){
  accPanel.classList.toggle("active")
})

