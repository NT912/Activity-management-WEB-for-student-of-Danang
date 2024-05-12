<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sociala - Social Network App HTML Template </title>

    <link rel="stylesheet" href="css/themify-icons.css">
    <link rel="stylesheet" href="css/feather.css">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/lightbox.css">
</head>
<style>
    /* Style cho nút "See More" */
   .see-more-btn {
       height: 30px;
       width: 105px;
       padding: 0px 0px;
       background-color: #007bff;
       color: #fff;
       border: none;
       border-radius: 5px;
       cursor: pointer;
       transition: background-color 0.3s ease;
   }

   /* Style khi di chuột vào nút "See More" */
   .see-more-btn:hover {
       background-color: #0056b3;
   }

   /* Style cho nút "See Less" */
   .see-less-btn {
       height: 30px;
       width: 105px;
       padding: 0px 0px;
       background-color: #6c757d;
       color: #fff;
       border: none;
       border-radius: 5px;
       cursor: pointer;
       transition: background-color 0.3s ease;
   }

   /* Style khi di chuột vào nút "See Less" */
   .see-less-btn:hover {
       background-color: #5a6268;
   }

   /* Ẩn nội dung ban đầu */
   #additionalContent {
       display: none;
   }
</style>


<body class="color-theme-blue mont-font">

    <div class="preloader"></div>

    
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
        <!-- navigation left -->
        <!-- main content -->
        <div class="main-content " style="padding-top: 105px">
            <!-- Khuc ni la mot cai hoat dong ni -->
            <div class="card w-50 shadow-xss rounded-xxl border-0 p-4" style="min-width: 600px;">
                <div class="card-body p-0 d-flex">
                    <figure class="avatar me-3"><img src="<?php echo $NTC_avatar ?>" alt="image" class="shadow-sm rounded-circle w45"></figure> <!-- src = anj avartar cua  nha to chuc -->
                    <h4 class="fw-700 text-grey-900 font-xssss mt-1"> <?php echo $NTC_name ?><!-- Ten cua NTC --><span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"><?php $HD_mota ?></span></h4>
                </div>

                <div class="card-body p-0 me-lg-5">
                    <h5><!--ten hoat dong--></h5> <br> 
                    <h6>Thời gian diễn ra hoạt động: <?php echo($HD_date_start . " - " . $HD_date_end) ?></h6> <br>
                    <h6>Thơi gian đăng ký hoạt động: <?php echo($HD_date_start_regis . " - " . $HD_date_end_regis) ?></h6> <br>
                    <h6>Dia diem dien ra hoat: <!--Dia diem dien ra hoat dong--></h6> <br>
                    <!-- Nội dung ban đầu -->
                    <div id="initialContent_<?php echo $post_id; ?>">
                    <button class="see-more-btn" onclick="showMore('<?php echo $post_id; ?>')">See More</button>
                    </div>

                    <!-- Nội dung được ẩn -->
                    <div id="additionalContent_<?php echo $post_id; ?>" style="display: none;">
                        <?php echo $HD_mota; ?>
                        <br>
                        <button class="see-less-btn" onclick="showLess('<?php echo $post_id; ?>')">See Less</button>
                    </div>

                    <?php
                    $counter++; // Tăng biến đếm
                    ?>
                    <script>
                        function showMore(postId) {
                            // Hiển thị nội dung bổ sung khi nhấp vào nút "See More"
                            document.getElementById("additionalContent_" + postId).style.display = "block";
                            // Ẩn nút "See More"
                            document.getElementById("initialContent_" + postId).style.display = "none";
                        }

                        function showLess(postId) {
                            // Ẩn nội dung bổ sung khi nhấp vào nút "See Less"
                            document.getElementById("additionalContent_" + postId).style.display = "none";
                            // Hiển thị nút "See More"
                            document.getElementById("initialContent_" + postId).style.display = "block";
                        }
                    </script>
                </div>
            </div>
            <div style="padding: 20px 20px 20px 20px; max-width: 50%; min-width: 600px;">
                <!-- ### là file xử lý lấy dữ liệu từ form lưu vào database -->
                <form style="max-width: 100%;" action="###" method="post">
                    <div class="form-group icon-input mb-3">
                        <label for="full-name" class="font-xsss fw-60">Họ và tên</label>
                        <input type="text" id="full-name" name="full-name" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-60" placeholder="Họ và tên" readonly>
                    </div>
                    <div class="form-group icon-input mb-3">
                        <label for="student-id" class="font-xsss fw-60">Mã sinh viên</label>
                        <input type="text" id="student-id" name="student-id" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-60" placeholder="Mã sinh viên" readonly>
                    </div>
                    <div class="form-group icon-input mb-3">
                        <label for="university" class="font-xsss fw-60">Trường</label>
                        <input type="text" id="university" name="university" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-60" placeholder="Trường" readonly>
                    </div>
                    <div class="form-group icon-input mb-3">
                        <label for="faculty" class="font-xsss fw-60">Khoa</label>
                        <input type="text" id="faculty" name="faculty" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Khoa" readonly>
                    </div>
                    <div class="form-group icon-input mb-1">
                        <label for="class" class="font-xsss fw-60">Lớp</label>
                        <input type="text" id="class" name="class" class="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Lớp" readonly>
                    </div>
                    <div class="form-group icon-input mb-1">
                        <label for="email" class="font-xsss fw-60">email</label>
                        <input type="text" id="email" name="email" class="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Email cua ban" required>
                    </div><div class="form-group icon-input mb-1">
                        <label for="phone_number" class="font-xsss fw-60">so dien thoai</label>
                        <input type="text" id="phone_number" name="phone_number" class="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="so dien thoai" required>
                    </div>
                    <div class="form-group icon-input mb-1">
                        <label for="wish" class="font-xsss fw-60">Mong muốn của bạn</label>
                        <input type="text" id="wish" name="wish" class="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Mong muốn của bạn" required>
                    </div>
                    <!-- khi ấn đăng ký thì dữ liệu đc lưu vào trong database -->
                    <button type="submit" name="submit" class="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0" style="margin-top: 20px">
                        Đăng ký
                    </button>

                </form>

            </div>
            
        </div>
        <!-- main content -->

       

    <script src="js/plugin.js"></script>
    <script src="js/lightbox.js"></script>
    <script src="js/scripts.js"></script>
    <script src="js/jquery.easypiechart.min.js"></script> 
    <script>
        $('.chart').easyPieChart({
            easing: 'easeOutElastic',
            delay: 3000,
            barColor: '#3498db',
            trackColor: '#aaa',
            scaleColor: false,
            lineWidth: 5,
            trackWidth: 5,
            size: 50,
            lineCap: 'round',
            onStep: function(from, to, percent) {
                this.el.children[0].innerHTML = Math.round(percent);
            }
        });
    </script> 
    
</body>

</html>