<?php
require("/Users/nhattruong/Desktop/Activity-management-WEB-for-student-of-Danang/DB/database.php");

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connect failed" . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Nhận major_id từ yêu cầu AJAX
    $major_id = $_GET["major_id"];

    // Truy vấn để lấy tên của khoa từ major_id
    $sql_major_name = "SELECT name FROM major WHERE Id = '$major_id'";
    $result_major_name = $conn->query($sql_major_name);

    if ($result_major_name->num_rows > 0) {
        // Trả về tên của khoa
        $row = $result_major_name->fetch_assoc();
        echo $row["name"];
    } else {
        echo "Không tìm thấy khoa";
    }
}

$conn->close();
?>
