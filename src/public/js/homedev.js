let list = document.querySelector('.list');
let body = document.querySelector('body');
let alert = document.querySelector('.tabalert');
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
function initApp(){
    products.forEach((value,key )=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
                <img src="/img/book/${value.nameimage}.webp"/>
                <div id="title-${value.id}" class="title">${value.namebook}</div>
                <input id="newname-${value.id}" class="newname" type="text" value="${value.namebook}" style="display:none;margin:5px;"/>
                <div id="price-${value.id}" class="price">${value.pricebook.toLocaleString()}</div>
                <input id="newprice-${value.id}" class="newprice" type="text" value="${value.pricebook.toLocaleString()}" style="display:none;margin:5px;"/>
                <button id="edit-${value.id}" onclick="editItem(${value.id})" style="margin-bottom:5px;">Sửa</button>
                <button id="update-${value.id}" onclick="updateItem(${value.id})" style="margin-bottom:5px;display:none;">Cập nhật</button>
                <button onclick="deleteItem(${value.id})">Xóa</button>
        `;
        list.appendChild(newDiv);
    });
    readMessages.forEach((value)=>{
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <div class="mes">${value.alert}</div>
        `;
        mealert.appendChild(newDiv);
    })
    unreadMessages.forEach((value)=>{
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <div class="unreadmes">${value.alert}</div>
        `;
        mealert.appendChild(newDiv);
    })
    quantityale.innerText = unreadMessages.length;
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
    list.insertBefore(newDiv, list.lastChild.nextSibling);
}

function addbook(){

}

function editItem(id) {
    // Tìm các phần tử con của itemDiv dựa trên id
    let titleDiv = document.getElementById(`title-${id}`);
    let priceDiv = document.getElementById(`price-${id}`);
    let newnameInput = document.getElementById(`newname-${id}`);
    let newpriceInput = document.getElementById(`newprice-${id}`);
    let buttonedit = document.getElementById(`edit-${id}`);
    let buttonupdate = document.getElementById(`update-${id}`); 

    // Kiểm tra nếu các phần tử tồn tại trước khi thay đổi style
    if (titleDiv && priceDiv && newnameInput && newpriceInput) {
        // Ẩn div chứa title và price, hiện input chứa newname và newprice
        titleDiv.style.display = 'none';
        priceDiv.style.display = 'none';
        buttonedit.style.display = 'none';
        newnameInput.style.display = 'inline-block'; // Hiện input newname
        newpriceInput.style.display = 'inline-block'; // Hiện input newprice
        buttonupdate.style.display = 'inline-block'; // Hiện input update
    }
}

function updateItem(id){
    var confirmation = confirm("Bạn có chắc chắn muốn sửa sách này?");

if (confirmation) {
    // Tìm các phần tử con của itemDiv dựa trên id
    let titleDiv = document.getElementById(`title-${id}`);
    let priceDiv = document.getElementById(`price-${id}`);
    let newnameInput = document.getElementById(`newname-${id}`);
    let newpriceInput = document.getElementById(`newprice-${id}`);
    let buttonedit = document.getElementById(`edit-${id}`);
    let buttonupdate = document.getElementById(`update-${id}`);
    titleDiv.style.display = 'block'; 
    priceDiv.style.display = 'block'; 
    buttonedit.style.display = 'block'; 
    newnameInput.style.display = 'none'; 
    newpriceInput.style.display = 'none'; 
    buttonupdate.style.display = 'none'; 

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/updatebook", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    Updatebook = { id, };
    // Gửi thông tin tài khoản và mật khẩu dưới dạng JSON
    var data = JSON.stringify(Updatebook);
    xhttp.send(data);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Xử lý kết quả trả về từ máy chủ
            var req = JSON.parse(this.responseText);
            alert(req.message);
        }
    };
} else {
    // Người dùng đã hủy bỏ thao tác, thực hiện các hành động khác nếu cần
    alert("Thao tác xóa đã bị hủy bỏ.");
}
}

function deleteItem(key) {
    var confirmation = confirm("Bạn có chắc chắn muốn xóa sách này?");

if (confirmation) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/deletebook", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    id = { key };
    // Gửi thông tin tài khoản và mật khẩu dưới dạng JSON
    var data = JSON.stringify(id);
    xhttp.send(data);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Xử lý kết quả trả về từ máy chủ
            var req = JSON.parse(this.responseText);
            alert(req.message);
        }
    };
} else {
    // Người dùng đã hủy bỏ thao tác, thực hiện các hành động khác nếu cần
    alert("Thao tác xóa đã bị hủy bỏ.");
}

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