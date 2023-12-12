-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2023 at 08:14 AM
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
-- Database: `chess`
--

-- --------------------------------------------------------

--
-- Table structure for table `board`
--

CREATE TABLE `board` (
  `piece` varchar(16) NOT NULL,
  `row` int(11) NOT NULL,
  `col` int(11) NOT NULL,
  `color` varchar(8) NOT NULL,
  `gameID` int(11) NOT NULL,
  `playerID` int(11) NOT NULL,
  `pieceID` int(11) NOT NULL,
  `hasMoved` varchar(24) NOT NULL DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `board`
--

INSERT INTO `board` (`piece`, `row`, `col`, `color`, `gameID`, `playerID`, `pieceID`, `hasMoved`) VALUES
('rook', 7, 0, 'white', 18, 0, 545, 'false'),
('knight', 5, 0, 'white', 18, 0, 546, 'true'),
('bishop', 7, 2, 'white', 18, 0, 547, 'false'),
('queen', 7, 3, 'white', 18, 0, 548, 'false'),
('king', 7, 4, 'white', 18, 0, 549, 'false'),
('bishop', 7, 5, 'white', 18, 0, 550, 'false'),
('knight', 5, 5, 'white', 18, 0, 551, 'true'),
('rook', 7, 7, 'white', 18, 0, 552, 'false'),
('rook', 0, 0, 'black', 18, 1, 553, 'false'),
('knight', 2, 2, 'black', 18, 1, 554, 'true'),
('bishop', 0, 2, 'black', 18, 1, 555, 'false'),
('queen', 0, 3, 'black', 18, 1, 556, 'false'),
('king', 0, 4, 'black', 18, 1, 557, 'false'),
('bishop', 0, 5, 'black', 18, 1, 558, 'false'),
('knight', 0, 6, 'black', 18, 1, 559, 'false'),
('rook', 0, 7, 'black', 18, 1, 560, 'false'),
('pawn', 1, 0, 'black', 18, 1, 561, 'false'),
('pawn', 6, 0, 'white', 18, 0, 562, 'false'),
('pawn', 1, 1, 'black', 18, 1, 563, 'false'),
('pawn', 6, 1, 'white', 18, 0, 564, 'false'),
('pawn', 1, 2, 'black', 18, 1, 565, 'false'),
('pawn', 4, 2, 'white', 18, 0, 566, 'true'),
('pawn', 1, 3, 'black', 18, 1, 567, 'false'),
('pawn', 6, 3, 'white', 18, 0, 568, 'false'),
('pawn', 1, 4, 'black', 18, 1, 569, 'false'),
('pawn', 6, 4, 'white', 18, 0, 570, 'false'),
('pawn', 1, 5, 'black', 18, 1, 571, 'false'),
('pawn', 6, 5, 'white', 18, 0, 572, 'false'),
('pawn', 3, 6, 'black', 18, 1, 573, 'true'),
('pawn', 6, 6, 'white', 18, 0, 574, 'false'),
('pawn', 1, 7, 'black', 18, 1, 575, 'false'),
('pawn', 6, 7, 'white', 18, 0, 576, 'false');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `gameID` int(11) NOT NULL,
  `currentTurn` varchar(12) NOT NULL DEFAULT 'white'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`gameID`, `currentTurn`) VALUES
(18, 'white');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `board`
--
ALTER TABLE `board`
  ADD PRIMARY KEY (`pieceID`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`gameID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `board`
--
ALTER TABLE `board`
  MODIFY `pieceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=577;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `gameID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
