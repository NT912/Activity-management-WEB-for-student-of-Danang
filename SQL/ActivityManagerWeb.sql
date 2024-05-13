create database ActivityManagerWeb;
use ActivityManagerWeb;

-- Tạo bảng student
CREATE TABLE `student` (
    `Id_student` INT AUTO_INCREMENT PRIMARY KEY,
    `Id_user` INT UNIQUE,
    `MaSV` VARCHAR(50),
    `major` VARCHAR(100),
    `lopsinhoat` VARCHAR(100),
    `Phone` VARCHAR(20),
    CONSTRAINT `FK_student_user_id` FOREIGN KEY (`Id_user`) REFERENCES `user`(`Id`) ON DELETE CASCADE
);

-- Tạo bảng organization
CREATE TABLE `organization` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(100),
    `Email` VARCHAR(255) UNIQUE,
    `Password` VARCHAR(255),
    `Description` TEXT,
    `Address` VARCHAR(255),
    `Phone` VARCHAR(20)
);

-- Tạo bảng user
CREATE TABLE `user` (
    `Id` INT AUTO_INCREMENT PRIMARY KEY,
    `avatar` MEDIUMBLOB,
    `Name` VARCHAR(100) NOT NULL,
    `Birthday` DATE,
    `Email` VARCHAR(255) UNIQUE,
    `Password` VARCHAR(255),
    `Phone_SV` VARCHAR(20),
    `major` VARCHAR(100),
    `lopsinhoat` VARCHAR(100),
    `Id_organization` INT,
    `Name_organization` VARCHAR(100),
    `Description` TEXT,
    `Address` VARCHAR(255),
    `Phone_NTC` VARCHAR(20),
    `role` ENUM('student', 'organization') NOT NULL
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
    `Is_delete_request` BOOLEAN,
    `Is_confirm_from_Admin` BOOLEAN,
    `image` MEDIUMBLOB,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `FK_activity_organization_id` FOREIGN KEY (`Id_organization`) REFERENCES `organization`(`Id`) ON DELETE SET NULL
);

-- Tạo bảng major
CREATE TABLE `major` (
    `Id_major` INT AUTO_INCREMENT PRIMARY KEY,
    `khoa` VARCHAR(100) UNIQUE
);

-- Tạo bảng Registration
CREATE TABLE `registration` (
    `Id_registration` INT AUTO_INCREMENT PRIMARY KEY,
    `MaSV` VARCHAR(50),
    `Id_activity` INT,
    `Phone` VARCHAR(20),
    `Is_confirm` BOOLEAN,
    `Is_attendance` BOOLEAN,
    CONSTRAINT `FK_registration_activity_id` FOREIGN KEY (`Id_activity`) REFERENCES `Activity`(`Id_activity`) ON DELETE CASCADE
);


