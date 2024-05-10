<?php
require("./DB/database.php");

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connect failed" . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name_orginization = $_POST["Name_orginization"];
    $id_orginization = $_POST["Id_orginization"];
    $email = $_POST["Email"];
    $matkhau = $_POST["Password"];

    if (empty($name_orginization) || empty($email) || empty($matkhau) || empty($id_orginization)) {
        echo "<script>alert('Vui lòng điền đầy đủ thông tin.');</script>";
    } else {
        // Kiểm tra xem ID đã tồn tại trong cơ sở dữ liệu chưa
        $sql_check = "SELECT * FROM Orginization_information WHERE Id_orginization = '$id_orginization'";
        $result_check = $conn->query($sql_check);

        if ($result_check->num_rows > 0) {
            // ID đã tồn tại
            echo "<script>alert('ID đã tồn tại. Vui lòng nhập lại ID khác.');</script>";
        } else {
            // ID chưa tồn tại, tiến hành thêm thông tin sinh viên và khoa vào cơ sở dữ liệu

            // Thêm thông tin sinh viên vào bảng Student
            $sql_ntc = "INSERT INTO Orginization_information (Id_orginization, Name_orginization, Email, Password) VALUES ('$id_orginization', '$name_orginization', '$email', '$matkhau')";
            $result_ntc = $conn->query($sql_ntc);

            if ($result_ntc === TRUE) {
                // Thêm thông tin khoa vào bảng Major
                $sql_major = "INSERT INTO major (khoa) VALUES ('$khoa')";
                $result_major = $conn->query($sql_major);

                echo "<script>alert('Đăng ký thành công.');</script>";
                    // Chuyển hướng sang trang login.php
                    header("Location: login.php");
                    exit(); // Đảm bảo không có mã HTML hoặc mã PHP nào được thực thi sau lệnh chuyển hướng

            } else {
                echo "Lỗi khi thêm thông tin nhà tổ chức: " . $conn->error;
            }
        }
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Đăng ký</title>
<!--
    <link rel="stylesheet" href="css/themify-icons.css">
    <link rel="stylesheet" href="css/feather.css"> -->
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <!-- Custom Stylesheet -->
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

        </div>
        <!-- end header -->

        <!-- khung đăng ký   -->
        <div class="row">
            <div class="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat" style="background-image: url(images/login-bg-2.jpg);"></div>
            <div class="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                <div class="card shadow-none border-0 ms-auto me-auto login-card">
                    <div class="card-body rounded-0 text-left">
                        <h2 class="fw-700 display1-size display2-md-size mb-4">Tạo Tài Khoản <br> Nhà Tổ Chức</h2>
                        <form>
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-user text-grey-500 pe-0"></i>
                                <input type="text" name="hoten" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Tên nhà tổ chức" onblur="validateInput('ten')">
                                <span id="errorTen" style="color: red; display: none;">Vui lòng nhập tên nhà tổ chức.</span>
                            </div>
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-user text-grey-500 pe-0"></i>
                                <input type="text" name="id" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Tên nhà tổ chức" onblur="validateInput('id')">
                                <span id="errorTen" style="color: red; display: none;">Vui lòng nhập ID nhà tổ chức.</span>
                            </div>
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-user text-grey-500 pe-0"></i>
                                <input type="text" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="ID Nhà tổ chức">
                            </div>
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-email text-grey-500 pe-0"></i>
                                <input type="text" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Gmail">
                            </div>
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-email text-grey-500 pe-0"></i>
                                <input type="text" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Mật khẩu">
                            </div>
                            <div class="form-group icon-input mb-3">
                                <input type="Password" class="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Nhập lại mật khẩu">
                                <i class="font-sm ti-lock text-grey-500 pe-0"></i>
                            </div>
                        </form>
                        <div class="col-sm-12 p-0 text-left">
                            <div class="form-group mb-1"><a href="#" class="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Đăng ký</a></div>
                            <h6 class="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">Đã có tài khoản<a href="login.php" class="fw-700 ms-1">Đăng nhập</a></h6>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- end khung dang y -->
    </div>
    <script src="js/plugin.js"></script>
    <script src="js/scripts.js"></script>

</body>

</html>