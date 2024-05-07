// Thư mục lưu trữ hình ảnh
$uploadDirectory = "uploads/";

// Xử lý tải lên từ người dùng
if(isset($_FILES['image'])){
    $file = $_FILES['image'];
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileDestination = $uploadDirectory . $fileName;

    // Di chuyển hình ảnh tải lên vào thư mục lưu trữ
    move_uploaded_file($fileTmpName, $fileDestination);

    // Lưu đường dẫn của hình ảnh vào cơ sở dữ liệu
    $query = "INSERT INTO your_table_name (image_path) VALUES ('$fileDestination')";
    // Thực hiện truy vấn và thêm đường dẫn vào cơ sở dữ liệu
}
