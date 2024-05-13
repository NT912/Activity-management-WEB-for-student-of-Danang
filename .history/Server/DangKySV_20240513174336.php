<?php
require("/Users/nhattruong/Desktop/Activity-management-WEB-for-student-of-Danang/DB/database.php");

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connect failed" . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $hoten = $_POST["hoten"];
    $masv = $_POST["masv"];
    $matkhau = $_POST["matkhau"];
    $lop = $_POST["lop"];
    $major_name = $_POST["major_name"];

    // Kiểm tra xem các trường thông tin có được nhập đầy đủ không
    if (empty($hoten) || empty($masv) || empty($matkhau) || empty($lop) || empty($major_name)) {
        echo "<script>alert('Vui lòng điền đầy đủ thông tin.');</script>";
    } else {
        // Kiểm tra xem mã sinh viên đã tồn tại trong cơ sở dữ liệu chưa
        $sql_check = "SELECT * FROM student WHERE MaSV = '$masv'";
        $result_check = $conn->query($sql_check);

        if ($result_check->num_rows > 0) {
            // Mã sinh viên đã tồn tại
            echo "<script>alert('Mã sinh viên đã tồn tại. Vui lòng nhập lại mã sinh viên khác.');</script>";
        } else {
            // Mã sinh viên chưa tồn tại, tiến hành thêm thông tin sinh viên và khoa vào cơ sở dữ liệu
            // Lấy ID của người dùng vừa được thêm vào
            $last_user_id = $conn->insert_id;
            // Thêm thông tin người dùng vào bảng user
            $sql_user = "INSERT INTO user (Id, Name, Email, Password, major_id, role) VALUES ('$last_user_id', '$hoten', '$masv', '$matkhau', (SELECT Id FROM major WHERE name = '$major_name'), 'student')";
            $result_user = $conn->query($sql_user);

            if ($result_user === TRUE) {
                // Thêm thông tin sinh viên vào bảng student
                $sql_student = "INSERT INTO student (Name, Password, MaSV, lopsinhoat, major, Id) VALUES ('$hoten', '$matkhau', '$masv', '$lop', (SELECT Id FROM major WHERE name = '$major_name'), '$last_user_id')";
                $result_student = $conn->query($sql_student);

                if ($result_student === TRUE) {
                    echo "<script>alert('Đăng ký thành công.');</script>";
                    // Chuyển hướng sang trang login.php
                    header("Location: login.php");
                    exit(); // Đảm bảo không có mã HTML hoặc mã PHP nào được thực thi sau lệnh chuyển hướng
                } else {
                    echo "Lỗi khi thêm thông tin sinh viên: " . $conn->error;
                }
            } else {
                echo "Lỗi khi thêm thông tin người dùng: " . $conn->error;
            }
        }
    }

    $conn->close();
}
?>
