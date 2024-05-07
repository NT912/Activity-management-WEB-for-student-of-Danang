<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Đăng ký</title>
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="color-theme-blue">
    <div class="preloader"></div>
    <div class="main-wrap">
        <div class="nav-header bg-transparent shadow-none border-0">
            <!-- Header -->
        </div>
        <!-- Form đăng ký sinh viên -->
        <div class="row">
            <div class="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat" style="background-image: url(images/login-bg-2.jpg);"></div>
            <div class="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                <div class="card shadow-none border-0 ms-auto me-auto login-card">
                    <div class="card-body rounded-0 text-left">
                        <h2 class="fw-700 display1-size display2-md-size mb-4">Tạo Tài Khoản <br> Sinh Viên</h2>
                        <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-user text-grey-500 pe-0"></i>
                                <input type="text" name="hoten" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Họ và tên">
                            </div>
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-email text-grey-500 pe-0"></i>
                                <input type="text" name="masv" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Mã sinh viên">
                            </div>
                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-email text-grey-500 pe-0"></i>
                                <input type="password" name="Password" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Mật khẩu">
                            </div>
                            <div class="form-group icon-input mb-3">
                                <input type="password" name="Password" class="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Nhập lại mật khẩu">
                                <i class="font-sm ti-lock text-grey-500 pe-0"></i>
                            </div>
                            <div class="form-group icon-input mb-3">
                                <input type="text" name="lopsinhoat" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Lớp sinh hoạt">
                                <i class="font-sm ti-lock text-grey-500 pe-0"></i>
                            </div>
                            <div class="form-group icon-input mb-1">
                                <input type="text" name="major" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Khoa">
                                <i class="font-sm ti-lock text-grey-500 pe-0"></i>
                            </div>
                            <div class="form-check text-left mb-3">
                                <input type="checkbox" name="agree" class="form-check-input mt-2" id="exampleCheck2">
                                <label class="form-check-label font-xsss text-grey-500" for="exampleCheck2">Chấp nhận điều khoản</label>
                            </div>
                            <button type="submit" name="submit" class="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0">Đăng ký</button>
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

<?php
require("./DB/database.php");

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connect failed" . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $hoten = $_POST["hoten"];
    $masv = $_POST["masv"];
    $matkhau = $_POST["Password"];
    $lop = $_POST["lopsinhoat"];
    $khoa = $_POST["major"];

    // Kiểm tra xem mã sinh viên đã tồn tại trong cơ sở dữ liệu chưa
    $sql_check = "SELECT * FROM Student WHERE MaSV = '$masv'";
    $result_check = $conn->query($sql_check);

    if ($result_check->num_rows > 0) {
        // Mã sinh viên đã tồn tại
        echo "<script>alert('Mã sinh viên đã tồn tại. Vui lòng nhập lại mã sinh viên khác.');</script>";
    } else {
        // Mã sinh viên chưa tồn tại, tiến hành thêm thông tin sinh viên và khoa vào cơ sở dữ liệu

        // Thêm thông tin sinh viên vào bảng Student
        $sql_student = "INSERT INTO Student (Name, MaSV, Password, lopsinhoat, major) VALUES ('$hoten', '$masv', '$matkhau', '$lop', '$khoa')";
        $result_student = $conn->query($sql_student);

        if ($result_student === TRUE) {
            // Thêm thông tin khoa vào bảng Major
            $sql_major = "INSERT INTO major (khoa) VALUES ('$khoa')";
            $result_major = $conn->query($sql_major);

            if ($result_major === TRUE) {
                echo "<script>alert('Đăng ký thành công.');</script>";
                // Chuyển hướng sang trang login.php
                header("Location: login.php");
                exit(); // Đảm bảo không có mã HTML hoặc mã PHP nào được thực thi sau lệnh chuyển hướng
            } else {
                echo "Lỗi khi thêm thông tin khoa: " . $conn->error;
            }
        } else {
            echo "Lỗi khi thêm thông tin sinh viên: " . $conn->error;
        }
    }

    $conn->close();
}
?>
