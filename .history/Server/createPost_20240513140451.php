<?php
// Kết nối tới cơ sở dữ liệu
include '/Users/nhattruong/Desktop/Activity-management-WEB-for-student-of-Danang/DB/database.php'; // Đảm bảo đường dẫn đến file database.php là chính xác

$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Xử lý dữ liệu khi form được gửi
if(isset($_POST['submit'])) {
    // Lấy dữ liệu từ form
    $name = $_POST['Name_activity'];
    $date_start = $_POST['Date_start'];
    $date_end = $_POST['Date_end'];
    $date_start_regis = $_POST['Date_start_registe'];
    $date_end_regis = $_POST['Date_end_registe'];
    $location = $_POST['Location'];
    $content = $_POST['Description'];
    $image = $_FILES['image']['name'];
    $image_temp = $_FILES['image']['tmp_name'];
    $organization_id = "your_organization_id"; // Thay bằng phương thức lấy id tự động từ 2 table liên quan

    // Thực hiện tạo thư mục và lưu ảnh
    $folder = "images/" . $name . "/";
    if (!file_exists($folder)) {
        mkdir($folder, 0777, true);
    }
    $target_path = $folder . $image;
    move_uploaded_file($image_temp, $target_path);

    // Tạo Id_activity ngẫu nhiên
    $id_activity = rand(10000, 99999);

    // Insert dữ liệu vào bảng activity
    $sql = "INSERT INTO activity (Id_activity, Id_organization, Name_activity, Date_start, Date_end, Date_start_regis, Date_end_regis, Location, Content, Image)
            VALUES ('$id_activity', '$organization_id', '$name', '$date_start', '$date_end', '$date_start_regis', '$date_end_regis', '$location', '$content', '$target_path')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
