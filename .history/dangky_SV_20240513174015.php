<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Đăng ký</title>
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <link rel="stylesheet" href="css/style.css">
    <style>
        /* CSS cho phần thiết kế lại menu dropdown */
        .select-dropdown {
            width: 100%;
            padding: 0px 0px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
            font-size: 14px;
            line-height: 1.5;
            color: #333;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            background-image: url('data:image/svg+xml;utf8,<svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M7 10l5 5 5-5z"/></svg>');
            background-position: right 10px center;
            background-size: 20px;
            background-repeat: no-repeat;
            cursor: pointer;
            outline: none;
            transition: all 0.3s ease;
        }

        /* CSS cho hiệu ứng hover */
        .select-dropdown:hover {
            border-color: #999;
        }

        /* CSS cho hiệu ứng focus */
        .select-dropdown:focus {
            border-color: #555;
            box-shadow: 0 0 5px rgba(85, 85, 85, 0.5);
        }
    </style>
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

        function updateMajorName() {
            var selectElement = document.querySelector('select[name="major"]');
            var majorNameField = document.getElementById('major_name');
            var majorId = selectElement.value;

            // Gửi yêu cầu AJAX để lấy tên của khoa từ server
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Khi nhận được phản hồi từ server, cập nhật trường major_name
                    majorNameField.value = xhr.responseText;
                    validateInput('major_name'); // Khi đã nhận được tên của khoa, kiểm tra lại dữ liệu để kích hoạt nút đăng ký
                }
            };
            xhr.open("GET", "get_major_name.php?major_id=" + majorId, true);
            xhr.send();
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
        <!-- Form đăng ký sinh viên -->
        <div class="row">
            <div class="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat" style="background-image: url(images/login-bg-2.jpg);"></div>
            <div class="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                <div class="card shadow-none border-0 ms-auto me-auto login-card">
                    <div class="card-body rounded-0 text-left">
                        <h2 class="fw-700 display1-size display2-md-size mb-4">Tạo Tài Khoản <br> Sinh Viên</h2>
                        <form method="post" action="DangKySV.php" name="registerForm">
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-user text-grey-500 pe-0"></i>
                                <input type="text" name="hoten" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Họ và tên" onblur="validateInput('hoten')">
                                <span id="errorHoten" style="color: red; display: none;">Vui lòng nhập họ và tên.</span>
                            </div>
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-email text-grey-500 pe-0"></i>
                                <input type="text" name="masv" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Mã sinh viên" onblur="validateInput('masv')">
                                <span id="errorMasv" style="color: red; display: none;">Vui lòng nhập mã sinh viên.</span>
                            </div>

                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-lock text-grey-500 pe-0"></i>
                                <input type="text" name="lop" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Lớp sinh hoạt" onblur="validateInput('lop')">
                                <span id="errorLop" style="color: red; display: none;">Vui lòng nhập lớp sinh hoạt.</span>
                            </div>
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-lock text-grey-500 pe-0"></i>
                                <select name="major" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600 select-dropdown" onchange="updateMajorName();">
                                    <option value="" selected disabled hidden>Khoa</option>
                                    <?php
                                    // Truy vấn để lấy danh sách các khoa từ bảng major
                                    $sql_major = "SELECT * FROM major";
                                    $result_major = $conn->query($sql_major);

                                    if ($result_major->num_rows > 0) {
                                        // Duyệt qua kết quả và hiển thị tên các khoa trong menu dropdown
                                        while ($row = $result_major->fetch_assoc()) {
                                            $major_id = $row['Id'];
                                            $major_name = $row['name'];
                                            echo "<option value='$major_id'>$major_name</option>";
                                        }
                                    }
                                    ?>
                                </select>
                                <span id="errorMajor" style="color: red; display: none;">Vui lòng chọn khoa.</span>
                            </div>
                            <!-- Trường ẩn để lưu tên của khoa -->
                            <input type="hidden" name="major_name" id="major_name" value="">
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-email text-grey-500 pe-0"></i>
                                <input type="password" name="matkhau" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Mật khẩu" onblur="validateInput('matkhau')">
                                <span id="errorMatkhau" style="color: red; display: none;">Vui lòng nhập mật khẩu.</span>
                            </div>
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-lock text-grey-500 pe-0"></i>
                                <input type="password" name="nhaplaimatkhau" class="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Nhập lại mật khẩu" onblur="validateInput('nhaplaimatkhau')" onblur="checkInputPasswordAgain()" required>
                                <span id="errorNhaplaimatkhau" style="color: red; display: none;">Vui lòng nhập lại mật khẩu.</span>
                            </div>
                            <button type="submit" id="registerButton" name="submit" class="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0" disabled>Đăng ký</button>
                        </form>
                        <h6 class="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">Đã có tài khoản<a href="login.php" class="fw-700 ms-1">Đăng nhập</a></h6>
                    </div>
                </div>
            </div>
        </div>
        <!-- end Form đăng ký sinh viên -->
    </div>
    <script src="js/plugin.js"></script>
    <script src="js/scripts.js"></script>
</body>
</html>
