console.log('ready');


const menuItems= document.getElementsByClassName('menu-item')

const toggleBurger = document.getElementById('burger').addEventListener('click',()=>{
  console.log('click');
  Array.from(menuItems).map((item)=>{
    item.classList.toggle('menu-item--active')
  } )
})