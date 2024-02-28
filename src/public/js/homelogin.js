let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard')
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let card = document.querySelector('.card')
let alert = document.querySelector('.tabalert')
let mealert = document.querySelector('.mesalert');
let quantityale = document.querySelector('.alerts');

let nohover = document.querySelector('.nohover');
let hover = document.querySelector('.hover');
nohover.addEventListener('mouseover', function() {
    body.classList.add('activealert');
  hover.style.display = 'block';
  nohover.style.display='none';
  quantityale.innerText = 0;
  readalert();
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
    mesalert.forEach((value)=>{
        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div>${value.alert}</div>
        `;
        mealert.appendChild(newDiv);
    })
    unreadmes.forEach((value)=>{
        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div class="unreadmes">${value.alert}</div>        
        `;
        mealert.appendChild(newDiv);
    })
    quantityale.innerText = unreadmes.length;
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    }
    else{
        listCards[key].quantity += 1;
        listCards[key].pricebook = listCards[key].quantity * products[key].pricebook / (listCards[key].quantity-1);
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value,key)=>{
        totalPrice = totalPrice + value.pricebook;
        count = count + value.quantity;

        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="/img/book/${value.nameimage}.webp"/></div>
                <div>${value.namebook}</div>
                <div>${value.pricebook.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key},${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity1(${key},${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }
    else{
        listCards[key].quantity = quantity;
        listCards[key].pricebook = quantity * products[key].pricebook / (quantity+1);
    }
    reloadCard();
}
function changeQuantity1(key, quantity){
    listCards[key].quantity = quantity;
    listCards[key].pricebook = quantity * products[key].pricebook / (quantity-1);
    reloadCard();
}
function logout() {
    const username = window.username;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/logout", true);
    xhttp.setRequestHeader("Content-type", "application/json"); // Change content-type

    // Gửi thông tin tài khoản và mật khẩu dưới dạng JSON
    var data = JSON.stringify({ username: username }); // Wrap username in an object
    xhttp.send(data);
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var responseData = JSON.parse(this.responseText);
                if (responseData.message == 'Success') {
                    window.location.replace("/login");
                }
            } else {
                // Handle other statuses if needed
            }
        }
    };
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
function readalert(){
    const username = window.username;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/readmes", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    var data = JSON.stringify({ username: username });
    xhttp.send(data);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var responseData = JSON.parse(this.responseText);
                // if (responseData.message == 'Success') {
                //     window.location.replace("/login");
                // }
            } else {
            }
        }
    };
}