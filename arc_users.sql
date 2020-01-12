-- phpMyAdmin SQL Dump
-- version 2.11.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 12, 2020 at 12:18 PM
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
  `is_active` tinyint(1) NOT NULL default '1',
  `created_on` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `updated_on` timestamp NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `arc_users`
--

INSERT INTO `arc_users` (`user_id`, `user_email`, `user_password`, `user_first_name`, `user_last_name`, `is_active`, `created_on`, `updated_on`) VALUES
(7, 'test@test.com', 'test', 'Tester', 'Jack', 0, '2020-01-12 17:03:30', '2020-01-12 00:00:00'),
(8, 'sdf@sd.fgdfg', 'pass2', 'fdsdf', 'ghgh', 1, '2020-01-12 17:03:30', '2020-01-12 00:00:00');
