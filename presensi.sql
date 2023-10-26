-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2023 at 11:09 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `presensi`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id_account` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name_user` varchar(45) NOT NULL,
  `mobile` varchar(16) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `avatar` varchar(45) DEFAULT 'no_image.png',
  `id_account_level` int(1) NOT NULL,
  `status_account` enum('ACT','NACT') NOT NULL DEFAULT 'ACT',
  `token` varchar(45) DEFAULT '-',
  `imei` varchar(30) DEFAULT '-',
  `fcm_id` varchar(45) DEFAULT '-',
  `last_login` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `account_device`
--

CREATE TABLE `account_device` (
  `id_device_account` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `imei` varchar(30) NOT NULL,
  `manufacture` varchar(45) NOT NULL DEFAULT '-',
  `model` varchar(45) NOT NULL DEFAULT '-',
  `release_vesion` varchar(5) NOT NULL DEFAULT '-',
  `sdk_version` varchar(5) NOT NULL DEFAULT '-',
  `app_version` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `account_level`
--

CREATE TABLE `account_level` (
  `id_account_level` int(1) NOT NULL,
  `level_sname` int(11) NOT NULL,
  `level_lname` varchar(100) NOT NULL,
  `level_description` varchar(100) NOT NULL,
  `status_account_level` enum('ACT','NACT') NOT NULL DEFAULT 'ACT',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id_attendance` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `id_account` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `id_schedule` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `event_name` enum('LOGIN','START','END') NOT NULL DEFAULT 'LOGIN',
  `locator_code` varchar(45) NOT NULL,
  `locator_latitude` varchar(45) DEFAULT '-',
  `locator_longitude` varchar(45) DEFAULT '-',
  `selfie` text NOT NULL,
  `latitude` varchar(45) NOT NULL DEFAULT '-',
  `longitude` varchar(45) NOT NULL DEFAULT '-',
  `reason` text DEFAULT NULL,
  `date_attend` datetime DEFAULT NULL,
  `datetime_record` datetime NOT NULL,
  `datetime_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `division`
--

CREATE TABLE `division` (
  `id_division` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `division_sname` varchar(10) NOT NULL DEFAULT '-',
  `division_lname` varchar(100) NOT NULL DEFAULT '-',
  `division_description` varchar(200) NOT NULL DEFAULT '-',
  `status_division` enum('ACT','NACT') NOT NULL DEFAULT 'ACT',
  `datetime_created` datetime NOT NULL,
  `datetime_edited` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `locator`
--

CREATE TABLE `locator` (
  `id_locator` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `id_shifting` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `id_schedule` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `locator_code` varchar(45) NOT NULL,
  `latitude` varchar(45) NOT NULL DEFAULT '-',
  `longitude` varchar(45) NOT NULL DEFAULT '-',
  `use_location` enum('Y','N') NOT NULL DEFAULT 'Y',
  `status_locator` enum('ACT','NACT') NOT NULL DEFAULT 'ACT',
  `datetime_created` datetime NOT NULL,
  `datetime_edited` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id_schedule` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `id_account` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `id_shifting` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `shift_schedule` datetime NOT NULL,
  `status_schedule` enum('ACT','NACT') NOT NULL DEFAULT 'ACT',
  `datetime_created` datetime NOT NULL,
  `datetime_edited` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shifting`
--

CREATE TABLE `shifting` (
  `id_shifting` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `id_division` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `id_shift_type` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `shift_type` enum('NRM','HLD','LNG','OVT') DEFAULT 'NRM',
  `id_shift_turn` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `shift_turn` enum('S1','S2','S3','S4','XS','OTH') DEFAULT 'OTH',
  `shift_start` datetime DEFAULT NULL,
  `shift_end` datetime DEFAULT NULL,
  `status_shifting` enum('ACT','NACT') NOT NULL DEFAULT 'ACT',
  `datetime_created` datetime NOT NULL,
  `datetime_edited` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shift_turn`
--

CREATE TABLE `shift_turn` (
  `id_shift_turn` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `turn_sname` varchar(10) NOT NULL,
  `turn_lname` varchar(100) NOT NULL,
  `turn_description` varchar(100) NOT NULL,
  `status_shift_turn` enum('ACT','NACT') NOT NULL DEFAULT 'ACT',
  `datetime_created` datetime NOT NULL,
  `datetime_edited` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shift_type`
--

CREATE TABLE `shift_type` (
  `id_shift_type` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type_sname` varchar(10) NOT NULL,
  `type_lname` varchar(100) NOT NULL,
  `type_description` varchar(100) NOT NULL,
  `status_shift_type` enum('ACT','NACT') NOT NULL DEFAULT 'ACT',
  `datetime_created` datetime NOT NULL,
  `datetime_edited` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id_account`),
  ADD KEY `fk_account-id_account_level` (`id_account_level`);

--
-- Indexes for table `account_device`
--
ALTER TABLE `account_device`
  ADD PRIMARY KEY (`id_device_account`);

--
-- Indexes for table `account_level`
--
ALTER TABLE `account_level`
  ADD PRIMARY KEY (`id_account_level`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id_attendance`),
  ADD KEY `fk_attendance-id_account` (`id_account`),
  ADD KEY `fk_attendance-id_schedule` (`id_schedule`);

--
-- Indexes for table `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`id_division`);

--
-- Indexes for table `locator`
--
ALTER TABLE `locator`
  ADD PRIMARY KEY (`id_locator`),
  ADD KEY `fk_locator-id_shifting` (`id_shifting`),
  ADD KEY `fk_locator-id_schedule` (`id_schedule`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id_schedule`),
  ADD KEY `fk_schedule-id_account` (`id_account`),
  ADD KEY `fk_schedule-id_shifting` (`id_shifting`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `shifting`
--
ALTER TABLE `shifting`
  ADD PRIMARY KEY (`id_shifting`),
  ADD KEY `fk_shifting-id_division` (`id_division`),
  ADD KEY `fk_shifting-id_shift_type` (`id_shift_type`);

--
-- Indexes for table `shift_turn`
--
ALTER TABLE `shift_turn`
  ADD PRIMARY KEY (`id_shift_turn`);

--
-- Indexes for table `shift_type`
--
ALTER TABLE `shift_type`
  ADD PRIMARY KEY (`id_shift_type`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `fk_account-id_account_level` FOREIGN KEY (`id_account_level`) REFERENCES `account_level` (`id_account_level`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `fk_attendance-id_account` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_attendance-id_schedule` FOREIGN KEY (`id_schedule`) REFERENCES `schedule` (`id_schedule`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `locator`
--
ALTER TABLE `locator`
  ADD CONSTRAINT `fk_locator-id_schedule` FOREIGN KEY (`id_schedule`) REFERENCES `schedule` (`id_schedule`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_locator-id_shifting` FOREIGN KEY (`id_shifting`) REFERENCES `shifting` (`id_shifting`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `fk_schedule-id_account` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_schedule-id_shifting` FOREIGN KEY (`id_shifting`) REFERENCES `shifting` (`id_shifting`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `shifting`
--
ALTER TABLE `shifting`
  ADD CONSTRAINT `fk_shifting-id_division` FOREIGN KEY (`id_division`) REFERENCES `division` (`id_division`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_shifting-id_shift_type` FOREIGN KEY (`id_shift_type`) REFERENCES `shift_type` (`id_shift_type`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
