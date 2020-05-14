-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.11-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table bikesharing.auth_tokens
CREATE TABLE IF NOT EXISTS `auth_tokens` (
  `IDAuth` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `IDUser` int(11) unsigned NOT NULL,
  `selector` char(12) DEFAULT NULL,
  `hashedValidator` char(64) DEFAULT NULL,
  `expires` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`IDAuth`),
  KEY `fk1` (`IDUser`),
  CONSTRAINT `fk1` FOREIGN KEY (`IDUser`) REFERENCES `users` (`IDUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table bikesharing.auth_tokens: ~0 rows (approximately)
/*!40000 ALTER TABLE `auth_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_tokens` ENABLE KEYS */;

-- Dumping structure for table bikesharing.bikes
CREATE TABLE IF NOT EXISTS `bikes` (
  `IDBike` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `location` int(11) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`IDBike`),
  KEY `FK_bikes_stations` (`location`),
  CONSTRAINT `FK_bikes_stations` FOREIGN KEY (`location`) REFERENCES `stations` (`IDStation`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table bikesharing.bikes: ~88 rows (approximately)
/*!40000 ALTER TABLE `bikes` DISABLE KEYS */;
INSERT INTO `bikes` (`IDBike`, `location`, `status`) VALUES
	(0, 1, 'available'),
	(2, 1, 'available'),
	(3, 1, 'available'),
	(4, 1, 'available'),
	(5, 1, 'available'),
	(6, 1, 'available'),
	(7, 1, 'available'),
	(8, 1, 'available'),
	(9, 1, 'available'),
	(10, 1, 'available'),
	(12, 1, 'available'),
	(13, 1, 'available'),
	(14, 1, 'available'),
	(15, 1, 'available'),
	(16, 3, 'available'),
	(17, 1, 'available'),
	(18, 1, 'available'),
	(19, 1, 'available'),
	(20, 1, 'available'),
	(21, 1, 'available'),
	(22, 1, 'available'),
	(23, 1, 'available'),
	(24, 1, 'available'),
	(25, 1, 'available'),
	(26, 1, 'available'),
	(27, 1, 'available'),
	(28, 1, 'available'),
	(29, 1, 'available'),
	(30, 3, 'available'),
	(31, 3, 'available'),
	(32, 3, 'available'),
	(33, 3, 'available'),
	(34, 3, 'available'),
	(35, 3, 'available'),
	(36, 3, 'available'),
	(37, 3, 'available'),
	(38, 3, 'available'),
	(39, 3, 'available'),
	(40, 3, 'available'),
	(41, 3, 'available'),
	(42, 3, 'available'),
	(43, 1, 'available'),
	(44, 1, 'available'),
	(45, 1, 'available'),
	(46, 1, 'available'),
	(47, 1, 'available'),
	(48, 1, 'available'),
	(49, 1, 'available'),
	(50, 1, 'available'),
	(51, 2, 'available'),
	(52, 2, 'available'),
	(53, 2, 'available'),
	(54, 2, 'available'),
	(55, 2, 'available'),
	(56, 2, 'available'),
	(57, 2, 'available'),
	(58, 2, 'available'),
	(59, 1, 'available'),
	(60, 1, 'available'),
	(61, 1, 'available'),
	(62, 1, 'available'),
	(63, 2, 'available'),
	(64, 2, 'available'),
	(65, 2, 'available'),
	(66, 2, 'available'),
	(67, 2, 'available'),
	(68, 1, 'available'),
	(69, 1, 'available'),
	(70, 1, 'available'),
	(71, 1, 'available'),
	(72, 1, 'available'),
	(73, 1, 'available'),
	(74, 1, 'available'),
	(75, 1, 'available'),
	(76, 1, 'available'),
	(77, 1, 'available'),
	(78, 1, 'available'),
	(79, 2, 'available'),
	(80, 2, 'available'),
	(81, 2, 'available'),
	(82, 2, 'available'),
	(83, 2, 'available'),
	(84, 2, 'available'),
	(85, 2, 'available'),
	(86, 2, 'available'),
	(87, 2, 'available'),
	(88, 2, 'available'),
	(89, 2, 'available');
/*!40000 ALTER TABLE `bikes` ENABLE KEYS */;

-- Dumping structure for table bikesharing.rentals
CREATE TABLE IF NOT EXISTS `rentals` (
  `IDRent` int(11) NOT NULL AUTO_INCREMENT,
  `startTime` varchar(64) NOT NULL DEFAULT '',
  `endTime` varchar(64) NOT NULL DEFAULT '',
  `origin` int(11) NOT NULL DEFAULT 0,
  `destination` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`IDRent`),
  KEY `FK_rentals_stations` (`origin`),
  KEY `FK_rentals_stations_2` (`destination`),
  CONSTRAINT `FK_rentals_stations` FOREIGN KEY (`origin`) REFERENCES `stations` (`IDStation`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_rentals_stations_2` FOREIGN KEY (`destination`) REFERENCES `stations` (`IDStation`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table bikesharing.rentals: ~0 rows (approximately)
/*!40000 ALTER TABLE `rentals` DISABLE KEYS */;
/*!40000 ALTER TABLE `rentals` ENABLE KEYS */;

-- Dumping structure for table bikesharing.stations
CREATE TABLE IF NOT EXISTS `stations` (
  `IDStation` int(11) NOT NULL AUTO_INCREMENT,
  `lat` double NOT NULL DEFAULT 0,
  `lon` double NOT NULL DEFAULT 0,
  `slots` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `stationName` varchar(50) NOT NULL DEFAULT '',
  `stationAddr` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`IDStation`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table bikesharing.stations: ~3 rows (approximately)
/*!40000 ALTER TABLE `stations` DISABLE KEYS */;
INSERT INTO `stations` (`IDStation`, `lat`, `lon`, `slots`, `stationName`, `stationAddr`) VALUES
	(1, 45.691731, 9.67609, 50, 'Centrale', 'Bergamo Stazione'),
	(2, 45.694635, 9.668647, 50, 'Porta Nuova', 'Piazza Cavalieri di Vittorio Veneto'),
	(3, 45.692084, 9.661682, 50, 'Triangolo', 'Borgo San Leonardo');
/*!40000 ALTER TABLE `stations` ENABLE KEYS */;

-- Dumping structure for table bikesharing.users
CREATE TABLE IF NOT EXISTS `users` (
  `IDUser` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(60) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `username` varchar(60) NOT NULL DEFAULT '',
  `name` varchar(60) NOT NULL DEFAULT '',
  `surname` varchar(60) NOT NULL DEFAULT '',
  `address` varchar(255) NOT NULL DEFAULT '',
  `birthdate` varchar(50) NOT NULL DEFAULT '',
  `privilege` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `verified` tinyint(1) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`IDUser`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table bikesharing.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
