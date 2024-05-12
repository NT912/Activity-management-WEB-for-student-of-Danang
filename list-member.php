<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Danh Sách Đăng Ký</title>

    <link rel="stylesheet" href="css/themify-icons.css">
    <link rel="stylesheet" href="css/feather.css">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="css/style.css">

</head>


<body class="color-theme-blue mont-font">

            <div class="preloader"></div>

            <div class="main-wrapper">

                <!-- navigation top-->
                <div class="nav-header bg-white shadow-xs border-0">
                    <div class="nav-top">
                        <a href="index.html"> <img src="./images/LOGO.png" alt="Logopage" class="logo-img"> </a> 
                    </div>
                    
                    <form action="#" class="float-left header-search">
                        <div class="form-group mb-0 icon-input">
                            <i class="feather-search font-sm text-grey-400"></i>
                            <input type="text" placeholder="Tìm kiếm ..." class="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg">
                        </div>
                    </form>
                    <a href="#" class="p-2 text-center ms-auto menu-icon" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown"><span class="dot-count bg-warning"></span><i class="feather-bell font-xl text-current"></i></a>
                    <div class="dropdown-menu dropdown-menu-end p-4 rounded-3 border-0 shadow-lg" aria-labelledby="dropdownMenu3">
                        
                        <h4 class="fw-700 font-xss mb-4">Thông Báo</h4>
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
                <!-- end navigation left -->

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
                    <div id="initialContent_<?php echo $post_id; ?>">
                    
                        <button class="see-more-btn" onclick="showMore('<?php echo $post_id; ?>')">See More</button>
                    </div>

                    <div id="additionalContent_<?php echo $post_id; ?>" style="display: none;">
                        <!-- mo ta cua hoat dong -->
                        <?php echo $HD_mota; ?>
                        <br>
                        <button class="see-less-btn" onclick="showLess('<?php echo $post_id; ?>')">See Less</button>
                    </div>

                    <?php
                    $counter++; // Tăng biến đếm
                    ?>
                    <script>
                        function showMore(postId) {
                            document.getElementById("additionalContent_" + postId).style.display = "block";
                            document.getElementById("initialContent_" + postId).style.display = "none";
                        }

                        function showLess(postId) {
                            document.getElementById("additionalContent_" + postId).style.display = "none";
                            document.getElementById("initialContent_" + postId).style.display = "block";
                        }
                    </script>
                </div>
            </div>
            <div style="padding: 20px 0px 20px 0px; max-width: 95%; min-width: 600px;">
                <div class="middle-sidebar-left pe-0 ms-0 me-0" style="max-width: 100%;">
                    <div class="col-lg-12">
                            <div class="chat-wrapper w-100 position-relative scroll-bar bg-white theme-dark-bg">
                                <ul class="email-message">
                                    <li>
                                        <a href="" class="rounded-3 bg-lightblue theme-light-bg">
                                            
                                            <div class="email-user">
                                                <h6 class="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-700">Ho va ten</h6>
                                            </div>
                                            <div class="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                Ma sv
                                            </div>
                                            <div class="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                Khoa
                                            </div>
                                            <div class="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                Lop
                                            </div>
                                            <div class="email-text text-grey-500 fw-600 font-xssss">
                                                Email
                                            </div>
                                            <div class="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                So dien thoai
                                            </div>
                                            <div style="" class="text-grey-900 text-dark fw-600 font-xssss col-member-100">
                                                Xac nhan
                                            </div>
                                            <div class="text-grey-900 text-dark fw-600 font-xssss col-member-100">
                                                Diem danh
                                            </div>
                                            <div class="email-time text-grey-500 fw-600">12:48PM</div>
                                        </a>
                                    </li>
                                    <!-- Bat dau thong tin cu mot sinh vien -->
                                    <li>
                                        <a href="" class="rounded-3 bg-lightblue theme-light-bg">
                                            
                                            <div class="email-user">
                                                <!-- neu sinh vien huy dang ky thi la bg-warning, khong thi la bg-success -->
                                                <span class="btn-round-xss ms-0 me-2 <!-- -->"></span> 
                                                <h6 class="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-700">
                                                    <!--ten sinh vien-->
                                                </h6>
                                            </div>
                                            <div class="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                <!--ma sinh vien-->
                                            </div>
                                            <div class="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                <!--ten khoa viet tat -->
                                            </div>
                                            <div class="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                <!--lop-->
                                            </div>
                                            <div class="email-text text-grey-500 fw-600 font-xssss">
                                                <!--email-->
                                            </div>
                                            <div class="email-subject text-grey-900 text-dark fw-600 font-xssss">
                                                <!--so dien thoai-->
                                            </div>
                                            <div class="col-member-100">
                                                <!--tich vo la cho phep sinh vien tham gia, cap nhat tren database-->
                                                <input class="form-check-input" type="checkbox" id="blankCheckbox1" value="option1" aria-label="">
                                            </div>
                                            <div class="col-member-100">
                                                <!--tich vo la sinh vien da diem danh, cap nhat tren database-->
                                                <input class="form-check-input" type="checkbox" id="blankCheckbox1" value="option1" aria-label="">
                                            </div>
                                            <div class="email-time text-grey-500 fw-600">12:48PM</div>
                                        </a>
                                    </li>
                                    <!-- ket thuc thong tin cu mot sinh vien -->

                    </div>
                </div>
            </div>

            
        </div>

        <style>
            .form-check .form-check-input {
            float: left;
            margin-left: 1em;
            width: 1.5em;
            height: 1.5em;
            }
           

        </style>
        <!-- main content -->

       
    </div> 


    <script src="js/plugin.js"></script>
    <script src="js/scripts.js"></script>
    
</body>

</html>
