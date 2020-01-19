-- phpMyAdmin SQL Dump
-- version 2.11.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 19, 2020 at 04:38 AM
-- Server version: 5.0.51
-- PHP Version: 5.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `angular_architecture`
--

-- --------------------------------------------------------

--
-- Table structure for table `arc_users`
--

CREATE TABLE `arc_users` (
  `user_id` int(11) NOT NULL auto_increment,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_first_name` varchar(255) NOT NULL,
  `user_last_name` varchar(255) default NULL,
  `user_photo` varchar(255) default NULL,
  `is_active` tinyint(1) NOT NULL default '1',
  `created_on` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `updated_on` timestamp NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=63 ;

--
-- Dumping data for table `arc_users`
--

INSERT INTO `arc_users` (`user_id`, `user_email`, `user_password`, `user_first_name`, `user_last_name`, `user_photo`, `is_active`, `created_on`, `updated_on`) VALUES
(7, 'test@test.com3', 'test', 'Tester1A', 'Jack', NULL, 0, '2020-01-12 17:03:30', '2020-01-12 00:00:00'),
(8, 'sdf@sd.fgdfg4', 'pass2', 'fdsdf6A', 'ghgh', NULL, 1, '2020-01-12 17:03:30', '2020-01-12 00:00:00'),
(9, 'test@test.com2', 'test', 'Tester2A', 'Jack', NULL, 1, '2020-01-18 08:04:21', '2020-01-18 00:00:00'),
(10, 'sdf@sd.fgdfg5', 'pass2', 'fdsdf5A', 'ghgh', NULL, 1, '2020-01-18 08:04:21', '2020-01-18 00:00:00'),
(11, 'test@test.com1', 'test', 'Tester3A', 'Jack', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(12, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(13, 'sdf@sd.fgdfg6', 'pass2', 'fdsdf4A', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(14, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(15, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(16, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(17, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(18, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(19, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(20, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(21, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(22, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(23, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(24, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(25, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(26, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(27, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(28, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(29, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(30, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(31, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(32, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(33, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(34, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(35, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(37, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(38, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(39, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 1, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(40, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', NULL, 0, '2020-01-18 08:04:41', '2020-01-18 00:00:00'),
(41, 'test1@test.com', 'test', 'Tester', 'Jack', NULL, 1, '2020-01-19 05:17:47', '2020-01-19 00:00:00'),
(42, 'test@test.com', 'test', 'Tester', 'Jack', NULL, 1, '2020-01-19 05:59:28', '2020-01-21 00:00:00'),
(43, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse.jpg', 1, '2020-01-19 06:04:48', '2020-01-19 06:04:48'),
(44, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse.jpg', 1, '2020-01-19 06:09:08', '2020-01-19 06:09:08'),
(45, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse.jpg-1579394610586', 1, '2020-01-19 06:13:30', '2020-01-19 06:13:30'),
(46, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse1579395196266_.jpg', 1, '2020-01-19 06:23:16', '2020-01-19 06:23:16'),
(47, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouseNaN_.jpg', 1, '2020-01-19 06:23:52', '2020-01-19 06:23:52'),
(48, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse_1579395263623_.jpg', 1, '2020-01-19 06:24:23', '2020-01-19 06:24:23'),
(49, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse_1579395274893_.jpg', 1, '2020-01-19 06:24:34', '2020-01-19 06:24:34'),
(50, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse_1579395275681_.jpg', 1, '2020-01-19 06:24:35', '2020-01-19 06:24:35'),
(51, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse_1579395276649_.jpg', 1, '2020-01-19 06:24:36', '2020-01-19 06:24:36'),
(52, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse_1579395277854_.jpg', 1, '2020-01-19 06:24:37', '2020-01-19 06:24:37'),
(53, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse_1579395279467_.jpg', 1, '2020-01-19 06:24:39', '2020-01-19 06:24:39'),
(54, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse_1579395279658_.jpg', 1, '2020-01-19 06:24:39', '2020-01-19 06:24:39'),
(55, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse_1579395279769_.jpg', 1, '2020-01-19 06:24:39', '2020-01-19 06:24:39'),
(56, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse_1579395279926_.jpg', 1, '2020-01-19 06:24:40', '2020-01-19 06:24:40'),
(57, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse_1579395280185_.jpg', 1, '2020-01-19 06:24:40', '2020-01-19 06:24:40'),
(58, 'test@sd.asd', 'test', 'sdf', 'asdf', 'lighthouse_1579395280157_.jpg', 1, '2020-01-19 06:24:40', '2020-01-19 06:24:40'),
(59, 'test@sd.sda', 'test', 'asdas', 'asdasdsad', 'penguins_1579397937647_.jpg', 1, '2020-01-19 07:08:57', '2020-01-19 07:08:57'),
(60, 'testasd@asd.asdsad', 'lkj', 'lkj', 'lkjl', 'desert_1579403311833_.jpg', 0, '2020-01-19 08:38:32', '2020-01-19 08:38:32'),
(61, 'test@asdasd.fff', 'ssdffs', 'tetst', 'dfdfddf', 'penguins_1579407702523_.jpg', 0, '2020-01-19 09:51:42', '2020-01-19 09:51:42'),
(62, 'test@sd.asdasd', 'test', 'sdfsdf', 'sdfsdf', 'lighthouse_1579408645028_.jpg', 1, '2020-01-19 10:07:25', '2020-01-19 10:07:25');
