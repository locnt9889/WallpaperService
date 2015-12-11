-- phpMyAdmin SQL Dump
-- version 4.4.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 11, 2015 at 08:31 AM
-- Server version: 5.5.44
-- PHP Version: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chomoidb`
--

-- --------------------------------------------------------

--
-- Table structure for table `User_Favorite_Items`
--

CREATE TABLE IF NOT EXISTS `User_Favorite_Items` (
  `id` int(10) NOT NULL,
  `userID` int(10) NOT NULL,
  `favoriteItemID` int(10) NOT NULL,
  `favoriteType` varchar(10) NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `User_Favorite_Items`
--

INSERT INTO `User_Favorite_Items` (`id`, `userID`, `favoriteItemID`, `favoriteType`, `createdDate`) VALUES
(6, 2, 15, 'PRODUCT', '2015-12-11 15:27:13'),
(7, 2, 16, 'PRODUCT', '2015-12-11 15:27:19'),
(8, 2, 17, 'PRODUCT', '2015-12-11 15:27:24'),
(9, 2, 25, 'SHOP', '2015-12-11 15:27:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `User_Favorite_Items`
--
ALTER TABLE `User_Favorite_Items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `User_Favorite_Items`
--
ALTER TABLE `User_Favorite_Items`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
