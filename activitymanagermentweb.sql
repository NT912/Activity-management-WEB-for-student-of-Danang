-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2024 at 12:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `activitymanagermentweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int(10) UNSIGNED NOT NULL,
  `organization_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `registration_start_date` datetime NOT NULL,
  `registration_end_date` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `maxnumber` int(11) NOT NULL DEFAULT 200,
  `image` varchar(255) NOT NULL,
  `Confirm` enum('yet','reject','confirm','update','done') NOT NULL DEFAULT 'yet',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `organization_id`, `name`, `description`, `start_date`, `end_date`, `registration_start_date`, `registration_end_date`, `location`, `maxnumber`, `image`, `Confirm`, `created_at`, `updated_at`, `comment`) VALUES
(19, 137, '[Synopsys Việt Nam hợp tác với khoa FAST tổ chức hội thảo định hướng nghề nghiệp]', '🔥Sự kiện hot trong tuần không thể bỏ lỡ “Hội thảo Định hướng về ngành Thiết Kế Vi Mạch – How to be an IC Design Engineer?”\r<br>☘ Nội dung chia sẻ:\r<br>- Sinh viên cần cân nhắc điều gì trước khi chọn chuyên ngành?\r<br>- Kỹ sư IC? Học gì? Cần chuẩn bị những gì?\r<br>- Thiết kế vi mạch? Liệu ngành này sẽ là tương lai của thế giới?\r<br>👨‍💼 Diễn giả: \r<br>- Ông Khánh Hoàng: R&D Engineering, Manager \r<br>- Anh Hưng Nguyễn: R&D Engineering, Sr Engineer (Cựu sinh viên Khoa FAST) \r<br>- Anh Phú Trần: Analog Design, Sr Engineer (Cựu sinh viên Khoa FAST) \r<br>📅Thời gian: 8h – 10h sáng thứ 6 ngày 17/05/2024 \r<br>🔗Link đăng ký tham gia:\r<br>https://docs.google.com/.../1FAIpQLSc9Is9cJOYHay.../viewform\r<br>💥Hãy cùng khám phá thế giới của những con đường sự nghiệp trong IC Design đang chờ đón bạn!\r<br>#SNPS #FAST #SARA #Semiconductor #ICDesign\r<br>#Tuyensinh2024', '2024-06-21 00:00:00', '2024-06-21 23:59:59', '2024-06-07 00:00:00', '2024-06-19 23:59:59', 'Phòng S02.06 tòa nhà Smart building', 100, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/poster%2F440858719_965803325555014_580335483260212816_n.jpg%201717616208678?alt=media&token=b8c7e666-742f-4f5e-ac3e-9987f8cbcc08', 'done', '2024-06-06 02:36:49', NULL, NULL),
(20, 135, '🔥 ONE DAY LEFT – WORKSHOP “PCB DESIGN” 2024 🔥 ', '🔉 Bật mí cho các bạn rằng chỉ còn chưa đầy 24h nữa thôi, WORKSHOP “PCB DESIGN” sẽ chính thức được diễn ra 👉 Các bạn hãy nhanh chóng thu xếp thời gian để đến với chúng mình nhé.  \r<br>🌻 Sự có mặt của các bạn sẽ góp phần làm nên thành công cho Workshop năm nay. \r<br>✨ Hứa hẹn sẽ mang đến những hoạt động thú vị và là cơ hội cho các bạn sinh viên nhận những phần quà độc đáo từ BTC. \r<br>-------------------------------------- \r<br>> > > Thông tin Workshop: \r<br>Thời gian: 8h -11h, Thứ bảy (11/05/2024). \r<br> Địa điểm: Khu C, phòng C303, tại trường ĐH Bách Khoa - ĐHĐN.\r<br>📍 Link đăng ký: https://g2.by/workshop. \r<br>-------------------------------------- \r<br>Thông tin liên hệ: \r<br>Email: fast.youthunion@gmail.com \r<br>Sđt: 0905801008 (PBT: Nguyễn Văn Trung) \r<br>#FAST \r<br>#WORKSHOP \r<br>#PCB_DESIGN', '2024-06-21 00:00:00', '2024-06-21 23:59:59', '2024-06-07 00:00:00', '2024-06-15 23:59:59', 'Khu C, phòng C303, tại trường ĐH Bách Khoa - ĐHĐN.', 100, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/poster%2F440403204_922237769696669_8011997596113570078_n.jpg%201717616852444?alt=media&token=948a5a23-8357-40c1-9596-5ccc9e126b62', 'done', '2024-06-06 02:47:33', NULL, NULL),
(21, 136, '💥[COMING SOON]💥- VÒNG CHUNG KẾT “TỰ HÀO BẢN SẮC BÁCH KHOA 2024”- AI SẼ TRỞ THÀNH “ĐẠI SỨ BẢN SẮC DUT 2024”?', '____________________________________________\r<br>🔥Trải qua từng vòng thi, vòng tuyển chọn hết sức gắt gao và căng thẳng. Cuối cùng, đêm chung kết “Tự hào bản sắc Bách Khoa 2024” sẽ được diễn ra với sự tranh tài của Top 26  thí sinh xuất sắc đến từ 13 LCĐ khoa. \r<br>🔥 Mỗi đội thi đều mang một thế mạnh, khả năng riêng để thể hiện phần thi của mình trong các vòng thi hết sức khắc nghiệt. Hứa hẹn sẽ là một đêm chung kết khó quên và đầy ắp cảm xúc không chỉ với các thí sinh mà còn là một phần kỉ niệm đẹp trong mỗi LCĐ khoa tham gia.\r<br>❤️BTC xin gửi lời cảm ơn tới các đội thi đã tham gia và cống hiến hết mình xuyên suốt cuộc thi.Chúc cho cuộc thi nói chung và các thí sinh nói riêng sẽ hòa mình trong đêm chung kết để đem lại những “Bản sắc” giá trị của các LCĐ của mình.\r<br>—-----------------------------------------------------------------------\r<br>✨✨Các DUT-er ơi, còn chần chờ gì nữa mà không mau cùng bạn bè có mặt tại đêm chung kết để cổ vũ cho LCĐ khoa của mình? Tham gia ngay thôi!\r<br>⏰Thời gian: 17h45 ngày 19/05/2024.\r<br>📍Địa điểm: Hội trường F, Trường đại học Bách Khoa, Đại học Đà Nẵng.\r<br>—-----------------------------------------------------------------------', '2024-06-19 00:00:00', '2024-06-20 23:59:59', '2024-06-06 00:00:00', '2024-06-09 23:59:59', 'Phòng A211, 54 Nguyễn Lương Bằng, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng', 1000, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/poster%2F442503378_432202516118330_4963538240730995819_n.jpg%201717617105561?alt=media&token=f04f0ed6-0bd6-460b-8108-e7b66744ecef', 'done', '2024-06-06 02:51:46', NULL, NULL),
(23, 147, '[TIÊU CHÍ TÌNH NGUYỆN TỐT] 📣|ASEAN School Games 13| CHÍNH THỨC MỞ ĐƠN TUYỂN TÌNH NGUYỆN VIÊN ĐẠI HỘI THỂ THAO HỌC SINH ĐÔNG NAM Á LẦN THỨ 13 NĂM 2024📣', 'Đối tượng tham gia: Đoàn viên thanh niên, giáo viên, giảng viên, sinh viên có đủ sức khoẻ, sử dụng thành thạo tiếng Anh, ưu tiên có kinh nghiệm tham gia các hoạt động tình nguyện cho các sự kiện quốc tế.\r<br>______________________________\r<br>☄️Đại hội Thể thao học sinh Đông Nam Á (ASEAN School Games) là đại hội thể thao thường niên dành cho học sinh trung học trong Hiệp hội các quốc gia Đông Nam Á (ASEAN). Đại hội Thể thao học sinh Đông Nam Á lần thứ 13 diễn ra từ ngày 29/5 đến ngày 9/6 tại thành phố Đà Nẵng với sự tham dự của các vận động viên (VĐV), huấn luyện viên (HLV) đến từ 10 quốc gia gồm: Brunei, Campuchia, Indonesia, Lào, Malaysia, Philippines, Singapore, Thái Lan, Myanmar và Việt Nam.\r<br>👉Trở thành Tình nguyện viên (TNV) của sự kiện, các bạn sẽ có cơ hội làm việc trong môi trường chuyên nghiệp mang tầm cỡ quốc tế, góp phần thúc đẩy hình ảnh Thành phố Đà Nẵng và Việt Nam vươn ra xa Thế giới. Ngoài ra còn có những trải nghiệm ý nghĩa, hòa mình vào không khí sôi nổi, vui nhộn và những hoạt động thú khác chưa được bật mí.\r<br>⚡️QUYỀN LỢI KHI TRỞ THÀNH TÌNH NGUYỆN VIÊN:\r<br>📌Làm việc trong môi trường chuyên nghiệp.\r<br>📌Trải nghiệm tham gia tại một sự kiện thể thao quy mô quốc tế.\r<br>📌Nâng cao các kỹ năng mềm và khả năng ngoại ngữ.\r<br>📌Nhận áo polo, balo, mũ của TNV tham gia phục vụ sự kiện.\r<br>📌Hỗ trợ kinh phí ăn uống và làm nhiệm vụ trong những ngày diễn ra sự kiện.\r<br>📌Giấy Chứng Nhận sau khi hoàn thành công việc.', '2024-06-11 00:00:00', '2024-06-12 23:59:59', '2024-06-07 00:00:00', '2024-06-10 23:59:59', 'Thành phố Đà Nẵng.', 300, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/poster%2Fhd.jpg%201717667840847?alt=media&token=e2244ecf-57cd-4c9e-9778-3bfe0426dc6e', 'done', '2024-06-06 16:57:22', NULL, NULL),
(24, 148, '[ 🎶ĐÊM NHẠC GÂY QUỸ SAO MÙA HẠ 2024 - THANH ÂM RỰC RỠ🎤❤️🎆]', '🌸Khi những nốt nhạc kết hợp với lòng thương yêu, điều kỳ diệu xảy ra! 🌟\r<br>🔥💫Các bạn đã chuẩn bị chìm đắm trong không gian âm nhạc trong hè này chưa nào??? Một trong những đêm nhạc đặc biệt nhất của BKStar!! Đêm nhạc này không chỉ là nơi lan toả yêu thương từ trái tim của sức trẻ đến với những trẻ em/ học sinh có hoàn cảnh khó khăn nơi xa xôi, mà đây còn là nơi các “Ngôi sao” sẽ cùng cất tiếng ca cho kỷ niệm 10 năm thành lập CLB Tài năng Sinh viên BKStar!!! 🎉🎉🎉Hãy cùng nhau tạo nên những kỷ niệm đáng nhớ và lan tỏa tình yêu và sự chia sẻ. Hãy nắm tay nhau, cùng nhau hòa mình vào dòng chảy âm nhạc và khắc mãi những hình ảnh trong đêm nhạc đặc biệt này thôi nào!!!💥💥💥\r<br> 💗💗Hãy để những giai điệu êm đềm sẽ làm cho trái tim đập mạnh hơn, những bản nhạc đầy nghệ thuật sẽ kể lại những câu chuyện và mỗi nốt nhạc sẽ gợi lên những kỷ niệm đáng nhớ. Đêm nhạc này không chỉ là nơi gắn kết yêu thương mà còn là một hành trình rực rỡ đầy tự hào của CLB Tài năng Sinh viên BKStar.❤️‍🔥🎂\r<br>————————————\r<br>Còn chờ đợi gì nữa mà không mua vé ủng hộ chúng mình ngay thôi nào!!!💕💕💕👇🏼👇🏼👇🏼\r<br>Link đặt vé: https://forms.gle/7sG8yjcJQNAsU6Ja8\r<br>Giá vé: 50.000đ/vé ( tặng 1 ly nước )\r<br>Thời gian: 16/06/2024 - 18:30pm\r<br>Địa điểm: Hội trường F, Trường Đại học Bách Khoa - Đại học Đà Nẵng.\r<br>--------------------------------------------------------------\r<br>⁉️ Mọi thắc mắc vui lòng liên hệ:\r<br>⭐️ Fanpage: CLB Tài năng Sinh viên BKStar\r<br>📩 Email: tainangsinhvienbkstar@gmail.com\r<br>📞 Chủ nhiệm: 091 8835701 (Trần Hữu Nhật Trường)\r<br>#clbtainangsinhvien #BKSTAR #SaoMuaHa2024 #ThanhAmRucRo', '2024-06-07 00:00:00', '2024-06-09 23:59:59', '2024-06-06 00:00:00', '2024-06-13 23:59:59', 'Hội trường F', 500, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/poster%2F445374618_954819303099500_5099572442375375817_n.jpg%201717741950291?alt=media&token=98bf5707-dc0e-4095-be2e-835f991fb2d9', 'done', '2024-06-07 13:32:32', NULL, '                                                                                    \n                        abc\n                        \n                        '),
(25, 136, '[TUYỂN TÌNH NGUYỆN VIÊN THAM GIA NGÀY ĐOÀN VIÊN 2024]', 'Nhân dịp kỷ niệm 134 năm ngày sinh của Chủ tịch Hồ Chí Minh và đồng thời nhằm chuẩn bị điều kiện cơ sở vật chất tốt nhất để phục vụ nhu cầu học tập các môn thực hành, thí nghiệm theo kế hoạch chung của nhà trường.\r<br>👉BCH LCĐ Khoa Hoá kêu gọi TNV tham gia “Ngày đoàn viên” với nội dung cụ thể như sau:\r<br>- Nội dung chương trình: gồm 2 hoạt động chính:\r<br>+ Dọn dẹp và làm sạch khu vực các phòng thí nghiệm khu D\r<br>+ Sinh hoạt tập thể với mục đích tuyên truyền cho sinh viên học tập và làm theo tấm gương đạo đức phong cách Chủ tịch Hồ Chí Minh\r<br>- Số lượng: 60 TNV\r<br>- Địa điểm tập trung: Sân ngoài trời khu D, Đại học Bách Khoa Đà Nẵng\r<br>- Thời gian: 7h00 ngày 13 tháng 06 năm 2024 (Chủ nhật)\r<br>- Trang phục: Áo đoàn\r<br>- Link đăng ký: https://forms.gle/JNRdgRdFBLzS5Aic8\r<br>🎯Sinh viên tham gia sẽ được lập danh sách để cộng điểm rèn luyện, điểm Phục vụ cộng đồng.\r<br>📌Link sẽ được đóng ngay sau khi đủ số lượng TNV. Đề nghị Bí thư/ Lớp trưởng nghiêm túc triển khai về đơn vị.\r<br>❤️Vậy còn chần chừ gì nữa mà không đăng ký tham gia thôi nào.Hãy cùng nhau tạo ra một ngày “Ngày đoàn viên” thật ý nghĩa và đáng nhớ! _______________________________________\r<br>👉Mọi thắc mắc xin liên hệ:\r<br>Đ/c TS. Nguyễn Thị Lan Anh - Bí thư Ban Chấp hành LCĐ Khoa Hóa\r<br>SĐT: 0969014042\r<br>Đ/c Võ Thị Kim Liên – Phó Bí thư Ban Chấp hành LCĐ Khoa Hóa\r<br>SĐT: 0374288589\r<br>Fanpage: Liên chi đoàn Khoa Hóa - BKĐN (https://www.facebook.com/lcdhoabkdn)', '2024-06-06 00:00:00', '2024-06-08 23:59:59', '2024-06-08 00:00:00', '2024-06-09 23:59:59', 'Sân ngoài trời khu D, Đại học Bách Khoa Đà Nẵng', 60, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/poster%2F441896841_855677156576942_5020940133617336908_n.jpg%201717746681551?alt=media&token=9e750fbc-d689-4ea4-8463-986fd0eb08a2', 'done', '2024-06-07 14:51:23', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `activities_backup`
--

CREATE TABLE `activities_backup` (
  `id` int(10) UNSIGNED NOT NULL,
  `activity_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `registration_start_date` datetime NOT NULL,
  `registration_end_date` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `maxnumber` int(11) NOT NULL DEFAULT 200,
  `image` varchar(255) NOT NULL,
  `confirm` enum('yet','reject','confirm','update','done') NOT NULL,
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `avt` varchar(255) NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fadmin.jpg?alt=media&token=3e03ae3b-07f7-4c73-8989-ce9ebf2887ce'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `administrators`
--

INSERT INTO `administrators` (`id`, `user_id`, `email`, `phone`, `created_at`, `updated_at`, `avt`) VALUES
(1, 144, 'phanduclam02@gmail.com', '0932536332', '2024-06-06 14:13:56', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fadmin.jpg?alt=media&token=3e03ae3b-07f7-4c73-8989-ce9ebf2887ce'),
(2, 146, 'baoadmin@gmail.com', '036303333', '2024-06-06 15:42:27', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fadmin.jpg?alt=media&token=3e03ae3b-07f7-4c73-8989-ce9ebf2887ce'),
(3, 149, 'nam@gmail.com', '00098978797', '2024-06-07 13:25:39', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fadmin.jpg?alt=media&token=3e03ae3b-07f7-4c73-8989-ce9ebf2887ce'),
(4, 152, 'truong@gmail.com', '1234567890', '2024-06-08 04:41:41', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fadmin.jpg?alt=media&token=3e03ae3b-07f7-4c73-8989-ce9ebf2887ce');

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `id` int(10) UNSIGNED NOT NULL,
  `activity_id` int(10) UNSIGNED NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `idFaculty` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sort_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(15, 'Tự động hóa', NULL),
(16, 'Khoa học Công nghệ tiên tiến', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `avt` varchar(255) NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`user_id`, `description`, `address`, `email`, `phone`, `avt`, `created_at`, `updated_at`) VALUES
(135, NULL, NULL, 'fast@gmail.com', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03', '2024-06-06 02:21:46', NULL),
(136, 'Khoa Hóa ', 'Bách khoa Đà Nẵng', 'hoa@gmail.com', '036333333', 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03', '2024-06-06 02:22:09', NULL),
(137, NULL, NULL, 'hsv@gmail.com', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03', '2024-06-06 02:22:25', NULL),
(138, NULL, NULL, 'doantruong@gmail.com', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03', '2024-06-06 02:22:50', NULL),
(141, NULL, NULL, 'bkd@gmail.com', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03', '2024-06-06 12:58:41', NULL),
(145, NULL, NULL, 'ctxh@gmail.com', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03', '2024-06-06 14:18:25', NULL),
(147, NULL, NULL, 'baontc@gmail.com', NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03', '2024-06-06 15:45:20', NULL),
(148, 'qwertyuiopasdfghjklzxcvbnm', '54 nguyen luong bang', 'bkstar@gmail.com', '123456790', 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fhd.jpg%201717741610140?alt=media&token=8610f44f-9c6f-4b55-b8d5-921fa4420e1a', '2024-06-07 13:24:31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `activity_id` int(10) UNSIGNED NOT NULL,
  `student_id` int(10) UNSIGNED NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(100) DEFAULT NULL,
  `isComfirm` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `isAttendance` tinyint(1) NOT NULL DEFAULT 0,
  `wish` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`id`, `activity_id`, `student_id`, `email`, `phone_number`, `isComfirm`, `created_at`, `isAttendance`, `wish`) VALUES
(16, 21, 139, 'phanduclam02@gmail.com', '0932536332', 1, '2024-06-06 14:45:21', 0, ''),
(17, 21, 53, 'bao.tb2k1@gmail.com', '0354432324', 1, '2024-06-06 15:24:39', 0, 'Tôi muốn tham gia hoạt động để có thêm kiến thức'),
(18, 23, 150, 'tt912002@gmail.com', '0918835701', 1, '2024-06-07 13:29:52', 0, ''),
(19, 19, 54, 'nguyenvanT@gmail.com', '090219309', 0, '2024-06-07 23:47:08', 0, 'Tôi muốn tham gia hoạt động để có thêm kiến thức'),
(20, 20, 54, 'Nganhangnhanuoc0710@gmail.com', '012321311', 0, '2024-06-07 23:47:56', 0, 'tôi muốn tham gia'),
(21, 23, 54, 'nguyenvanT@gmail.com', '023322231', 0, '2024-06-07 23:48:34', 0, 'tôi muốn tham gia để học hỏi'),
(22, 21, 56, 'nguyenvanT@gmail.com', '087382787', 0, '2024-06-08 00:09:13', 0, '12332'),
(23, 19, 56, 'v@gmail.com', '007163287', 0, '2024-06-08 03:26:07', 0, 'tôi muốn tham gia'),
(25, 24, 150, 'tt912002@gmail.com', '0918835701', 0, '2024-06-08 04:47:25', 0, ''),
(26, 24, 139, 'phanduclam02@gmail.com', '0932536332', 0, '2024-06-08 05:41:30', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `saved`
--

CREATE TABLE `saved` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `activity_id` int(10) UNSIGNED NOT NULL,
  `timeCreate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saved`
--

INSERT INTO `saved` (`id`, `user_id`, `activity_id`, `timeCreate`) VALUES
(1, 31, 14, '2024-06-04 19:14:26'),
(2, 25, 14, '2024-06-04 19:40:16'),
(3, 24, 146, '2024-06-07 15:11:22'),
(4, 21, 146, '2024-06-07 15:11:54'),
(5, 136, 24, '2024-06-07 15:16:42'),
(6, 139, 24, '2024-06-07 15:21:58');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(255) NOT NULL,
  `session` text NOT NULL,
  `expires` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `session`, `expires`) VALUES
('_B5XmbMdT-CMdby-qrnYilUKxiITMJSM', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T22:48:56.524Z\",\"httpOnly\":true,\"path\":\"/\"}}', 1717800537),
('0DfWi0aSg5caDSyfXGA0UQrsXbWOoDTP', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T22:49:20.485Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}', 1717800560),
('12HV9dFkedk9BHILjLHeiI8RrB_v-EFE', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T22:24:05.277Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"id\":147,\"role\":\"organization\",\"avt\":\"https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2FNTC.jpg?alt=media&token=2f741809-722d-4628-9104-14ece7585e03\"}}', 1717799045),
('20RLZElb3rFOHO6XqTtcaJVEDQM-aFO1', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T23:19:35.173Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"error\":[\"Bạn không có quyền truy cập vào trang này\"]}}', 1717802375),
('4SeFeOy2a6fyj-bLb_sjBgFmEX9HL0QN', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T22:48:56.525Z\",\"httpOnly\":true,\"path\":\"/\"}}', 1717800537),
('aMRtJVMqw_6_DckD7MYK9prOSB_wUUul', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T22:44:07.066Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"id\":148,\"role\":\"organization\",\"avt\":\"https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fhd.jpg%201717741610140?alt=media&token=8610f44f-9c6f-4b55-b8d5-921fa4420e1a\"}}', 1717800247),
('AP9zNgnlEAHVkygbajy9MQkfwNhdL7aJ', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T22:48:56.526Z\",\"httpOnly\":true,\"path\":\"/\"}}', 1717800537),
('bWXjKF_XYWSeJ-UbTcSnzKlcfLOThEi2', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T22:48:19.638Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"error\":[\"Bạn không có quyền truy cập vào trang này\"]}}', 1717800500),
('cjWVBAjsNOeLBJXjd1wbPVQH-k_iCo4Z', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T23:32:27.576Z\",\"httpOnly\":true,\"path\":\"/\"}}', 1717803148),
('CV7_2uD_zZR-PiYL9UHa77N7PGjy8DrR', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T22:48:59.532Z\",\"httpOnly\":true,\"path\":\"/\"}}', 1717800540),
('dmaTc5efm5lyOMeUcmfSk0bcIWlm2CRi', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T23:32:27.574Z\",\"httpOnly\":true,\"path\":\"/\"}}', 1717803148),
('DV9UpJLWjdvdt6nvjg9z5kiNdr7-KKGE', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T23:44:34.368Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"id\":139,\"role\":\"student\",\"avt\":\"https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2F846280899168e1abab5a6cd0d6e03dcf.jpg%201717659967373?alt=media&token=e49bf71c-4474-414c-8bce-ecee9c766c90\"}}', 1717803874),
('EqikPHEjbIc2EWWPXmu7peXalzd-OYGi', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T23:37:11.522Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"id\":150,\"role\":\"student\",\"avt\":\"https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2F437974883_1433709850867096_1295273446675372542_n.jpg%201717796601004?alt=media&token=f2879ce8-8ce4-4798-9b28-c3942b73bdf9\"}}', 1717803432),
('H0SK7EuOnc6er7cug-cxzQrJz5gTNfa1', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T22:49:01.346Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}', 1717800541),
('JjY9adR9hJbADXnpIyzFBPYVH_O5Hgid', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T23:32:27.520Z\",\"httpOnly\":true,\"path\":\"/\"}}', 1717803148),
('JZ4b1bpRrmXPMTlYi7yntE8tOAgJJqnp', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T23:19:10.487Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"error\":[\"Bạn không có quyền truy cập vào trang này\"]}}', 1717802350),
('K4wWEPrMfE8ClLAVtms0pqbJmrpbelX3', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T23:19:14.587Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"error\":[\"Bạn không có quyền truy cập vào trang này\"]}}', 1717802355),
('pKmRE0tX8fQUh5nrOxSAdH5_UzzeEM9h', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T23:46:17.520Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"id\":4,\"role\":\"admin\",\"avt\":\"https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fadmin.jpg?alt=media&token=3e03ae3b-07f7-4c73-8989-ce9ebf2887ce\"}}', 1717803978),
('PNGm-qh3BUT0h8JN63oxGN5_Q6lQk8m0', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T23:32:27.577Z\",\"httpOnly\":true,\"path\":\"/\"}}', 1717803148),
('tbOwdKGxLec_g7IRaRH1xdKkOxbQr7dh', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T22:48:56.526Z\",\"httpOnly\":true,\"path\":\"/\"}}', 1717800537),
('TdSNcmHmLbkRWqfVowcZ3j2cxLDNNhYI', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T22:41:53.588Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"id\":4,\"role\":\"admin\",\"avt\":\"https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fadmin.jpg?alt=media&token=3e03ae3b-07f7-4c73-8989-ce9ebf2887ce\"}}', 1717800114),
('xYoZufmQnkc8q0mANQh087B6YlryKGXr', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T22:49:01.644Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}', 1717800542),
('zsR5lEGLxA3tWkNdUEiCD4MxfxlcSEqP', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-06-07T23:49:43.711Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"id\":150,\"role\":\"student\",\"avt\":\"https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2F437974883_1433709850867096_1295273446675372542_n.jpg%201717796601004?alt=media&token=f2879ce8-8ce4-4798-9b28-c3942b73bdf9\"}}', 1717804184);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `masv` varchar(20) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `class` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `faculty` int(11) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `avt` varchar(255) NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`masv`, `user_id`, `class`, `email`, `faculty`, `phone`, `avt`, `created_at`, `updated_at`) VALUES
('123123', 151, '20PFIEV3', NULL, 2, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-08 01:24:32', NULL),
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
('1232000123', 123, '20PFIEV3', 'bao@gmail.com', 12, '0363033333', 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
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
('123200053', 53, '20PFIEV3', 'bao.tb2k1@gmail.com', 16, '0354432324', 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 02:20:22', NULL),
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
('123200126', 140, '20PFIEV3', NULL, 6, NULL, 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2Fstudent.jpg?alt=media&token=10533a1d-9b65-4886-843a-ebdc5c3f2392', '2024-06-06 12:57:55', NULL),
('123200130', 150, '20PFIEV3', 'tt912002@gmail.com', 16, '0918835701', 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/avt-user%2F437974883_1433709850867096_1295273446675372542_n.jpg%201717796601004?alt=media&token=f2879ce8-8ce4-4798-9b28-c3942b73bdf9', '2024-06-07 13:28:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `hashed_password`, `role`, `created_at`, `updated_at`) VALUES
(36, 'Nguyen Van B', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(37, 'Nguyen Van C', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(38, 'Nguyen Van D', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(39, 'Nguyen Van E', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
(40, 'Nguyen Van F', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
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
(53, 'Trần Bão', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:15:11', NULL),
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
(136, 'Liên chi đoàn khoa Hóa', '698d51a19d8a121ce581499d7b701668', 'organization', '2024-06-06 02:22:09', NULL),
(137, 'Hoi SInh Vien', '698d51a19d8a121ce581499d7b701668', 'organization', '2024-06-06 02:22:25', NULL),
(138, 'Doan Truong', '698d51a19d8a121ce581499d7b701668', 'organization', '2024-06-06 02:22:49', NULL),
(139, 'Phan Duc Lam', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 02:37:42', NULL),
(140, 'Vo Van Chi Thuan', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-06 12:57:55', NULL),
(141, 'BK Dancing', '698d51a19d8a121ce581499d7b701668', 'organization', '2024-06-06 12:58:41', NULL),
(144, 'Phan Duc Lam', '698d51a19d8a121ce581499d7b701668', 'admin', '2024-06-06 14:13:56', NULL),
(145, 'Doi Cong Tac Xa Hoi', '698d51a19d8a121ce581499d7b701668', 'organization', '2024-06-06 14:18:25', NULL),
(146, 'bao', '202cb962ac59075b964b07152d234b70', 'admin', '2024-06-06 15:42:27', NULL),
(147, 'Bao NTC', '202cb962ac59075b964b07152d234b70', 'organization', '2024-06-06 15:45:20', NULL),
(148, 'BKStar', '698d51a19d8a121ce581499d7b701668', 'organization', '2024-06-07 13:24:31', NULL),
(149, 'nam', '698d51a19d8a121ce581499d7b701668', 'admin', '2024-06-07 13:25:39', NULL),
(150, 'Trần Hữu Nhật Trường', '698d51a19d8a121ce581499d7b701668', 'student', '2024-06-07 13:28:32', NULL),
(151, 'Trần Bão', '202cb962ac59075b964b07152d234b70', 'student', '2024-06-08 01:24:32', NULL),
(152, 'truong', '202cb962ac59075b964b07152d234b70', 'admin', '2024-06-08 04:41:41', NULL);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `administrators`
--
ALTER TABLE `administrators`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `saved`
--
ALTER TABLE `saved`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `fk_activity_organization` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `sess_cleanup` ON SCHEDULE EVERY 15 MINUTE STARTS '2024-06-07 23:19:38' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM `sessions` WHERE sid IN (SELECT temp.sid FROM (SELECT `sid` FROM `sessions` WHERE `expires` > 0 AND `expires` < UNIX_TIMESTAMP()) AS temp)$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
