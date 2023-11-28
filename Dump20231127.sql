-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: project_module05
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'ƯU ĐÃI','uu-dai'),(2,'MÓN MỚI','mon-moi'),(3,'BURGER','burger');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `media_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `source` longtext NOT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`media_id`),
  KEY `FK_1fe69e256dfd757e9e7651c6bf5` (`product_id`),
  CONSTRAINT `FK_1fe69e256dfd757e9e7651c6bf5` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `order_detail_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `number` varchar(255) NOT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `FK_985d5f728e1eebe4a3eabc43aac` (`product_id`),
  KEY `FK_a6ac5c99b8c02bd4ee53d3785be` (`order_id`),
  CONSTRAINT `FK_985d5f728e1eebe4a3eabc43aac` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_a6ac5c99b8c02bd4ee53d3785be` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,1,'4',1),(18,95,'2',1),(19,96,'2',1),(20,96,'2',2),(23,98,'3',2),(24,99,'2',2),(25,100,'3',2);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_name` varchar(100) NOT NULL,
  `created_at` date NOT NULL,
  `status` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `ward` varchar(100) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK_a922b820eeef29ac1c6800e826a` (`user_id`),
  CONSTRAINT `FK_a922b820eeef29ac1c6800e826a` FOREIGN KEY (`user_id`) REFERENCES `users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'vinh','2023-10-15','Xác nhận','vinhto1a@gmail.com','011345678','Ha noi','Ha noi','Ha noi','Ha noi',1),(95,'ヴィングエン テ','2023-11-24','Chờ xác nhận','vinhto1a@gmail.com','09075466868','1232rewfds','Tỉnh Bắc Giang','Thành phố Bắc Giang','Xã Đồng Sơn',1),(96,'nam','2023-11-25','Chờ xác nhận','nam@gmail.com','09075466868','thanh xuan','Tỉnh Thái Nguyên','Huyện Phú Lương','Xã Phú Đô',2),(98,'グェン テヴィン','2023-11-27','Chờ xác nhận','vinhto1a@gmail.com','09075466868','1232rewfds','Tỉnh Lào Cai','Huyện Bát Xát','Xã A Mú Sung',1),(99,'グェン テヴィン','2023-11-27','Chờ xác nhận','vinhto1a@gmail.com','09075466868','thanh xuan','Thành phố Hà Nội','Quận Ba Đình','Phường Phúc Xá',1),(100,'グェン テヴィン','2023-11-27','Chờ xác nhận','vinhto1a@gmail.com','09075466868','thanh xuan','Tỉnh Điện Biên','Thị xã Mường Lay','Phường Sông Đà',1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `number` int DEFAULT NULL,
  `sale` double NOT NULL,
  `img` text,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FK_0dce9bc93c2d2c399982d04bef1` (`category_id`),
  CONSTRAINT `FK_0dce9bc93c2d2c399982d04bef1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Combo Happy Meal 1 ','2 Miếng Gà Rán + 1 lon Pepsi',87000,50,0.2,'https://static.kfcvietnam.com.vn/images/items/lg/happy_meal.jpg?v=3QXoEg',1),(2,'Combo Happy Meal 2','4 Miếng Gà Rán + 2 Lon Pepsi',143000,50,0.2,'https://static.kfcvietnam.com.vn/images/items/lg/happy_meal_social.jpg?v=3QXoEg',1),(3,'Combo Happy Family 2','6 Miếng Gà Rán + 3 Lon Pepsi',220000,50,0.2,'	https://static.kfcvietnam.com.vn/images/items/lg/happy_family.jpg?v=3QXoEg',1),(4,'Combo Happy Family 2','8 Miếng Gà Rán + 4 Lon Pepsi',250000,50,0.2,'	https://static.kfcvietnam.com.vn/images/items/lg/happy_family_social.jpg?v=3QXoEg',1),(5,'Dứa Sơ Ri  ','1  Dứa Sơ Ri  ',30000,50,0.2,'https://static.kfcvietnam.com.vn/images/items/lg/duasori.jpg?v=3QXoEg',2),(6,'3 Cánh Gà Hot Wings ','3 Cánh Gà Hot Wings ',50000,50,0.2,'https://static.kfcvietnam.com.vn/images/items/lg/3-HW.jpg?v=3QXoEg',2),(7,'6 Cánh Gà Hot Wings ','6 Cánh Gà Hot Wings ',100000,50,0.2,'https://static.kfcvietnam.com.vn/images/items/lg/5-HW.jpg?v=3QXoEg',2),(8,'1 Miếng Đùi Gà Quay ','1 Miếng Đùi Gà Quay ',50000,50,0.2,'https://static.kfcvietnam.com.vn/images/items/lg/BJ.jpg?v=3QXoEg',2),(9,'Burger Zinger ','1 Burger Zinger ',54000,50,0.2,'https://static.kfcvietnam.com.vn/images/items/lg/Burger-Zinger.jpg?v=3QXoEg',2),(10,'Burger Tôm ','1  Burger Tôm ',50000,50,0.2,'https://static.kfcvietnam.com.vn/images/items/lg/Burger-Shrimp.jpg?v=3QXoEg',3),(11,'Com Gà Teriyaki ','1 Com Gà Teriyaki ',45000,50,0.2,'https://static.kfcvietnam.com.vn/images/items/lg/Rice-Teriyaki.jpg?v=3QXoEg',3),(12,'Cơm Gà Rán ','1 Cơm Gà Rán ',40000,50,0.2,'	https://static.kfcvietnam.com.vn/images/items/lg/Rice-F.Chicken.jpg?v=3QXoEg',3),(13,'Combo Happy Family 5','Combo Happy',150000,50,0.2,'https://static.kfcvietnam.com.vn/images/items/lg/happy_meal.jpg?v=3QXoEg',3);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `users_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT '0',
  `status` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`users_id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vinh','vinhto1a@gmail.com','$2b$10$iZ9fLcOT.eyxgcfMNHnPA.62r65udHc5rQ0O4PWzj.hfuv3OEOjEK','0','0'),(2,'Nam','nam@gmail.com','$2b$10$ltaUdFPNzDK/0fwzZSRdUuMPNXBILtc8i8nweSwcrW9.1H.7ZCiyO','0','0'),(3,'admin','admin@gmail.com','$2b$10$vxhFeO7GsLAOoboPDtOVrumWXNL7LMiDj1X.7EBuFiakY56n5QuUG','0','0'),(4,'ha','ha@gmail.com','$2b$10$AGo.TQq6g22083RrFt0i2eyOWkf8s/pMnBQycfVBx71ogEafp4YWS','0','0'),(5,'namanh','namanh@gmail.com','$2b$10$fRGEyD.DIOaZFEhethq81Oagr8n.z0qKAqAAqXi/FH8xorS20u.Ve','0','0'),(6,'lam','lam@gmail.com','$2b$10$EixFRkwXTEnRBQ5w2we.ReLsOvfY6I5y8riDmsGPKkMj0IIKVqGda','0','0');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-27 14:19:20
