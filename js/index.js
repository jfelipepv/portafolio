console.log('ready');


const menuItems= document.getElementsByClassName('menu-item')
const menuIcon= document.querySelector('menu-icon')

const toggleBurger = document.getElementById('burger').addEventListener('click',()=>{
  console.log('click');
  Array.from(menuItems).map((item)=>{
    item.classList.toggle('menu-item--active')
  } )
})

Array.from(menuItems).map((item)=>{
  item.addEventListener('click',()=>{
    Array.from(menuItems).map((item)=>{
      item.classList.toggle('menu-item--active')
    } )
  })
})