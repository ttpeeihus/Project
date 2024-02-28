let showPassword = document.getElementById('showPassword');
let inputPassword = document.getElementById('password');
showPassword.onclick = function() {
  if (inputPassword.type === "password") {
    inputPassword.type = "text";
    showPassword.classList.add("show");
  } else {
    inputPassword.type = "password";
    showPassword.classList.remove("show");
  }
};
// Lấy tham chiếu đến phần tử nút SignIn
const signInButton = document.querySelector(".signIn button");

// Gán sự kiện cho nút SignIn
signInButton.addEventListener("click", function() {
  // Lấy thông tin tài khoản và mật khẩu từ các trường nhập liệu
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Kiểm tra tính hợp lệ của tên đăng nhập và mật khẩu
  console.log(`Username: `, username, `Password: `, password);

    // Tạo một đối tượng mới để chứa thông tin người dùng
    var newUser = {
        user: username,
        pass: password,
    };
    // Gửi yêu cầu HTTP POST đến địa chỉ '/users'
    var xhttp2 = new XMLHttpRequest();
    xhttp2.open("POST", "/checkin", true);
    xhttp2.setRequestHeader("Content-type", "application/json");

    // Gửi thông tin tài khoản và mật khẩu dưới dạng JSON
    var data = JSON.stringify(newUser);
    xhttp2.send(data);
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // Xử lý kết quả trả về từ máy chủ
        var data = JSON.parse(this.responseText);
        if (data.message=='Success'){
            window.location.replace("/home");
          }
        else{
          alert(data.message);
        }
        }
    };
});