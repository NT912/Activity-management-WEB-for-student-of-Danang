<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Đăng ký</title>
    <link rel="stylesheet" href="./css/dkhd.css">
    <link rel="stylesheet" href="./fonts/fontawesome-free-6.5.2-web/css/all.min.css">
    
</head>
<body>
    
    <div class="formdangky-item">
        <div class="formdk">
            
            
            <div class="avatar-dangky">
            <!-- Lấy ảnh user, khi ấn vào sẽ chuyển đến trang thông tin cá nhân của user, ### là link trang thông tin cá nhân-->
            <img src="###" alt="profile-picture" class="profile-picture"><a href="###"></a>
            
            <!-- Lấy tên user,khi ấn vào sẽ chuyển đến trang thông tin cá nhân của user,### là link trang thông tin cá nhân -->
            <span class="first-initial"><a href="###">###</a></span><br>
            <!-- Lất tên trường của user -->
            <span class="school-name">###</span>
            </div>
            
            <!--  file ###.php xử lý gửi dữ liệu trong form vào database  -->
            <form action="###" method="post" id="myForm">
       
            <input type="text" id="fullname" name="fullname" class ="fullname" placeholder="Họ và tên"><br>
        
            <input type="text" id="student_id" name="student_id" class = "MSV"placeholder= "Mã sinh viên"><br>
            <input type="text" id="School" name="School" class = "School"placeholder= "Trường"><br>
            <input type="text" id="Khoa" name="Khoa" class = "Khoa"placeholder= "Khoa"><br>
            <input type="text" id="class" name="class" class = "class"placeholder= "Lớp"><br>
            <div class="mycheckbox">
                <input type="checkbox" id="checkbox" name="checkbox" class="checkbox" >
            
                <label for="checkbox" class="label">Điều khoản và điều kiện</label>
                
            </div>
                <!-- Sau khi ấn đăng ký thì dữ liệu trong form sẽ được xử lý bằng file ###.php và sẽ được lưu vào database -->
                
            <button type="submit" name="register" class="register">ĐĂNG KÝ</button>
            <!-- Sau khi ấn thì sẽ thoát form và trở lại trang trước đó -->
            <button type="button" name="exit" class="exit" onclick="closeForm()">Thoát</button>
                
            </form>
            <script>
                function closeForm() {
                    if (confirm("Bạn có chắc muốn thoát?")) {
                        // Đóng form
                        window.history.back();
                    }
                }
                </script>
        </div>
        
</div>
</body>
</html>