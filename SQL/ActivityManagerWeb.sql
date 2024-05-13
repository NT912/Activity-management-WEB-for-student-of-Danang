CREATE DATABASE ActivityManagerWeb;
USE ActivityManagerWeb;

-- Tạo bảng major
CREATE TABLE major (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);

-- Thêm dữ liệu vào bảng major
INSERT INTO major (name) VALUES 
('Khoa Công nghệ Nhiệt - Điện lạnh'),
('Khoa Công nghệ thông tin'),
('Khoa Cơ khí'),
('Khoa Cơ khí giao thông'),
('Khoa Điện'),
('Khoa Điện tử - Viễn thông'),
('Khoa Hóa'),
('Khoa Kiến trúc'),
('Khoa Môi trường'),
('Khoa Quản lý dự án'),
('Khoa Sư phạm kỹ thuật'),
('Khoa Xây dựng Cầu đường'),
('Khoa Xây dựng Dân dụng & Công nghiệp'),
('Khoa Xây dựng Công trình Thủy'),
('Khoa Khoa học công nghệ tiên tiến');

-- Tạo bảng user
CREATE TABLE `user` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(100) NOT NULL,
    `Email` VARCHAR(255) UNIQUE,
    `Password` VARCHAR(255),
    `major_id` INT,
    `role` ENUM('student', 'organization') NOT NULL,
    CONSTRAINT `FK_user_major_id` FOREIGN KEY (`major_id`) REFERENCES `major`(`Id`) ON DELETE SET NULL
);

-- Tạo bảng organization
CREATE TABLE `organization` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `avatar` MEDIUMBLOB,
    `Name` VARCHAR(100),
    `Email` VARCHAR(255) UNIQUE,
    `Password` VARCHAR(255),
    `Description` TEXT,
    `Address` VARCHAR(255),
    `Phone` VARCHAR(20)
);

-- Tạo bảng student
CREATE TABLE `student` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `avatar` MEDIUMBLOB,
    `MaSV` VARCHAR(50),
    `Name` VARCHAR(100),
    `Password` VARCHAR(255),
    `major` VARCHAR(100),
    `lopsinhoat` VARCHAR(100),
    `Phone` VARCHAR(20),
    CONSTRAINT `FK_student_user_id` FOREIGN KEY (`Id`) REFERENCES `user`(`Id`) ON DELETE CASCADE
);

-- Tạo bảng Activity
CREATE TABLE `activity` (
    `Id_activity` INT AUTO_INCREMENT PRIMARY KEY,
    `Id_organization` INT,
    `Name_activity` VARCHAR(100),
    `Description` TEXT,
    `Date_start` DATE,
    `Date_end` DATE,
    `Date_start_registe` DATE,
    `Date_end_registe` DATE,
    `Location` TEXT,
    `Is_delete_request` BOOLEAN,
    `Is_confirm_from_Admin` BOOLEAN,
    `image` MEDIUMBLOB,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `FK_activity_organization_id` FOREIGN KEY (`Id_organization`) REFERENCES `organization`(`Id`) ON DELETE SET NULL
);

-- Tạo bảng Registration
CREATE TABLE `registration` (
    `Id_registration` INT AUTO_INCREMENT PRIMARY KEY,
    `Id_user` INT,
    `Id_activity` INT,
    `Is_confirm` BOOLEAN,
    CONSTRAINT `FK_registration_user_id` FOREIGN KEY (`Id_user`) REFERENCES `user`(`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_registration_activity_id` FOREIGN KEY (`Id_activity`) REFERENCES `activity`(`Id_activity`) ON DELETE CASCADE
);
