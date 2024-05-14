<?php
require("./DB/database.php");

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connect failed". $conn->connect_error);
}

// organization query
$sql_organization = "SELECT * FROM organization";
// Thực thi truy vấn
$result = $conn->query($sql_organization);

// Kiểm tra kết quả truy vấn
if ($result) {
    // Kiểm tra xem có bất kỳ hàng nào được trả về không
    if ($result->num_rows > 0) {
        // Lặp qua từng hàng và lấy dữ liệu
        while ($row = $result->fetch_assoc()) {
            $NTC_avatar = $row["avatar"];
            $NTC_id = $row["Id"];
            $NTC_name = $row["Name"];
            $NTC_gmail = $row["Email"];
            $NTC_mota = $row["Description"];
            $NTC_diachi = $row["Address"];
            $NTC_phone = $row["Phone"];
        }
    } else {
        echo "No results found.";
    }
} else {
    echo "Error executing the query: " . $conn->error;
}

// Kiểm tra role để hiển thị phần Create Post
$role = "student"; // Giả sử role là student mặc định
if (isset($_SESSION['role'])) {
    $role = $_SESSION['role'];
}

// Activity query để lấy tất cả bài viết và sắp xếp theo thời gian từ mới nhất đến cũ nhất
$sql_Activity = "SELECT * FROM Activity ORDER BY created_at DESC";

// Thực thi truy vấn
$result2 = $conn->query($sql_Activity);

// Đóng kết nối
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Trang chủ</title>

    <link rel="stylesheet" href="css/themify-icons.css">
    <link rel="stylesheet" href="css/feather.css">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/emoji.css">

    <link rel="stylesheet" href="css/lightbox.css">

</head>

<body class="color-theme-blue mont-font">

    <!-- <div class="preloader"></div> -->


    <div class="main-wrapper">

        <!-- navigation top-->
        <div class="nav-header bg-white shadow-xs border-0">
            <!-- Phần header -->
        </div>
        <!-- navigation top -->

        <!-- navigation left -->
        <nav class="navigation scroll-bar">
            <!-- Phần nav -->
        </nav>
        <!-- navigation left -->

        <!-- main content -->
        <div class="main-content right-chat-active">
            <div class="middle-sidebar-bottom">
                <div class="middle-sidebar-left">

                    <!-- loader wrapper -->
                    <div class="row feed-body">
                        <div class="col-xl-8 col-xxl-9 col-lg-8">
                            <!-- Create activity button -->
                            <?php if ($role == "organization"): ?>
                            <div class="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3 mt-3">
                                <div class="card-body p-0">
                                    <a href="/create_post.php" class=" font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center"><i class="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight"></i>Create Post</a>
                                </div>
                            </div>
                            <?php endif; ?>

                            <?php
                                // Kiểm tra kết quả truy vấn
                                if ($result2) {
                                    // Kiểm tra xem có bất kỳ hàng nào được trả về không
                                    if ($result2->num_rows > 0) {
                                        $counter = 0;
                                        // Lặp qua từng hàng và lấy dữ liệu
                                        while ($row = $result2->fetch_assoc()) {
                                            $HD_id  = $row["Id_activity"];
                                            $HD_idNTC = $row["Id_organization"];
                                            $HD_name = $row["Name_activity"];
                                            $HD_mota = $row["Description"];
                                            $HD_date_start = $row["Date_start"];
                                            $HD_date_end = $row["Date_end"];
                                            $HD_date_start_regis = $row["Date_start_registe"];
                                            $HD_date_end_regis = $row["Date_end_registe"];
                                            $HD_is_delete_request = $row["Is_delete_request"];
                                            $HD_is_confirm_admin = $row["Is_confirm_from_Admin"];
                                            $post_id = 'post_' . $counter;
                                            ?>
                                            <!-- Khuc ni la mot cai hoat dong ni -->
                                            <div class="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                                            <div class="card-body p-0 d-flex">
                                                <figure class="avatar me-3"><img src="<?php echo $NTC_avatar ?>" alt="image" class="shadow-sm rounded-circle w45"></figure> <!-- src = anj avartar cua  nha to chuc -->
                                                <h4 class="fw-700 text-grey-900 font-xssss mt-1"> <?php echo $NTC_name ?><!-- Ten cua NTC --><span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"><?php echo $HD_date_start ?> - <?php echo $HD_date_end ?><!-- ngay bat dau va ket thuc --></span></h4>
                                                <div class="ms-auto pointer">
                                                    <h4 class="text-grey-900 fw-600 font-xssss mt-1"><?php echo $HD_name?><!-- Ten cua hoat dong --></h4>
                                                    <a href="#" class="btn-round-sm bg-greylight font-xsssss text-grey-700"> <span class="feather-plus me-2 font-xs"></span>Join</a> <!-- Join vao hoat dong -->
                                                </div>
                                            </div>
                                            <h4 class="fw-700 text-grey-900 font-xssss mt-3"><?php echo $HD_mota?><!-- Noi dung cua hoat dong --></h4>
                                            <h4 class="fw-700 text-grey-900 font-xssss mt-3"><?php echo $NTC_diachi?><!-- dia chi nha to chuc --></h4>
                                        </div>
                                            <!-- Het khuc ni la mot cai hoat dong ni -->
                                            <?php
                                            $counter++;
                                        }
                                    } else {
                                        echo "No results found.";
                                    }
                                } else {
                                    echo "Error executing the query: " . $conn->error;
                                }
                            ?>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="footer-wrap bg-white p-0 border-top">
            <div class="row">
                <div class="col-lg-12">
                    <div class="copy-right text-center"><span class="text-grey-500 font-xssss">Feeds © 2023 All Right Reserved</span></div>
                </div>
            </div>
        </div> -->

    </div>

    <!-- Javascripts -->
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/jquery.dataTables.min.js"></script>
    <script src="js/moment.min.js"></script>
    <script src="js/lightbox.js"></script>
    <script src="js/date-range-picker/moment.min.js"></script>
    <script src="js/date-range-picker/daterangepicker.js"></script>
    <script src="js/owl-carousel.js"></script>
    <script src="js/custom.js"></script>
</body>

</html>
