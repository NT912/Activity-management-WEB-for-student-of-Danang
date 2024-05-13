<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Đăng ký</title>
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <link rel="stylesheet" href="css/style.css">
    <script>
        function validateInput(inputName) {
            var inputValue = document.forms["registerForm"][inputName].value;
            var errorElement = document.getElementById("error" + inputName.charAt(0).toUpperCase() + inputName.slice(1));

            if (inputValue.trim() === "") {
                errorElement.style.display = "block";
            } else {
                errorElement.style.display = "none";
            }
        }

        function checkInputPasswordAgain() {
            var password = document.forms["registerForm"]["Password"].value;
            var confirmPassword = document.forms["registerForm"]["nhaplaimatkhau"].value;
            var confirmPasswordError = document.getElementById("errorNhaplaimatkhau");
            var submitButton = document.querySelector('button[type="submit"]');

            if (confirmPassword.trim() === "") {
                confirmPasswordError.innerText = "Vui lòng nhập lại mật khẩu.";
                confirmPasswordError.style.display = "block";
                submitButton.disabled = true;
            } else if (password !== confirmPassword) {
                confirmPasswordError.innerText = "Mật khẩu nhập lại không khớp với mật khẩu đã nhập.";
                confirmPasswordError.style.display = "block";
                submitButton.disabled = true;
            } else {
                confirmPasswordError.style.display = "none";
                submitButton.disabled = false;
            }
        }
    </script>
</head>

<body class="color-theme-blue">
    <div class="preloader"></div>
    <div class="main-wrap">
        <div class="nav-header bg-transparent shadow-none border-0">
            <div class="nav-top w350">
                <a href="#"> <img src="./images/LOGO.png" alt="Logopage" class="logo-img"> </a>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat" style="background-image: url(images/login-bg-2.jpg);"></div>
            <div class="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                <div class="card shadow-none border-0 ms-auto me-auto login-card">
                    <div class="card-body rounded-0 text-left">
                        <h2 class="fw-700 display1-size display2-md-size mb-4">Tạo Tài Khoản Nhà Tổ Chức</h2>
                        <form method="post" action="./server/DangKyNTC.php" name="registerForm">
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-user text-grey-500 pe-0"></i>
                                <input type="text" name="Name" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Tên nhà tổ chức" onblur="validateInput('Name')">
                                <span id="errorName" style="color: red; display: none;">Vui lòng nhập tên nhà tổ chức.</span>
                            </div>
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-email text-grey-500 pe-0"></i>
                                <input type="text" name="Email" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Gmail" onblur="validateInput('Email')">
                                <span id="errorEmail" style="color: red; display: none;">Vui lòng nhập Gmail.</span>
                            </div>
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-email text-grey-500 pe-0"></i>
                                <input type="password" name="Password" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Mật khẩu" onblur="validateInput('Password')">
                                <span id="errorPassword" style="color: red; display: none;">Vui lòng nhập mật khẩu.</span>
                            </div>
                            <div class="form-group icon-input mb-3">
                                <input type="password" name="nhaplaimatkhau" class="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Nhập lại mật khẩu" onblur="checkInputPasswordAgain()" required>
                                <i class="font-sm ti-lock text-grey-500 pe-0"></i>
                                <span id="errorNhaplaimatkhau" style="color: red; display: none;">Vui lòng nhập lại mật khẩu.</span>
                            </div>
                            <button type="submit" id="registerButton" name="submit" class="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0" disabled>Đăng ký</button>
                        </form>
                        <h6 class="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">Đã có tài khoản<a href="login.php" class="fw-700 ms-1">Đăng nhập</a></h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/plugin.js"></script>
    <script src="js/scripts.js"></script>
</body>

</html>
