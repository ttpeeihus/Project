let showPassword = document.getElementById('showPassword');
let inputPassword = document.getElementById('password');
showPassword.onclick = function(){
    if(inputPassword.type == 'password'){
        inputPassword.type = 'text';
        showPassword.classList.add('show');
    }
    else{
        inputPassword.type = 'password';
        showPassword.classList.remove('show');
    }
}
let showcheckPassword = document.getElementById('showcheckPassword');
let inputcheckPassword = document.getElementById('checkpassword');
showcheckPassword.onclick = function(){
    if(inputcheckPassword.type == 'password'){
        inputcheckPassword.type = 'text';
        showcheckPassword.classList.add('show');
    }
    else{
        inputcheckPassword.type = 'password';
        showcheckPassword.classList.remove('show');
    }
}
function checkPasswordMatch() {
    let pass= document.getElementById('password').value;
    let checkpass= document.getElementById('checkpassword').value;
    if (pass === checkpass) {
        document.getElementById("checkpassword").classList.remove("error");
        document.getElementById("checkpassword").classList.add("confirm");
    } else {
        document.getElementById("checkpassword").classList.remove("confirm");
        document.getElementById("checkpassword").classList.add("error");
    }
}

// Lấy tham chiếu đến phần tử nút SignIn
const signInButton = document.querySelector(".signIn button");

// Gán sự kiện cho nút SignIn
signInButton.addEventListener("click", function() {
    let pass= document.getElementById('password').value;
    let checkpass= document.getElementById('checkpassword').value;
  if (pass === checkpass) {
  const username = document.getElementById("username").value;
  const pass = document.getElementById('password').value;
  const email = document.getElementById("email").value;
  // Kiểm tra tính hợp lệ của tên đăng nhập và mật khẩu
  console.log(`Username: `,username,`Password: `,pass,`Email: `,email);

    // Tạo một đối tượng mới để chứa thông tin người dùng
    var newUser = {
        user: username,
        pass: pass,
        email: email
    };
    // Gửi yêu cầu HTTP POST đến địa chỉ '/users'
    var xhttp2 = new XMLHttpRequest();
    xhttp2.open("POST", "/adduser", true);
    xhttp2.setRequestHeader("Content-type", "application/json");

    // Gửi thông tin tài khoản và mật khẩu dưới dạng JSON
    var data = JSON.stringify(newUser);
    xhttp2.send(data);
    console.log(newUser);
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // Xử lý kết quả trả về từ máy chủ
        var data = JSON.parse(this.responseText);
        alert(data.message);
        if(data.message=='Tạo tài khoản thành công'){
            location.assign("/login");
        }
        }
    };
  } else {
    alert('Nhập lại mật khẩu');
    document.getElementById("checkpassword").classList.remove("confirm");
    document.getElementById("checkpassword").classList.add("error");
  }
});