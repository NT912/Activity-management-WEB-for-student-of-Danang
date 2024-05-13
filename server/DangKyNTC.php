<?php
require("/Users/nhattruong/Desktop/Activity-management-WEB-for-student-of-Danang/DB/database.php");

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connect failed" . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name_organization = $_POST["Name"];
    $email = $_POST["Email"];
    $password = $_POST["Password"];

    if (empty($name_organization) || empty($email) || empty($password)) {
        echo "<script>alert('Vui lòng điền đầy đủ thông tin.');</script>";
    } else {
        // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
        $sql_check = "SELECT COUNT(*) AS total FROM user WHERE Email = '$email'";
        $result_check = $conn->query($sql_check);

        if ($result_check) {
            $row = $result_check->fetch_assoc();
            $total = $row['total'];

            if ($total > 0) {
                // Email đã tồn tại
                echo "<script>alert('Email đã tồn tại. Vui lòng nhập lại Email khác.');</script>";
            } else {
                // Email chưa tồn tại, tiến hành thêm thông tin vào cơ sở dữ liệu

                // Thêm thông tin tổ chức vào bảng organization
                // Lấy ID tổ chức mới thêm vào
                $id_organization = $conn->insert_id;

                $sql_organization = "INSERT INTO organization (Id, Name, Email, Password)
                            VALUES ('$id_organization','$name_organization', '$email', '$password')";
                if ($conn->query($sql_organization) === TRUE) {
                    // Lấy ID tổ chức mới thêm vào
                    $id_organization = $conn->insert_id;

                    // Thêm thông tin người dùng vào bảng user và tự động tạo vai trò là organization
                    $role = 'organization';
                    $sql_user = "INSERT INTO user (Name, Email, Password, Id, role)
                                VALUES ('$name_organization', '$email', '$password', '$id_organization', '$role')";
                    if ($conn->query($sql_user) === TRUE) {
                        echo "<script>alert('Đăng ký thành công.');</script>";
                        // Chuyển hướng sang trang login.php
                        header("Location: ../login.php");
                        exit(); // Đảm bảo không có mã HTML hoặc mã PHP nào được thực thi sau lệnh chuyển hướng
                    } else {
                        echo "Lỗi khi thêm thông tin người dùng: " . $conn->error;
                    }
                } else {
                    echo "Lỗi khi thêm thông tin tổ chức: " . $conn->error;
                }
            }
        } else {
            echo "Lỗi trong quá trình kiểm tra email: " . $conn->error;
        }
    }

    $conn->close();
}
?>
