<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Đăng nhập</title>

    <link rel="stylesheet" href="css/themify-icons.css">
    <link rel="stylesheet" href="css/feather.css">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="css/style.css">



</head>

<body class="color-theme-blue">

    <div class="preloader"></div>

    <div class="main-wrap">

        <div class="nav-header bg-transparent shadow-none border-0">
            <div class="nav-top w-100">
                <a href="index.php"> <img src="./images/LOGO.png" alt="Logopage" class="logo-img"> </a>
                <a href="login.php" class="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"  data-bs-toggle="modal" data-bs-target="#Modallogin">Đăng nhập</a>
                <a href="dangkyvoivaitro.php" class="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"  data-bs-toggle="modal" data-bs-target="#Modalregister">Đăng ký</a>

            </div>
        </div>

        <div class="row">
            <div class="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat" style="background-image: url(images/login-bg.jpg);"></div>
            <div class="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                <div class="card shadow-none border-0 ms-auto me-auto login-card">
                    <div class="card-body rounded-0 text-left">
                        <h2 class="fw-700 display1-size display2-md-size mb-3">Đăng Nhập Tài Khoản</h2>
                        <form>

                            <div class="form-group icon-input mb-3">
                                <i class="font-sm ti-email text-grey-500 pe-0"></i>
                                <input type="text" class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="vd:1232000126" require>
                            </div>
                            <div class="form-group icon-input mb-1">
                                <input type="Password" class="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Password" require>
                                <i class="font-sm ti-lock text-grey-500 pe-0"></i>
                                </button>
                            </div>
                            <div class="form-check text-left mb-3">
                                <input type="checkbox" class="form-check-input mt-2" id="exampleCheck5">
                                <label class="form-check-label font-xsss text-grey-500" for="exampleCheck5">Ghi nhớ đăng nhập</label>
                                <a href="forgot.html" class="fw-600 font-xsss text-grey-700 mt-1 float-right">Quên mật khẩu</a>
                            </div>
                        </form>

                        <div class="col-sm-12 p-0 text-left">
                            <div class="form-group mb-1"><a href="#" class="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Đăng nhập</a></div>
                            <h6 class="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">Chưa có tài khoản <a href="register.html" class="fw-700 ms-1">Đăng ký</a></h6>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="js/plugin.js"></script>
    <script src="js/scripts.js"></script>

</body>

</html>