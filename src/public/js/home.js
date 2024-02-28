let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard')
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let card = document.querySelector('.card')
let alert = document.querySelector('.tabalert')


let nohover = document.querySelector('.nohover');
let hover = document.querySelector('.hover');
nohover.addEventListener('mouseover', function() {
    body.classList.add('activealert');
  hover.style.display = 'block';
  nohover.style.display='none';
});
hover.addEventListener('mouseout', function() {
    body.classList.remove('activealert');
  nohover.style.display = 'block';
  hover.style.display = 'none';
});

let nohover1 = document.querySelector('.nohover1');
let hover1 = document.querySelector('.hover1');
nohover1.addEventListener('mouseover', function() {
  body.classList.add('active');
  hover1.style.display = 'block';
  nohover1.style.display='none';
});
hover1.addEventListener('mouseout', function() {
  body.classList.remove('active');
  nohover1.style.display = 'block';
  hover1.style.display = 'none';
});

card.addEventListener('mouseover', function() {
    body.classList.add('active');
});

card.addEventListener('mouseout', function() {
    body.classList.remove('active');
});

alert.addEventListener('mouseover', function() {
    body.classList.add('activealert');
});

alert.addEventListener('mouseout', function() {
    body.classList.remove('activealert');
});

let useraccount = document.querySelector('.user-account');
let carduser = document.querySelector('.carduser');
useraccount.addEventListener('mouseover', function() {
    body.classList.add('activecarduser');
});
useraccount.addEventListener('mouseout', function() {
    body.classList.remove('activecarduser');
});
carduser.addEventListener('mouseover', function() {
    body.classList.add('activecarduser');
});

carduser.addEventListener('mouseout', function() {
    body.classList.remove('activecarduser');
});

let products = window.bookArray;
let listCards = [];
function initApp(){
    products.forEach((value,key )=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="/img/book/${value.nameimage}.webp"/>
            <div class="title">${value.namebook}</div>
            <div class="price">${value.pricebook.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Mua</button>
        `;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    location.assign("/login");
}
function search(){
    let searchBar = document.getElementById("search-bar");
    let searchTerm = searchBar.value.toLowerCase();
    filterProducts(searchTerm);
}
function filterProducts(searchTerm) {
    let filteredProducts = products.filter(function(product) {
        return (
            product.namebook.toLowerCase().includes(searchTerm) ||
            product.pricebook.toString().includes(searchTerm)
        );
    });

    displayProducts(filteredProducts);
}
function displayProducts(filteredProducts) {
    list.innerHTML = "";

    filteredProducts.forEach(function(value, key) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="/img/book/${value.nameimage}.webp"/>
            <div class="title">${value.namebook}</div>
            <div class="price">${value.pricebook.toLocaleString()} VNĐ</div>
            <button onclick="addToCard(${key})">Mua</button>
        `;
        list.appendChild(newDiv);
    });
}