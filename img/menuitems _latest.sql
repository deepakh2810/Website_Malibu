-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 30, 2018 at 12:29 PM
-- Server version: 5.7.22-0ubuntu0.16.04.1
-- PHP Version: 7.0.28-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `resturantwebsite`
--

-- --------------------------------------------------------

--
-- Table structure for table `menuitems`
--

CREATE TABLE `menuitems` (
  `menuid` int(4) NOT NULL,
  `category` char(100) NOT NULL,
  `subcategory` char(100) NOT NULL,
  `name` char(100) NOT NULL,
  `description` char(255) NOT NULL,
  `cost` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menuitems`
--

INSERT INTO `menuitems` (`menuid`, `category`, `subcategory`, `name`, `description`, `cost`) VALUES
(4, 'dinner', 'Starters and Small Plates', 'Spinach and Artichoke dip', 'Our famous creamy spinach and artichoke blend, topped with cheese and baked. Served with tri-color chips, fire roasted salsa and sour cream', '$8.95'),
(5, 'dinner', 'Starters and Small Plates', 'Shrimp Cocktail', 'Jumbo shrimp and our signature wasabi cocktail sauce', '$13.95'),
(6, 'dinner', 'Starters and Small Plates', 'Fish Tacos', 'Spicy cumin-seared mahi mahi, chipotle slaw, tomatoes and cilantro on flour tortillas with limes', '$18.95'),
(10, 'lunch', 'Burger and Sandwiches', 'Teriyaki Chicken Sandwich', 'Marinated and grilled chicken breast,lettuce, tomato, picklesand side of mustard-mayo', '8.95'),
(11, 'lunch', 'Burger and Sandwiches', 'Malibu Crab Cake Sandwich', 'Jumbo lump crab cake, wasabi cocktailsauce, lettuce, tomato, pickle and lemonremoulade', '12.95'),
(12, 'dinner', 'Chicken and Fish', 'Blackend Rare Tuna', 'Rare yellowfin tuna, wasabi mashed\r\npotatoes, green onion soubise,\r\nwasabi and pickled ginger', '24.95'),
(13, 'dinner', 'Chicken and Fish', 'Alphine Chicken', 'Grilled chicken breast with seasoned\r\nwild mushrooms and melted Swiss cheese,\r\nserved with garlic mashed potatoes and\r\nwood-fired vegetables', '17.95'),
(14, 'dinner', 'Chicken and Fish', 'Pan Seared Mahi Mahi', 'With creamy pesto capellini, sauteed baby\nheirloom tomatoes and sun-dried\ntomato butter', '$21.95'),
(15, 'dinner', 'Steaks', 'Ribeye', 'Twelve-ounce hand-cut Angus ribeye, garlic mashed\r\npotatoes and wood-fired vegetables', '$29.95'),
(16, 'dinner', 'Steaks', 'Cajun Ribeye', 'Dusted with Cajun spice and finished with\r\nchipotle butter, served with garlic mashed\r\npotatoes and wood-fired vegetables', '$30.95'),
(18, 'drinks', 'Beer', 'Bell\'s Two Hearted IPA,', 'IPA, Kalamazoo, Mi (7.0% ABV; 12oz. Bottle)', '$6'),
(19, 'drinks', 'Beer', 'Anchor Steam', 'San Fransico, CA (4.9% ABV; 12oz. Bottle)', '$6'),
(20, 'drinks', 'Beer', 'Clausthaler Amber (NA),', 'Germany, (.45% ABV; 12oz. Bottle)', '$5'),
(21, 'drinks', 'Wine', 'Pascual Toso', 'Brut, Argentina, Glass', '$7'),
(22, 'drinks', 'Wine', 'Two Vines \'14', 'Columbia Valley.', '$19'),
(23, 'drinks', 'Wine', 'Joseph Phelps \'13', 'Napa', '$99'),
(24, 'drinks', 'Cocktails', 'Mojito', 'Plantation 3 Stars Rum, Lime, Sugar, Mint', '$9.1'),
(25, 'drinks', 'Cocktails', 'Aviation', 'Plymouth Gin, Maraschino, Lemon,Violette', '$9.1'),
(26, 'drinks', 'Cocktails', 'Cardinal Smash', 'Cardinal Vodka, Lemon, Fresh Fruit, Mint', '$10.5'),
(39, 'lunch', 'Soups and Small Salads', 'Garden Salad', 'Mixed greens, grape tomatoes, yellowpeppers, cucumbers, carrots, red onions, croutons and choice of dressing', '$4.95'),
(40, 'lunch', 'Soups and Small Salads', 'Ceasar Salad', 'Hearts of romaine, shaved Pecorino Romano, croutons and our real Caesar dressing', '$4.95'),
(41, 'lunch', 'Soups and Small Salads', 'Wedge Salad', 'Iceberg wedge, bacon, tomatoes, green onions, blue cheese dressing, blue cheese crumbles and drizzle of French dressing', '$18.95'),
(43, 'lunch', 'Starters', 'Shrimp Cocktail', 'Jumbo shrimp and our signature wasabi cocktail sauce', '$11.9'),
(44, 'lunch', 'Starters', 'Hummus and Naan', 'Freshly made hummus, naan flatbread, feta cheese, Kalamata olives, English cucumbers, artisanal crackers and extra virgin olive oil', '$8.95'),
(45, 'lunch', 'Starters', 'Spinach and Artichoke Dip', 'Our famous creamy spinach and artichoke blend, topped with cheese and baked. Served with tri-color chips, fire roasted salsa and sour cream', '$7.95');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menuitems`
--
ALTER TABLE `menuitems`
  ADD PRIMARY KEY (`menuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menuitems`
--
ALTER TABLE `menuitems`
  MODIFY `menuid` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
