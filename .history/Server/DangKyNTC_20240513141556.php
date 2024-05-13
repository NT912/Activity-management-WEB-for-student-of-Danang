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
            // ID chưa tồn tại, tiến hành thêm thông tin nhà tổ chức vào cơ sở dữ liệu

            // Thêm thông tin nhà tổ chức vào bảng
            $sql_ntc = "INSERT INTO Orginization_information (Id_orginization, Name_orginization, Email, Password) VALUES ('$id_orginization', '$name_orginization', '$email', '$matkhau')";
            $result_ntc = $conn->query($sql_ntc);

            if ($result_ntc === TRUE) {
                echo "<script>alert('Đăng ký thành công.');</script>";
                header("Location: login.php");
                exit();
            } else {
                echo "Lỗi khi thêm thông tin nhà tổ chức: " . $conn->error;
            }
        }
    }

    $conn->close();
}
?>
