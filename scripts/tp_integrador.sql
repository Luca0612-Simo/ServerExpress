-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: tp_integrador
-- ------------------------------------------------------
-- Server version       8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carreras`
--

DROP TABLE IF EXISTS `carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carreras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
INSERT INTO `carreras` VALUES (1,'Medicina');
/*!40000 ALTER TABLE `carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripciones`
--

DROP TABLE IF EXISTS `inscripciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alumno_id` int NOT NULL,
  `materia_id` int NOT NULL,
  `fecha_alta` datetime DEFAULT CURRENT_TIMESTAMP,
  `usuario_alta` varchar(50) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(50) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  `usuario_baja` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alumno_id` (`alumno_id`),
  KEY `materia_id` (`materia_id`),
  CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`alumno_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones`
--

LOCK TABLES `inscripciones` WRITE;
/*!40000 ALTER TABLE `inscripciones` DISABLE KEYS */;
INSERT INTO `inscripciones` VALUES (1,3,1,'2025-06-15 17:11:58','pabloAdmin',NULL,NULL,'2025-06-15 18:01:32','pabloAdmin'),(2,3,2,'2025-06-15 17:16:24','pabloAdmin',NULL,NULL,NULL,NULL),(3,3,3,'2025-06-15 17:16:29','pabloAdmin',NULL,NULL,NULL,NULL),(4,6,3,'2025-06-15 17:30:09','pabloAdmin',NULL,NULL,NULL,NULL),(5,6,1,'2025-06-15 18:52:14','Nico',NULL,NULL,'2025-06-15 18:53:43','Nico'),(6,6,1,'2025-06-15 18:53:13','Nico',NULL,NULL,'2025-06-15 18:54:13','Nico');
/*!40000 ALTER TABLE `inscripciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `carrera_id` int NOT NULL,
  `fecha_alta` datetime DEFAULT CURRENT_TIMESTAMP,
  `usuario_alta` varchar(50) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(50) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  `usuario_baja` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carrera_id` (`carrera_id`),
  CONSTRAINT `materias_ibfk_1` FOREIGN KEY (`carrera_id`) REFERENCES `carreras` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` VALUES (1,'Anatomia',1,'2025-06-15 16:28:24','pabloAdmin',NULL,NULL,NULL,NULL),(2,'Bioquimica',1,'2025-06-15 16:29:42','pabloAdmin','2025-06-15 16:48:00','admin','2025-06-15 16:52:55','pabloAdmin'),(3,'Fisiologia',1,'2025-06-15 17:15:26','pabloAdmin',NULL,NULL,NULL,NULL),(4,'Patologia',1,'2025-06-15 17:15:40','pabloAdmin',NULL,NULL,NULL,NULL),(5,'Farmacologia',1,'2025-06-15 17:15:51','pabloAdmin',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador'),(3,'Alumno'),(2,'Coordinador');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol_id` int NOT NULL,
  `fecha_alta` datetime DEFAULT CURRENT_TIMESTAMP,
  `usuario_alta` varchar(50) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(50) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  `usuario_baja` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`usuario`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin Test','admin@test.com','admin','1234',1,'2025-06-10 00:32:08','seeder',NULL,NULL,NULL,NULL),(2,'Coordinador Test','coordinador@test.com','coordinador','1234',2,'2025-06-10 00:32:08','seeder',NULL,NULL,NULL,NULL),(3,'Santiago Suarez','Santiagosuarez@fecea.com','Santi','$2b$10$4lMJ1e1D3NpDNIo9VE6fBef9qFA7k0leKMFuD9KV53yk/aaFFSNZW',3,'2025-06-10 00:32:08','seeder','2025-06-15 18:39:22','admin',NULL,NULL),(4,'Juan P├®rez','juan@example.com','juanp','$2b$10$dmr34hTdnXnKj6QlER2teOyOnI1nmBSmmM2UFCGRuqUJgwT0pJZA.',3,'2025-06-10 15:21:22','admin',NULL,NULL,'2025-06-15 15:26:12','pabloAdmin'),(5,'Pablo Romo','pabloRomo@gmail','pabloAdmin','$2b$10$cXpr8Lf20KX4GRzNxcAzqO8dsVr3jG3xyVBY7b7rHNOeqVFDsGzfe',1,'2025-06-12 15:03:14','admin',NULL,NULL,NULL,NULL),(6,'Nicolas Simonetti','nicoSimo@fecea.com','Nico','$2b$10$gUb3EmmrPLhI0AsQEFs0qO8vwNOsbGiaXBihA4UGV7aOkqGrLUJ6C',3,'2025-06-12 17:25:46','pabloAdmin','2025-06-15 12:10:23',NULL,NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;