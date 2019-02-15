/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

Create Table

CREATE TABLE `space` (
  `spaceID` int(11) NOT NULL AUTO_INCREMENT,
  `spaceType` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spaceName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spaceAddress` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spacePhone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spaceWebsite` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spaceLat` decimal(10,8) DEFAULT NULL,
  `spaceLng` decimal(11,8) DEFAULT NULL,
  `spaceStatus` int(1) DEFAULT NULL,
  `spaceBayNo` int(6) DEFAULT NULL,
  `spaceStreetMarker` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spaceRestriction` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spacePrice` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spaceGoogleMap` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`spaceID`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
