let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard')
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let card = document.querySelector('.card');
let alert = document.querySelector('.tabalert');
let mealert = document.querySelector('.mesalert');
let quantityale = document.querySelector('.alerts');


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

let products = window.bookArray;
function initApp(){
    products.forEach((value,key )=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="/img/book/${value.nameimage}.webp"/>
            <div class="title">${value.namebook}</div>
            <div class="price">${value.pricebook.toLocaleString()}</div>
            <button onclick="editItem(${value.id})">Sửa</button>
            <button onclick="deleteItem(${value.id})">Xóa</button>
        `;
        list.appendChild(newDiv);
    });
    mesalert.forEach((value)=>{
        newDiv.innerHTML = `
            <div>${value.alert}</div>
        `;
        mealert.appendChild(newDiv);
    })
    unreadmes.forEach((value)=>{
        newDiv.innerHTML = `
            <div class="unreadmes">${value.alert}</div>
        `;
        mealert.appendChild(newDiv);
    })
    quantityale.innerText = unreadmes.length;
    addbutton();
}
function addbutton(){
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    // Sử dụng hàm insertAdjacentHTML để thêm nội dung vào phần tử newDiv
    newDiv.insertAdjacentHTML('beforeend', `
            <button id="addbutton" onclick="addinputbook()">+</button>
        `);
    list.appendChild(newDiv);
}
function addinputbook() {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    // Sử dụng hàm insertAdjacentHTML để thêm nội dung vào phần tử newDiv
    newDiv.insertAdjacentHTML('beforeend', `
        <input id="nameimage" type="file" name="nameimage" accept="image/*">
        <input id="namebook" type="text" name="namebook">
        <input id="pricebook" type="number" name="pricebook">
        <button onclick="addbook()">Cập nhật</button>
    `);
    list.insertBefore(newDiv, list.firstChild); // Thêm trước phần tử đầu tiên của list
}

function addbook(){

}

function editItem(key) {
    
}

function deleteItem(key) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/deletebook", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    id={key};
    // Gửi thông tin tài khoản và mật khẩu dưới dạng JSON
    var data = JSON.stringify(id);
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // Xử lý kết quả trả về từ máy chủ
        var req = JSON.parse(this.responseText);
        alert(req.message);
        }
    };
}
initApp();
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