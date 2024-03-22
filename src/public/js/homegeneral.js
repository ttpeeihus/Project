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

