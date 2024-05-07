<?php
// Kết nối đến cơ sở dữ liệu
require("./DB/database.php");
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối không thành công: " . $conn->connect_error);
}

// Xử lý dữ liệu từ biểu mẫu và lưu vào cơ sở dữ liệu
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ biểu mẫu
    $orginizationID = $_POST["Id_orginization"];
    $activityID = $_POST["activityID"];
    $activityName = $_POST["activityName"];
    $dateStart = $_POST["dateStart"];
    $dateEnd = $_POST["dateEnd"];
    $dateStartReg = $_POST["dateStartReg"];
    $dateEndReg = $_POST["dateEndReg"];
    $activityContent = $_POST["activityContent"];

    // Thư mục lưu trữ ảnh
    $targetDir = "images/";

    // Tạo thư mục mới dựa trên tên hoạt động
    $activityFolder = str_replace(' ', '_', $activityName); // Thay thế khoảng trắng bằng dấu gạch dưới
    $targetDir .= $activityFolder . '/';
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true); // Tạo thư mục nếu chưa tồn tại
    }

    // Tên tệp ảnh và đường dẫn tệp lưu trữ trên server
    $imageName = basename($_FILES["image"]["name"]);
    $targetFilePath = $targetDir . $imageName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

    // Đường dẫn tệp tương đối cho cơ sở dữ liệu
    $imageRelativePath = $targetDir . $imageName;

    // Kiểm tra xem tệp ảnh có hợp lệ không
    if (!empty($imageName)) {
        // Upload tệp ảnh lên server
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
            // Chuẩn bị câu lệnh SQL để chèn dữ liệu vào cơ sở dữ liệu
            $sql = "INSERT INTO Activity (Id_orginization, Id_activity, Name_activity, Description, Date_start, Date_end, Date_start_registe, Date_end_registe, Image)
                VALUES ('$orginizationID','$activityID', '$activityName', '$activityContent', '$dateStart', '$dateEnd', '$dateStartReg', '$dateEndReg', '$imageRelativePath')";

            // Thực thi câu lệnh SQL
            if ($conn->query($sql) === TRUE) {
                // Trả về mã trạng thái HTTP 200 để thông báo lưu dữ liệu thành công
                http_response_code(200);
            } else {
                // Trả về mã trạng thái HTTP 400 để thông báo lưu dữ liệu không thành công
                http_response_code(400);
            }
        } else {
            // Trả về mã trạng thái HTTP 400 nếu có lỗi khi tải tệp lên server
            http_response_code(400);
        }
    } else {
        // Trả về mã trạng thái HTTP 400 nếu không có tệp ảnh được chọn
        http_response_code(400);
    }
}

// Đóng kết nối với cơ sở dữ liệu
$conn->close();
?>
