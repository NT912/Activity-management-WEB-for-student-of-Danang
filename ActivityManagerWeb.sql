-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 07, 2024 at 02:22 AM
-- Server version: 8.0.36-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ActivityManagerWeb`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int UNSIGNED NOT NULL,
  `organization_id` int UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `registration_start_date` datetime NOT NULL,
  `registration_end_date` datetime NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maxnumber` int NOT NULL DEFAULT '200',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Confirm` enum('yet','reject','confirm','update','done') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'yet',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `organization_id`, `name`, `description`, `start_date`, `end_date`, `registration_start_date`, `registration_end_date`, `location`, `maxnumber`, `image`, `Confirm`, `created_at`, `updated_at`, `comment`) VALUES
(19, 137, '[Synopsys Việt Nam hợp tác với khoa FAST tổ chức hội thảo định hướng nghề nghiệp]', '🔥Sự kiện hot trong tuần không thể bỏ lỡ “Hội thảo Định hướng về ngành Thiết Kế Vi Mạch – How to be an IC Design Engineer?”\r<br>☘ Nội dung chia sẻ:\r<br>- Sinh viên cần cân nhắc điều gì trước khi chọn chuyên ngành?\r<br>- Kỹ sư IC? Học gì? Cần chuẩn bị những gì?\r<br>- Thiết kế vi mạch? Liệu ngành này sẽ là tương lai của thế giới?\r<br>👨‍💼 Diễn giả: \r<br>- Ông Khánh Hoàng: R&D Engineering, Manager \r<br>- Anh Hưng Nguyễn: R&D Engineering, Sr Engineer (Cựu sinh viên Khoa FAST) \r<br>- Anh Phú Trần: Analog Design, Sr Engineer (Cựu sinh viên Khoa FAST) \r<br>📅Thời gian: 8h – 10h sáng thứ 6 ngày 17/05/2024 \r<br>🔗Link đăng ký tham gia:\r<br>https://docs.google.com/.../1FAIpQLSc9Is9cJOYHay.../viewform\r<br>💥Hãy cùng khám phá thế giới của những con đường sự nghiệp trong IC Design đang chờ đón bạn!\r<br>#SNPS #FAST #SARA #Semiconductor #ICDesign\r<br>#Tuyensinh2024', '2024-06-21 00:00:00', '2024-06-21 23:59:59', '2024-06-07 00:00:00', '2024-06-19 23:59:59', 'Phòng S02.06 tòa nhà Smart building', 100, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/poster%2F440858719_965803325555014_580335483260212816_n.jpg%201717616208678?alt=media&token=b8c7e666-742f-4f5e-ac3e-9987f8cbcc08', 'yet', '2024-06-06 02:36:49', NULL, NULL),
(20, 135, '🔥 ONE DAY LEFT – WORKSHOP “PCB DESIGN” 2024 🔥 ', '🔉 Bật mí cho các bạn rằng chỉ còn chưa đầy 24h nữa thôi, WORKSHOP “PCB DESIGN” sẽ chính thức được diễn ra 👉 Các bạn hãy nhanh chóng thu xếp thời gian để đến với chúng mình nhé.  \r<br>🌻 Sự có mặt của các bạn sẽ góp phần làm nên thành công cho Workshop năm nay. \r<br>✨ Hứa hẹn sẽ mang đến những hoạt động thú vị và là cơ hội cho các bạn sinh viên nhận những phần quà độc đáo từ BTC. \r<br>-------------------------------------- \r<br>> > > Thông tin Workshop: \r<br>Thời gian: 8h -11h, Thứ bảy (11/05/2024). \r<br> Địa điểm: Khu C, phòng C303, tại trường ĐH Bách Khoa - ĐHĐN.\r<br>📍 Link đăng ký: https://g2.by/workshop. \r<br>-------------------------------------- \r<br>Thông tin liên hệ: \r<br>Email: fast.youthunion@gmail.com \r<br>Sđt: 0905801008 (PBT: Nguyễn Văn Trung) \r<br>#FAST \r<br>#WORKSHOP \r<br>#PCB_DESIGN', '2024-06-21 00:00:00', '2024-06-21 23:59:59', '2024-06-07 00:00:00', '2024-06-15 23:59:59', 'Khu C, phòng C303, tại trường ĐH Bách Khoa - ĐHĐN.', 100, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/poster%2F440403204_922237769696669_8011997596113570078_n.jpg%201717616852444?alt=media&token=948a5a23-8357-40c1-9596-5ccc9e126b62', 'yet', '2024-06-06 02:47:33', NULL, NULL),
(21, 136, '💥[COMING SOON]💥- VÒNG CHUNG KẾT “TỰ HÀO BẢN SẮC BÁCH KHOA 2024”- AI SẼ TRỞ THÀNH “ĐẠI SỨ BẢN SẮC DUT 2024”?', '____________________________________________\r\n<br>🔥Trải qua từng vòng thi, vòng tuyển chọn hết sức gắt gao và căng thẳng. Cuối cùng, đêm chung kết “Tự hào bản sắc Bách Khoa 2024” sẽ được diễn ra với sự tranh tài của Top 26  thí sinh xuất sắc đến từ 13 LCĐ khoa. \r\n<br>🔥 Mỗi đội thi đều mang một thế mạnh, khả năng riêng để thể hiện phần thi của mình trong các vòng thi hết sức khắc nghiệt. Hứa hẹn sẽ là một đêm chung kết khó quên và đầy ắp cảm xúc không chỉ với các thí sinh mà còn là một phần kỉ niệm đẹp trong mỗi LCĐ khoa tham gia.\r\n<br>❤️BTC xin gửi lời cảm ơn tới các đội thi đã tham gia và cống hiến hết mình xuyên suốt cuộc thi.Chúc cho cuộc thi nói chung và các thí sinh nói riêng sẽ hòa mình trong đêm chung kết để đem lại những “Bản sắc” giá trị của các LCĐ của mình.\r\n<br>—-----------------------------------------------------------------------\r\n<br>✨✨Các DUT-er ơi, còn chần chờ gì nữa mà không mau cùng bạn bè có mặt tại đêm chung kết để cổ vũ cho LCĐ khoa của mình? Tham gia ngay thôi!\r\n<br>⏰Thời gian: 17h45 ngày 19/05/2024.\r\n<br>📍Địa điểm: Hội trường F, Trường đại học Bách Khoa, Đại học Đà Nẵng.\r\n<br>—-----------------------------------------------------------------------', '2024-06-27 00:00:00', '2024-06-28 00:00:00', '2024-06-03 00:00:00', '2024-06-19 00:00:00', 'Phòng A211, 54 Nguyễn Lương Bằng, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng', 1000, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/poster%2F442503378_432202516118330_4963538240730995819_n.jpg%201717617105561?alt=media&token=f04f0ed6-0bd6-460b-8108-e7b66744ecef', 'done', '2024-06-06 02:51:46', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `activities_backup`
--

CREATE TABLE `activities_backup` (
  `id` int UNSIGNED NOT NULL,
  `activity_id` int UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `registration_start_date` datetime NOT NULL,
  `registration_end_date` datetime NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maxnumber` int NOT NULL DEFAULT '200',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `confirm` enum('yet','reject','confirm','update','done') NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `activities_backup`
--

INSERT INTO `activities_backup` (`id`, `activity_id`, `name`, `description`, `start_date`, `end_date`, `registration_start_date`, `registration_end_date`, `location`, `maxnumber`, `image`, `confirm`, `updated_at`) VALUES
(1, 21, '💥[COMING SOON]💥- VÒNG CHUNG KẾT “TỰ HÀO BẢN SẮC BÁCH KHOA 2024”- AI SẼ TRỞ THÀNH “ĐẠI SỨ BẢN SẮC DUT 2024”?', '____________________________________________\r\n<br>🔥Trải qua từng vòng thi, vòng tuyển chọn hết sức gắt gao và căng thẳng. Cuối cùng, đêm chung kết “Tự hào bản sắc Bách Khoa 2024” sẽ được diễn ra với sự tranh tài của Top 26  thí sinh xuất sắc đến từ 13 LCĐ khoa. \r\n<br>🔥 Mỗi đội thi đều mang một thế mạnh, khả năng riêng để thể hiện phần thi của mình trong các vòng thi hết sức khắc nghiệt. Hứa hẹn sẽ là một đêm chung kết khó quên và đầy ắp cảm xúc không chỉ với các thí sinh mà còn là một phần kỉ niệm đẹp trong mỗi LCĐ khoa tham gia.\r\n<br>❤️BTC xin gửi lời cảm ơn tới các đội thi đã tham gia và cống hiến hết mình xuyên suốt cuộc thi.Chúc cho cuộc thi nói chung và các thí sinh nói riêng sẽ hòa mình trong đêm chung kết để đem lại những “Bản sắc” giá trị của các LCĐ của mình.\r\n<br>—-----------------------------------------------------------------------\r\n<br>✨✨Các DUT-er ơi, còn chần chờ gì nữa mà không mau cùng bạn bè có mặt tại đêm chung kết để cổ vũ cho LCĐ khoa của mình? Tham gia ngay thôi!\r\n<br>⏰Thời gian: 17h45 ngày 19/05/2024.\r\n<br>📍Địa điểm: Hội trường F, Trường đại học Bách Khoa, Đại học Đà Nẵng.\r\n<br>—-----------------------------------------------------------------------', '2024-06-28 00:00:00', '2024-06-28 00:00:00', '2024-06-04 00:00:00', '2024-06-20 00:00:00', 'Phòng A211, 54 Nguyễn Lương Bằng, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng', 1000, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/poster%2F442503378_432202516118330_4963538240730995819_n.jpg%201717617105561?alt=media&token=f04f0ed6-0bd6-460b-8108-e7b66744ecef', 'yet', NULL),
(2, 21, '💥[COMING SOON]💥- VÒNG CHUNG KẾT “TỰ HÀO BẢN SẮC BÁCH KHOA 2024”- AI SẼ TRỞ THÀNH “ĐẠI SỨ BẢN SẮC DUT 2024”?', '____________________________________________\r\n<br>🔥Trải qua từng vòng thi, vòng tuyển chọn hết sức gắt gao và căng thẳng. Cuối cùng, đêm chung kết “Tự hào bản sắc Bách Khoa 2024” sẽ được diễn ra với sự tranh tài của Top 26  thí sinh xuất sắc đến từ 13 LCĐ khoa. \r\n<br>🔥 Mỗi đội thi đều mang một thế mạnh, khả năng riêng để thể hiện phần thi của mình trong các vòng thi hết sức khắc nghiệt. Hứa hẹn sẽ là một đêm chung kết khó quên và đầy ắp cảm xúc không chỉ với các thí sinh mà còn là một phần kỉ niệm đẹp trong mỗi LCĐ khoa tham gia.\r\n<br>❤️BTC xin gửi lời cảm ơn tới các đội thi đã tham gia và cống hiến hết mình xuyên suốt cuộc thi.Chúc cho cuộc thi nói chung và các thí sinh nói riêng sẽ hòa mình trong đêm chung kết để đem lại những “Bản sắc” giá trị của các LCĐ của mình.\r\n<br>—-----------------------------------------------------------------------\r\n<br>✨✨Các DUT-er ơi, còn chần chờ gì nữa mà không mau cùng bạn bè có mặt tại đêm chung kết để cổ vũ cho LCĐ khoa của mình? Tham gia ngay thôi!\r\n<br>⏰Thời gian: 17h45 ngày 19/05/2024.\r\n<br>📍Địa điểm: Hội trường F, Trường đại học Bách Khoa, Đại học Đà Nẵng.\r\n<br>—-----------------------------------------------------------------------', '2024-06-28 00:00:00', '2024-06-28 00:00:00', '2024-06-04 00:00:00', '2024-06-20 00:00:00', 'Phòng A211, 54 Nguyễn Lương Bằng, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng', 1000, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/poster%2F442503378_432202516118330_4963538240730995819_n.jpg%201717617105561?alt=media&token=f04f0ed6-0bd6-460b-8108-e7b66744ecef', 'reject', '2024-06-06 21:17:14');

-- --------------------------------------------------------

--
-- Table structure for table `administrators`
--

CREATE TABLE `administrators` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `avt` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fadmin.jpg?alt=media&token=3e03ae3b-07f7-4c73-8989-ce9ebf2887ce'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `administrators`
--

INSERT INTO `administrators` (`id`, `user_id`, `email`, `phone`, `created_at`, `updated_at`, `avt`) VALUES
(1, 144, 'phanduclam02@gmail.com', '0932536332', '2024-06-06 14:13:56', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fadmin.jpg?alt=media&token=3e03ae3b-07f7-4c73-8989-ce9ebf2887ce');

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `id` int UNSIGNED NOT NULL,
  `activity_id` int UNSIGNED NOT NULL,
  `student_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `idFaculty` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `sort_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`idFaculty`, `name`, `sort_name`) VALUES
(1, 'Cơ khí', NULL),
(2, 'Cơ khí Giao thông', NULL),
(3, 'Công nghệ Nhiệt – Điện lanh', NULL),
(4, 'Công nghệ Thông tin', NULL),
(5, 'Điện', NULL),
(6, 'Điện tử - Viễn thông', NULL),
(7, 'Hóa', NULL),
(8, 'Sư phạm Kỹ thuật', NULL),
(9, 'Xây dựng Cầu Đường', NULL),
(10, 'Xây dựng Dân dụng và Công nghiệp', NULL),
(11, 'Xây dựng Thủy lợi – Thủy điện', NULL),
(12, 'Quản lý Dự án', NULL),
(13, 'Môi trường', NULL),
(14, 'Kiến Trúc', NULL),
(15, 'Tu dong hoa', NULL),
(16, 'Khoa hoc Cong nghe Tien tien', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `user_id` int UNSIGNED NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`user_id`, `description`, `address`, `email`, `phone`, `avt`, `created_at`, `updated_at`) VALUES
(135, NULL, NULL, 'fast@gmail.com', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03', '2024-06-06 02:21:46', NULL),
(136, NULL, NULL, 'hoa@gmail.com', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03', '2024-06-06 02:22:09', NULL),
(137, NULL, NULL, 'hsv@gmail.com', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03', '2024-06-06 02:22:25', NULL),
(138, NULL, NULL, 'doantruong@gmail.com', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03', '2024-06-06 02:22:50', NULL),
(141, NULL, NULL, 'bkd@gmail.com', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03', '2024-06-06 12:58:41', NULL),
(145, NULL, NULL, 'ctxh@gmail.com', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03', '2024-06-06 14:18:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `id` int UNSIGNED NOT NULL,
  `activity_id` int UNSIGNED NOT NULL,
  `student_id` int UNSIGNED NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone_number` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `isComfirm` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `isAttendance` tinyint(1) NOT NULL DEFAULT '0',
  `wish` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`id`, `activity_id`, `student_id`, `email`, `phone_number`, `isComfirm`, `created_at`, `isAttendance`, `wish`) VALUES
(16, 21, 139, 'phanduclam02@gmail.com', '0932536332', 0, '2024-06-06 14:45:21', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `saved`
--

CREATE TABLE `saved` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `activity_id` int UNSIGNED NOT NULL,
  `timeCreate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `saved`
--

INSERT INTO `saved` (`id`, `user_id`, `activity_id`, `timeCreate`) VALUES
(1, 31, 14, '2024-06-04 19:14:26'),
(2, 25, 14, '2024-06-04 19:40:16');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `session` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `expires` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `session`, `expires`) VALUES
('hBoQz9Mz8zztKxTlvtlLewV6vL52xweK', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-06T20:20:28.204Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}', 1717705228);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `masv` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `class` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `faculty` int DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`masv`, `user_id`, `class`, `email`, `faculty`, `phone`, `avt`, `created_at`, `updated_at`) VALUES
('123200006', 139, '20PFIEV2', 'phanduclam02@gmail.com', 16, '0932536332', 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2F846280899168e1abab5a6cd0d6e03dcf.jpg%201717659967373?alt=media&token=e49bf71c-4474-414c-8bce-ecee9c766c90', '2024-06-06 02:37:42', NULL),
('1232000100', 100, '20PFIEV3', NULL, 5, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000101', 101, '20PFIEV3', NULL, 6, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000102', 102, '20PFIEV3', NULL, 7, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000103', 103, '20PFIEV3', NULL, 8, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000104', 104, '20PFIEV3', NULL, 9, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000105', 105, '20PFIEV3', NULL, 10, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000106', 106, '20PFIEV3', NULL, 11, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000107', 107, '20PFIEV3', NULL, 12, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000108', 108, '20PFIEV3', NULL, 13, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000109', 109, '20PFIEV3', NULL, 14, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000110', 110, '20PFIEV3', NULL, 15, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000111', 111, '20PFIEV3', NULL, 16, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000112', 112, '20PFIEV3', NULL, 1, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000113', 113, '20PFIEV3', NULL, 2, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000114', 114, '20PFIEV3', NULL, 3, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000115', 115, '20PFIEV3', NULL, 4, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000116', 116, '20PFIEV3', NULL, 5, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000117', 117, '20PFIEV3', NULL, 6, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000118', 118, '20PFIEV3', NULL, 7, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000119', 119, '20PFIEV3', NULL, 8, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000120', 120, '20PFIEV3', NULL, 9, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000121', 121, '20PFIEV3', NULL, 10, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000122', 122, '20PFIEV3', NULL, 11, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000123', 123, '20PFIEV3', NULL, 12, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000124', 124, '20PFIEV3', NULL, 13, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000125', 125, '20PFIEV3', NULL, 14, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000126', 126, '20PFIEV3', NULL, 15, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000127', 127, '20PFIEV3', NULL, 16, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000128', 128, '20PFIEV3', NULL, 1, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000129', 129, '20PFIEV3', NULL, 2, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000130', 130, '20PFIEV3', NULL, 3, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000131', 131, '20PFIEV3', NULL, 4, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000132', 132, '20PFIEV3', NULL, 5, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000133', 133, '20PFIEV3', NULL, 6, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('1232000134', 134, '20PFIEV3', NULL, 7, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200035', 35, '20PFIEV3', NULL, 4, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200036', 36, '20PFIEV3', NULL, 5, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200037', 37, '20PFIEV3', NULL, 6, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200038', 38, '20PFIEV3', NULL, 7, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200039', 39, '20PFIEV3', NULL, 8, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200040', 40, '20PFIEV3', NULL, 9, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200041', 41, '20PFIEV3', NULL, 10, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200042', 42, '20PFIEV3', NULL, 11, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200043', 43, '20PFIEV3', NULL, 12, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200044', 44, '20PFIEV3', NULL, 13, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200045', 45, '20PFIEV3', NULL, 14, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200046', 46, '20PFIEV3', NULL, 15, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200047', 47, '20PFIEV3', NULL, 16, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200048', 48, '20PFIEV3', NULL, 1, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200049', 49, '20PFIEV3', NULL, 2, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200050', 50, '20PFIEV3', NULL, 3, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200051', 51, '20PFIEV3', NULL, 4, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200052', 52, '20PFIEV3', NULL, 5, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200053', 53, '20PFIEV3', NULL, 6, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200054', 54, '20PFIEV3', NULL, 7, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200055', 55, '20PFIEV3', NULL, 8, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200056', 56, '20PFIEV3', NULL, 9, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200057', 57, '20PFIEV3', NULL, 10, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200058', 58, '20PFIEV3', NULL, 11, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200059', 59, '20PFIEV3', NULL, 12, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200060', 60, '20PFIEV3', NULL, 13, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200061', 61, '20PFIEV3', NULL, 14, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200062', 62, '20PFIEV3', NULL, 15, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200063', 63, '20PFIEV3', NULL, 16, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200064', 64, '20PFIEV3', NULL, 1, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200065', 65, '20PFIEV3', NULL, 2, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200066', 66, '20PFIEV3', NULL, 3, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200067', 67, '20PFIEV3', NULL, 4, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200068', 68, '20PFIEV3', NULL, 5, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200069', 69, '20PFIEV3', NULL, 6, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200070', 70, '20PFIEV3', NULL, 7, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200071', 71, '20PFIEV3', NULL, 8, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200072', 72, '20PFIEV3', NULL, 9, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200073', 73, '20PFIEV3', NULL, 10, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200074', 74, '20PFIEV3', NULL, 11, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200075', 75, '20PFIEV3', NULL, 12, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200076', 76, '20PFIEV3', NULL, 13, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200077', 77, '20PFIEV3', NULL, 14, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200078', 78, '20PFIEV3', NULL, 15, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200079', 79, '20PFIEV3', NULL, 16, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200080', 80, '20PFIEV3', NULL, 1, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200081', 81, '20PFIEV3', NULL, 2, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200082', 82, '20PFIEV3', NULL, 3, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200083', 83, '20PFIEV3', NULL, 4, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200084', 84, '20PFIEV3', NULL, 5, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200085', 85, '20PFIEV3', NULL, 6, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200086', 86, '20PFIEV3', NULL, 7, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200087', 87, '20PFIEV3', NULL, 8, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200088', 88, '20PFIEV3', NULL, 9, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200089', 89, '20PFIEV3', NULL, 10, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200090', 90, '20PFIEV3', NULL, 11, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200091', 91, '20PFIEV3', NULL, 12, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200092', 92, '20PFIEV3', NULL, 13, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200093', 93, '20PFIEV3', NULL, 14, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200094', 94, '20PFIEV3', NULL, 15, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200095', 95, '20PFIEV3', NULL, 16, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200096', 96, '20PFIEV3', NULL, 1, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200097', 97, '20PFIEV3', NULL, 2, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200098', 98, '20PFIEV3', NULL, 3, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200099', 99, '20PFIEV3', NULL, 4, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
('123200126', 140, '20PFIEV3', NULL, 6, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 12:57:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `hashed_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `hashed_password`, `role`, `created_at`, `updated_at`) VALUES
(35, 'Nguyen Van A', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(36, 'Nguyen Van B', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(37, 'Nguyen Van C', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(38, 'Nguyen Van D', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(39, 'Nguyen Van E', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(40, 'Nguyen Van F', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(41, 'Nguyen Van G', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(42, 'Nguyen Van H', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(43, 'Nguyen Van I', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(44, 'Nguyen Van J', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(45, 'Nguyen Van K', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(46, 'Nguyen Van L', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(47, 'Nguyen Van M', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(48, 'Nguyen Van N', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(49, 'Nguyen Van O', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(50, 'Nguyen Van P', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(51, 'Nguyen Van Q', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(52, 'Nguyen Van R', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(53, 'Nguyen Van S', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(54, 'Nguyen Van T', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(55, 'Nguyen Van U', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(56, 'Nguyen Van V', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(57, 'Nguyen Van W', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(58, 'Nguyen Van X', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(59, 'Nguyen Van Y', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(60, 'Nguyen Van Z', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(61, 'Nguyen Van A', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(62, 'Nguyen Van B', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(63, 'Nguyen Van C', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(64, 'Nguyen Van D', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(65, 'Nguyen Van E', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(66, 'Nguyen Van F', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(67, 'Nguyen Van G', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(68, 'Nguyen Van H', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(69, 'Nguyen Van I', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(70, 'Nguyen Van J', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(71, 'Nguyen Van K', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(72, 'Nguyen Van L', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(73, 'Nguyen Van M', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(74, 'Nguyen Van N', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(75, 'Nguyen Van O', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(76, 'Nguyen Van P', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(77, 'Nguyen Van Q', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(78, 'Nguyen Van R', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(79, 'Nguyen Van S', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(80, 'Nguyen Van T', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(81, 'Nguyen Van U', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(82, 'Nguyen Van V', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(83, 'Nguyen Van W', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(84, 'Nguyen Van X', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(85, 'Nguyen Van Y', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(86, 'Nguyen Van Z', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(87, 'Nguyen Van A', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(88, 'Nguyen Van B', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(89, 'Nguyen Van C', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(90, 'Nguyen Van D', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(91, 'Nguyen Van E', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(92, 'Nguyen Van F', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(93, 'Nguyen Van G', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(94, 'Nguyen Van H', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(95, 'Nguyen Van I', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(96, 'Nguyen Van J', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(97, 'Nguyen Van K', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(98, 'Nguyen Van L', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(99, 'Nguyen Van M', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(100, 'Nguyen Van N', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(101, 'Nguyen Van O', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(102, 'Nguyen Van P', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(103, 'Nguyen Van Q', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(104, 'Nguyen Van R', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(105, 'Nguyen Van S', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(106, 'Nguyen Van T', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(107, 'Nguyen Van U', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(108, 'Nguyen Van V', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(109, 'Nguyen Van W', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(110, 'Nguyen Van X', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(111, 'Nguyen Van Y', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(112, 'Nguyen Van Z', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(113, 'Nguyen Van A', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(114, 'Nguyen Van B', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(115, 'Nguyen Van C', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(116, 'Nguyen Van D', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(117, 'Nguyen Van E', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(118, 'Nguyen Van F', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(119, 'Nguyen Van G', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(120, 'Nguyen Van H', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(121, 'Nguyen Van I', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(122, 'Nguyen Van J', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(123, 'Nguyen Van K', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(124, 'Nguyen Van L', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(125, 'Nguyen Van M', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(126, 'Nguyen Van N', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(127, 'Nguyen Van O', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(128, 'Nguyen Van P', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(129, 'Nguyen Van Q', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(130, 'Nguyen Van R', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(131, 'Nguyen Van S', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(132, 'Nguyen Van T', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(133, 'Nguyen Van U', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(134, 'Nguyen Van V', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(135, 'Lien Chi Doan Khoa Cong Nghe Tien Tien', '698d51a19d8a121ce581499d7b701668', 'organization', '2024-06-06 02:21:46', NULL),
(136, 'Lien Chi Doan Khoa Hoa', '698d51a19d8a121ce581499d7b701668', 'organization', '2024-06-06 02:22:09', NULL),
(137, 'Hoi SInh Vien', '698d51a19d8a121ce581499d7b701668', 'organization', '2024-06-06 02:22:25', NULL),
(138, 'Doan Truong', '698d51a19d8a121ce581499d7b701668', 'organization', '2024-06-06 02:22:49', NULL),
(139, 'Phan Duc Lam', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:37:42', NULL),
(140, 'Vo Van Chi Thuan', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 12:57:55', NULL),
(141, 'BK Dancing', '698d51a19d8a121ce581499d7b701668', 'organization', '2024-06-06 12:58:41', NULL),
(144, 'Phan Duc Lam', '698d51a19d8a121ce581499d7b701668', 'admin', '2024-06-06 14:13:56', NULL),
(145, 'Doi Cong Tac Xa Hoi', '698d51a19d8a121ce581499d7b701668', 'organization', '2024-06-06 14:18:25', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_activity_organization` (`organization_id`);

--
-- Indexes for table `activities_backup`
--
ALTER TABLE `activities_backup`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_activitybackup_activity` (`activity_id`);

--
-- Indexes for table `administrators`
--
ALTER TABLE `administrators`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`id`,`student_id`,`activity_id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`idFaculty`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`,`activity_id`,`student_id`),
  ADD KEY `fk_registration_activity` (`activity_id`),
  ADD KEY `fk_registration_student` (`student_id`);

--
-- Indexes for table `saved`
--
ALTER TABLE `saved`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`masv`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `fk_student_faculty` (`faculty`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `activities_backup`
--
ALTER TABLE `activities_backup`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `administrators`
--
ALTER TABLE `administrators`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `idFaculty` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `user_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `saved`
--
ALTER TABLE `saved`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `fk_activity_organization` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `activities_backup`
--
ALTER TABLE `activities_backup`
  ADD CONSTRAINT `fk_activitybackup_activity` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `administrators`
--
ALTER TABLE `administrators`
  ADD CONSTRAINT `fk_admin_usre` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `organizations`
--
ALTER TABLE `organizations`
  ADD CONSTRAINT `fk_activity_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `fk_registration_activity` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_registration_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `fk_student_faculty` FOREIGN KEY (`faculty`) REFERENCES `faculty` (`idFaculty`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_student_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
