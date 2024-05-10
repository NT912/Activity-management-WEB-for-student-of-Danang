<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Đăng nhập</title>

    <link rel="stylesheet" href="css/themify-icons.css">
    <link rel="stylesheet" href="css/feather.css">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="css/style.css">
</head>

<body class="color-theme-blue">
    <div class="preloader"></div>
    <div class="main-wrap">
        <div class="nav-header bg-transparent shadow-none border-0">
            <div class="nav-top w350">
                <img src="./images/LOGO.png" alt="Logopage" class="logo-img"> </a>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat" style="background-image: url(images/login-bg.jpg);"></div>
        <div class="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
            <div class="card shadow-none border-0 ms-auto me-auto login-card">
                <div class="card-body rounded-0 text-left">
                    <h2 class="fw-700 display1-size display2-md-size mb-3">Đăng Nhập Tài Khoản</h2>
                    <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                        <div class="form-group icon-input mb-3">
                            <i class="font-sm ti-email text-grey-500 pe-0"></i>
                            <input type="text" name="username" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="vd:1232000126" required>
                        </div>
                        <div class="form-group icon-input mb-1">
                            <input type="password" name="password" class="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Password" required>
                            <i class="font-sm ti-lock text-grey-500 pe-0"></i>
                        </div>
                        <div class="form-check text-left mb-3">
                            <input type="checkbox" class="form-check-input mt-2" id="exampleCheck5">
                            <label class="form-check-label font-xsss text-grey-500" for="exampleCheck5">Ghi nhớ đăng nhập</label>
                            <a href="forgot.php" class="fw-600 font-xsss text-grey-700 mt-1 float-right">Quên mật khẩu</a>
                        </div>
                        <button type="submit" class="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0">Đăng nhập</button>
                    </form>
                    <?php
                    // Kết nối đến cơ sở dữ liệu
                    require("./DB/database.php");
                    $conn = new mysqli($servername, $username, $password, $dbname);

                    // Kiểm tra kết nối
                    if ($conn->connect_error) {
                        die("Connect failed: " . $conn->connect_error);
                    }

                    // Kiểm tra khi người dùng gửi yêu cầu POST
                    if ($_SERVER["REQUEST_METHOD"] == "POST") {
                        // Lấy dữ liệu từ form đăng nhập
                        $username = $_POST["username"];
                        $password = $_POST["password"];

                        // Kiểm tra trong bảng Student
                        $sql_student = "SELECT * FROM Student WHERE MaSV='$username'";
                        $result_student = $conn->query($sql_student);

                        // Kiểm tra trong bảng Orginization_information
                        $sql_org = "SELECT * FROM Orginization_information WHERE (Id_orginization='$username' OR Email='$username')";
                        $result_org = $conn->query($sql_org);

                        // Kiểm tra kết quả
                        if ($result_student->num_rows > 0) {
                            $row_student = $result_student->fetch_assoc();
                            if ($row_student["Password"] == $password) {
                                // Đăng nhập thành công với tài khoản sinh viên
                                header("Location: index.php");
                                exit();
                            } else {
                                // Sai mật khẩu
                                echo "<p style='color: red;'>Sai mật khẩu.</p>";
                            }
                        } elseif ($result_org->num_rows > 0) {
                            $row_org = $result_org->fetch_assoc();
                            if ($row_org["Password"] == $password) {
                                // Đăng nhập thành công với tài khoản tổ chức
                                header("Location: index.php");
                                exit();
                            } else {
                                // Sai mật khẩu
                                echo "<p style='color: red;'>Sai mật khẩu.</p>";
                            }
                        } else {
                            // Không tìm thấy tài khoản
                            echo "<p style='color: red;'>Tài khoản không tồn tại.</p>";
                        }
                    }

                    $conn->close();
                    ?>

                    <div class="col-sm-12 p-0 text-left">
                        <h6 class="text-grey-500 font-xsss fw-500 mt-3 mb-0 lh-32">Chưa có tài khoản <a href="dangkyvoivaitro.php" class="fw-700 ms-1">Đăng ký</a></h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/plugin.js"></script>
    <script src="js/scripts.js"></script>
</body>
</html>
