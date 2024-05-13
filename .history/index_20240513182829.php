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
            $NTC_id = $row["Id_organization"];
            $NTC_name = $row["Name_organization"];
            $NTC_gmail = $row["Email"];
            $NTC_mota = $row["Description"];
            $NTC_diachi = $row["Address"];
            $NTC_sdt = $row["Sdt"];
        }
    } else {
        echo "No results found.";
    }
} else {
    echo "Error executing the query: " . $conn->error;
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
            <div class="nav-top">
                <a href="index.html"> <img src="./images/LOGO.png" alt="Logopage" class="logo-img"> </a>
            </div>
            <!-- Search -->
            <form action="#" class="float-left header-search">
                <div class="form-group mb-0 icon-input">
                    <i class="feather-search font-sm text-grey-400"></i>
                    <input type="text" placeholder="Start typing to search.." class="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg">
                </div>
            </form>

            <!-- Notification -->
            <a href="#" class="p-2 text-center ms-auto menu-icon" id="dropdownMenu3" data-bs-toggle="dropdown" aria-expanded="false"><span class="dot-count bg-warning"></span><i class="feather-bell font-xl text-current"></i></a>
            <div class="dropdown-menu dropdown-menu-end p-4 rounded-3 border-0 shadow-lg" aria-labelledby="dropdownMenu3">

                <h4 class="fw-700 font-xssss mb-4">Thông báo</h4>
                <div class="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                    <img src="images/user-8.png" alt="user" class="w40 position-absolute left-0">
                    <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Liên Chi Đoàn Khoa Fast - Đại học Bách Khoa <span class="text-grey-400 font-xsssss fw-600 float-right mt-1"> 3 tháng</span></h5>
                    <h6 class="text-grey-500 fw-500 font-xssss lh-4">Sự kiện sắp diễn ra hay dô hay dô</h6>
                </div>
                <div class="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                    <img src="images/user-4.png" alt="user" class="w40 position-absolute left-0">
                    <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Hệ thống<span class="text-grey-400 font-xsssss fw-600 float-right mt-1"> 2 phút</span></h5>
                    <h6 class="text-grey-500 fw-500 font-xssss lh-4">Sự kiện của bạn sẽ diễn ra trong 2 ngày nữa</h6>
                </div>

                <div class="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                    <img src="images/user-7.png" alt="user" class="w40 position-absolute left-0">
                    <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Hội Sinh viên <span class="text-grey-400 font-xsssss fw-600 float-right mt-1"> 1 tiếng</span></h5>
                    <h6 class="text-grey-500 fw-500 font-xssss lh-4">Bạn đã tham gia hoạt động "Yés sir"</h6>
                </div>
                <div class="card bg-transparent-card w-100 border-0 ps-5">
                    <img src="images/user-6.png" alt="user" class="w40 position-absolute left-0">
                    <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Thanh niên Đà Nẵng <span class="text-grey-400 font-xsssss fw-600 float-right mt-1"> 1 ngày</span></h5>
                    <h6 class="text-grey-500 fw-500 font-xssss lh-4">Bạn đã biết chưa</h6>
                </div>
            </div>
            <!-- Setting -->
            <a href="#" class="p-2 text-center ms-3 menu-icon chat-active-btn"><i class="feather-message-square font-xl text-current"></i></a>
            <!-- <div class="p-2 text-center ms-3 position-relative dropdown-menu-icon menu-icon cursor-pointer">
                <label class="toggle toggle-dark"><input type="checkbox"><span class="toggle-icon"></span></label>

            </div> -->
            <div class="p-2 text-center ms-3 position-relative dropdown-menu-icon menu-icon cursor-pointer">
                <i class="p-0 ms-3 menu-icon"><img src="images/profile-4.png" alt="user" class="w40 mt--1"></i>
                <div class="dropdown-menu-settings switchcolor-wrap">
                    <h4 class="fw-700 font-sm mb-4">Tài khoản</h4>
                    <div class="card bg-transparent-card border-0 d-block mt-3">
                        <h4 class="d-inline font-xssss mont-font fw-700">Cá nhân</h4>
                        <div class="d-inline float-right mt-1">
                        </div>
                    </div>
                    <div class="card bg-transparent-card border-0 d-block mt-3">
                        <h4 class="d-inline font-xssss mont-font fw-700">Đăng xuất</h4>
                        <div class="d-inline float-right mt-1">
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- navigation top -->

        <!-- navigation left -->
        <nav class="navigation scroll-bar">
            <div class="container ps-0 pe-0">
                <div class="nav-content">
                    <!-- Top nevigation left -->
                    <div class="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
                        <div class="nav-caption fw-600 font-xssss text-grey-500"><span>New </span>Feeds</div>
                        <ul class="mb-1 top-content">
                            <li class="logo d-none d-xl-block d-lg-block"></li>
                            <li><a href="default.html" class="nav-content-bttn open-font"><i class="feather-tv btn-round-md bg-blue-gradiant me-3"></i><span>Tất cả</span></a></li>
                            <li><a href="default-badge.html" class="nav-content-bttn open-font"><i class="feather-award btn-round-md bg-red-gradiant me-3"></i><span>Của tôi</span></a></li>
                        </ul>
                    </div>

                    <!-- Top nevigation left -->
                    <div class="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2">
                        <div class="nav-caption fw-600 font-xssss text-grey-500"><span>Admin </span>Pages</div>
                        <ul class="mb-3">
                            <li><a href="default-email-box.html" class="nav-content-bttn open-font"><i class="font-xl text-current feather-inbox me-3"></i><span>Chờ duyệt</span><span class="circle-count bg-warning mt-1">584</span></a></li>
                            <li><a href="default-hotel.html" class="nav-content-bttn open-font"><i class="font-xl text-current feather-home me-3"></i><span>Sửa sự kiện</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
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
                            <div class="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3 mt-3">
                                <div class="card-body p-0">
                                    <a href="/create_post.php" class=" font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center"><i class="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight"></i>Create Post</a>
                                </div>
                            </div>

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
