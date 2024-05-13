<?php
require("./DB/database.php");

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connect failed" . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name_organization = $_POST["Name"];
    $email = $_POST["Email"];
    $password = $_POST["Password"];

    // Kiểm tra xem các trường dữ liệu có đầy đủ không
    if (empty($name_organization) || empty($email) || empty($password)) {
        echo "<script>alert('Vui lòng điền đầy đủ thông tin.');</script>";
    } else {
        // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
        $sql_check = "SELECT * FROM user WHERE Email = '$email'";
        $result_check = $conn->query($sql_check);

        if ($result_check->num_rows > 0) {
            // Email đã tồn tại
            echo "<script>alert('Email đã tồn tại. Vui lòng nhập lại Email khác.');</script>";
        } else {
            // Email chưa tồn tại, tiến hành thêm thông tin vào cơ sở dữ liệu

            // Thêm thông tin tổ chức vào bảng organization
            $hashed_password = password_hash($password, PASSWORD_DEFAULT); // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
            $sql_organization = "INSERT INTO organization (Name, Email, Password)
                        VALUES ('$name_organization', '$email', '$hashed_password')";
            if ($conn->query($sql_organization) === TRUE) {
                // Lấy ID tổ chức mới thêm vào
                $id_organization = $conn->insert_id;

                // Thêm thông tin người dùng vào bảng user và tự động tạo vai trò là organization
                $sql_user = "INSERT INTO user (Name_organization, Email, Password, Id_organization, role)
                            VALUES ('$name_organization', '$email', '$hashed_password', '$id_organization', 'organization')";
                if ($conn->query($sql_user) === TRUE) {
                    echo "<script>alert('Đăng ký thành công.');</script>";
                    header("Location: login.php");
                    exit();
                } else {
                    echo "Lỗi khi thêm thông tin người dùng: " . $conn->error;
                }
            } else {
                echo "Lỗi khi thêm thông tin tổ chức: " . $conn->error;
            }
        }
    }

    $conn->close();
}
?>
