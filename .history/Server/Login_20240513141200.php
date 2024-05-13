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
