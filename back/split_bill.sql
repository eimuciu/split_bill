-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220528.cc1733a80d
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2022 at 05:59 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `split_bill`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(10) UNSIGNED NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `group_id`, `user_id`) VALUES
(1, 2, 8),
(2, 3, 8),
(3, 5, 8),
(4, 4, 10),
(5, 1, 10),
(6, 5, 11),
(7, 1, 11),
(8, 2, 12),
(9, 3, 12),
(10, 1, 14),
(11, 2, 14),
(12, 3, 14),
(13, 4, 14),
(14, 5, 14),
(17, 4, 8),
(18, 2, 11),
(19, 4, 15),
(20, 5, 17),
(21, 7, 12);

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(10) UNSIGNED NOT NULL,
  `group_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `group_id`, `amount`, `description`) VALUES
(1, 1, 500, 'Tickets'),
(2, 1, 300, 'Property rent'),
(3, 2, 600, 'Tickets'),
(4, 2, 200, 'Climbing gear'),
(5, 3, 250, 'Dinner'),
(6, 4, 400, 'Tickets'),
(7, 4, 150, 'Entertainment'),
(8, 5, 300, 'Food'),
(9, 5, 200, 'Drinks'),
(10, 5, 500, 'Sauna'),
(11, 1, 200, 'Another bill'),
(17, 5, 500, 'Stripper'),
(18, 5, 200, 'Transportation'),
(20, 1, 200, 'Another bill'),
(21, 7, 500, 'Tickets');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(1, 'Trip to Spain'),
(2, 'Going to Alps'),
(3, 'Dinner in Belgium'),
(4, 'Trip to Finland'),
(5, 'New Years Party'),
(7, 'Music Festival'),
(8, 'Cult gathering');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `reg_timestamp`) VALUES
(8, 'User2', 'user2@email.com', '$2a$10$/x.Vpq96ldIYIjz79WwV8.iQ2KoSqrL/qqf5ZX57zU1Cli1cBKCES', '2022-05-26 07:32:13'),
(10, 'User3', 'user3@email.com', '$2a$10$ri4sqUWCK6/fpeE/nCUmQ.jLzgYt5EWSbZTF9jAMTwxI5fbL3AJW2', '2022-05-26 07:33:56'),
(11, 'User4', 'user4@email.com', '$2a$10$EcdYaUOy/Jfdzv72Qdi3durcMWJ2e8HwEl0LHYu.YCjexUplmWPru', '2022-05-26 07:35:38'),
(12, 'User5', 'user5@email.com', '$2a$10$OZBK.O/Rcr4VWCZ/Ttofs.U14Hz/mk12bung9TRSUa6766JsSFpEm', '2022-05-26 07:39:25'),
(14, 'User6', 'user6@email.com', '$2a$10$AxO/XSoBYTLBaxkk1oUvJeQvcwkPdDQ5JFFJVraVVLcRYcGLd.nzm', '2022-05-26 07:40:52'),
(15, 'User7', 'user7@email.com', '$2a$10$7sQ1pcGAKba8TnQkwFDZmePrXM3aqtvitsMWFX1yhi5NVuxHho1lG', '2022-05-27 08:15:59'),
(16, 'User8', 'user8@email.com', '$2a$10$wutb4cS3iNvLCEFxEVGAUuubB/nQKHmu9KFWYTJk.NWvZpGEEaSyG', '2022-05-27 08:17:32'),
(17, 'User9', 'user9@email.com', '$2a$10$cDgl/65xDmI/g9p3ICucSuM/taTnYyXIHpaB5nXjHbx0Y96jrJ1xu', '2022-05-27 08:17:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



