<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <title>Form Popup</title>
    
    <link rel="stylesheet" href="css/themify-icons.css">
    <link rel="stylesheet" href="css/feather.css">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/lightbox.css">
    <style>
        /* CSS để ẩn form và thiết lập vị trí trung tâm */
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
        }
        #popupForm form {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Số cột tự động thay đổi */
            grid-gap: 10px;
        }
    
        /* Định dạng label cuối cùng */
        #popupForm label:last-child {
            grid-column: span 2; /* Chiếm 2 cột */
            font-size: 16px; /* Kích thước lớn hơn */
            font-weight: bold;
        }

       

        #popupForm form {
            max-width: 400px;
            margin: 0 auto;
        }

        #popupForm label {
            display: block;
            margin-bottom: 10px;
        }

        #popupForm input[type="text"],
        #popupForm input[type="date"],
        #popupForm textarea {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        #popupForm input[type="file"] {
            margin-top: 5px;
        }

        #popupForm input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        #popupForm input[type="submit"]:hover {
            background-color: #45a049;
        }

        #popupForm textarea {
            resize: vertical;
            
            min-height: 100px;
            max-height: 200px;
        }
    </style>
</head>
<body class="color-theme-blue mont-font">
     
    <div class="main-wrapper">

        <!-- navigation top-->
        <div class="nav-header bg-white shadow-xs border-0">
            <div class="nav-top">
                <a href="index.html"><i class="feather-zap text-success display1-size me-2 ms-0"></i><span class="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala. </span> </a>
            </div>
            
            <form action="#" class="float-left header-search">
                <div class="form-group mb-0 icon-input">
                    <i class="feather-search font-sm text-grey-400"></i>
                    <input type="text" placeholder="Start typing to search.." class="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg">
                </div>
            </form>
            <a href="#" class="p-2 text-center ms-auto menu-icon" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown"><span class="dot-count bg-warning"></span><i class="feather-bell font-xl text-current"></i></a>
            <div class="dropdown-menu dropdown-menu-end p-4 rounded-3 border-0 shadow-lg" aria-labelledby="dropdownMenu3">
                
                <h4 class="fw-700 font-xss mb-4">Notification</h4>
                <div class="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                    <img src="images/user-8.png" alt="user" class="w40 position-absolute left-0">
                    <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">DH Bach Khoa <span class="text-grey-400 font-xsssss fw-600 float-right mt-1"> 3 min</span></h5>
                    <h6 class="text-grey-500 fw-500 font-xssss lh-4">DUT JOBFAIR sap dien ra</h6>
                </div>
                <div class="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                    <img src="images/user-4.png" alt="user" class="w40 position-absolute left-0">
                    <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Khoa FAST <span class="text-grey-400 font-xsssss fw-600 float-right mt-1"> 2 min</span></h5>
                    <h6 class="text-grey-500 fw-500 font-xssss lh-4">Sac mua xuan</h6>
                </div>

            </div>

            

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
                    <div class="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
                        <div class="nav-caption fw-600 font-xssss text-grey-500"><span>New </span>Feeds</div>
                        <ul class="mb-1 top-content">
                            <li class="logo d-none d-xl-block d-lg-block"></li>
                            <li><a href="default.html" class="nav-content-bttn open-font" ><i class="feather-tv btn-round-md bg-blue-gradiant me-3"></i><span>Trang chinh</span></a></li>
                            <li><a href="default-badge.html" class="nav-content-bttn open-font" ><i class="feather-award btn-round-md bg-red-gradiant me-3"></i><span>Cua toi</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

<!-- Form Popup -->
<div id="popupForm">
    <form action="process.php" method="post">
        <!-- Add your form fields here -->
        <label for="Id_orginization">Organization ID:</label>
        <input type="text" id="Id_orginization" name="Id_orginization" value="234">

        <label for="activityID">Activity ID:</label>
        <input type="text" id="activityID" name="activityID">

        <label for="activityName">Activity Name:</label>
        <input type="text" id="activityName" name="activityName">

       
        <label for="dateStart">Ngày bắt đầu:</label>
        <input type="date" id="dateStart" name="dateStart">

        <label for="dateEnd">Ngày kết thúc:</label>
        <input type="date" id="dateEnd" name="dateEnd">

        <label for="dateStartReg">Ngày bắt đầu đăng ký:</label>
        <input type="date" id="dateStartReg" name="dateStartReg">

        <label for="dateEndReg">Ngày kết thúc đăng ký:</label>
        <input type="date" id="dateEndReg" name="dateEndReg">

        <label for="activityContent">Nội dung hoạt động:</label>
        <textarea id="activityContent" name="activityContent"></textarea>
        <label for="image">Upload Image:</label>
        <input type="file" id="image" name="image">


        
        <input type="submit" value="Create Post">
    </form>
</div>

<script>
    // JavaScript để xử lý sự kiện gửi biểu mẫu
    document.addEventListener("DOMContentLoaded", function() {
        // Bắt sự kiện khi biểu mẫu được gửi
        document.querySelector("form").addEventListener("submit", function(event) {
            event.preventDefault(); // Ngăn chặn biểu mẫu gửi dữ liệu theo cách mặc định

            // Gửi dữ liệu biểu mẫu bằng XMLHttpRequest hoặc Fetch API
            // Đây là ví dụ sử dụng Fetch API
            fetch("process.php", {
                method: "POST",
                body: new FormData(this) // Gửi dữ liệu từ biểu mẫu
            })
            .then(response => {
                if (response.ok) {
                    // Nếu lưu thành công, hiển thị thông báo popup
                    alert("Bài viết đã được tạo!");
                    // Chuyển hướng sang trang NTC-profile.php
                    window.location.href = "NTC-profile.php";
                } else {
                    // Nếu có lỗi, hiển thị thông báo lỗi
                    alert("Có lỗi xảy ra khi tạo bài viết.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
        });
    });
</script>

</body>
</html>
