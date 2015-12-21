-- phpMyAdmin SQL Dump
-- version 4.4.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 21, 2015 at 11:08 AM
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
-- Table structure for table `Shop_Product_Comments`
--

CREATE TABLE IF NOT EXISTS `Shop_Product_Comments` (
  `commentID` int(10) NOT NULL,
  `productID` int(10) NOT NULL,
  `parent_CommentID` int(10) NOT NULL,
  `userID` int(10) NOT NULL,
  `isShopComment` tinyint(4) NOT NULL,
  `commentType` varchar(255) NOT NULL,
  `commentValue` varchar(1024) NOT NULL,
  `isActive` tinyint(4) NOT NULL,
  `createdDate` datetime NOT NULL,
  `modifiedDate` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Shop_Product_Comments`
--

INSERT INTO `Shop_Product_Comments` (`commentID`, `productID`, `parent_CommentID`, `userID`, `isShopComment`, `commentType`, `commentValue`, `isActive`, `createdDate`, `modifiedDate`) VALUES
(1, 2, 0, 2, 1, 'SHOP', 'hello', 1, '2015-12-18 18:27:10', '2015-12-18 18:27:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Shop_Product_Comments`
--
ALTER TABLE `Shop_Product_Comments`
  ADD PRIMARY KEY (`commentID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Shop_Product_Comments`
--
ALTER TABLE `Shop_Product_Comments`
  MODIFY `commentID` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
