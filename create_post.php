<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Popup</title>
    <style>
        /* CSS để ẩn form và thiết lập vị trí trung tâm */
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
        }

        #popupForm {
            display: block; /* Hiển thị form ngay khi trang được mở ra */
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        #popupForm form {
            max-width: 400px;
            margin: 0 auto;
        }

        #popupForm label {
            display: block;
            margin-bottom: 5px;
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
<body>

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

        <label for="dateStart">Date Start:</label>
        <input type="date" id="dateStart" name="dateStart">

        <label for="dateEnd">Date End:</label>
        <input type="date" id="dateEnd" name="dateEnd">

        <label for="dateStartReg">Date Start Register:</label>
        <input type="date" id="dateStartReg" name="dateStartReg">

        <label for="dateEndReg">Date End Register:</label>
        <input type="date" id="dateEndReg" name="dateEndReg">

        <label for="activityContent">Activity Content:</label>
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
