CREATE DATABASE IF NOT EXISTS p_dbms;

USE p_dbms;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `coach_team`
--

DROP TABLE IF EXISTS `coach_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `coach_team` (
    `COACH_ID` varchar(20) NOT NULL,
    `TEAM_ID` varchar(20) NOT NULL,
    PRIMARY KEY (`COACH_ID`, `TEAM_ID`),
    KEY `TEAM_ID` (`TEAM_ID`),
    CONSTRAINT `coach_team_ibfk_1` FOREIGN KEY (`COACH_ID`) REFERENCES `coach` (`COACH_ID`),
    CONSTRAINT `coach_team_ibfk_2` FOREIGN KEY (`TEAM_ID`) REFERENCES `team` (`TEAM_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `coach_team`
--

LOCK TABLES `coach_team` WRITE;
/*!40000 ALTER TABLE `coach_team` DISABLE KEYS */
;
INSERT INTO
    `coach_team`
VALUES (101, 'tm01'),
    (102, 'tm02'),
    (103, 'tm03'),
    (104, 'tm04'),
    (105, 'tm05');
/*!40000 ALTER TABLE `coach_team` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

-- (removed stray DELIMITER directives here; delimiters are set only around stored routines later in the file)

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:27

-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p_dbms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `coach`
--

DROP TABLE IF EXISTS `coach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `coach` (
    `COACH_ID` varchar(20) NOT NULL,
    `COACH_NAME` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`COACH_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `coach`
--

LOCK TABLES `coach` WRITE;
/*!40000 ALTER TABLE `coach` DISABLE KEYS */
;
INSERT INTO
    `coach`
VALUES (101, 'Alex Ferguson'),
    (102, 'Pep Guardiola'),
    (103, 'Jürgen Klopp'),
    (104, 'Carlo Ancelotti'),
    (105, 'José Mourinho');
/*!40000 ALTER TABLE `coach` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:27

-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p_dbms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `injury_records`
--

DROP TABLE IF EXISTS `injury_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `injury_records` (
    `PLAYER_ID` varchar(20) NOT NULL,
    `INJURY_CASE_ID` varchar(20) NOT NULL,
    `STAFF_ID` varchar(20) NOT NULL,
    PRIMARY KEY (
        `PLAYER_ID`,
        `INJURY_CASE_ID`,
        `STAFF_ID`
    ),
    KEY `INJURY_CASE_ID` (`INJURY_CASE_ID`),
    KEY `STAFF_ID` (`STAFF_ID`),
    CONSTRAINT `injury_records_ibfk_1` FOREIGN KEY (`PLAYER_ID`) REFERENCES `player` (`PLAYER_ID`),
    CONSTRAINT `injury_records_ibfk_2` FOREIGN KEY (`INJURY_CASE_ID`) REFERENCES `injury` (`INJURY_CASE_ID`),
    CONSTRAINT `injury_records_ibfk_3` FOREIGN KEY (`STAFF_ID`) REFERENCES `medical_staffs` (`STAFF_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `injury_records`
--

LOCK TABLES `injury_records` WRITE;
/*!40000 ALTER TABLE `injury_records` DISABLE KEYS */
;
INSERT INTO
    `injury_records`
VALUES (1001, 401, 201),
    (1002, 402, 202),
    (1003, 403, 203),
    (1004, 404, 204),
    (1005, 405, 205);
/*!40000 ALTER TABLE `injury_records` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:29

-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p_dbms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `injury`
--

DROP TABLE IF EXISTS `injury`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `injury` (
    `INJURY_CASE_ID` varchar(20) NOT NULL,
    `MEDICAL_REPORT` text,
    `RESTING_PERIOD` int DEFAULT NULL,
    `INJURY_DATE` date DEFAULT NULL,
    `SEVERITY` varchar(50) DEFAULT NULL,
    `TYPE` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`INJURY_CASE_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `injury`
--

LOCK TABLES `injury` WRITE;
INSERT INTO `injury` (`INJURY_CASE_ID`,`MEDICAL_REPORT`,`RESTING_PERIOD`,`INJURY_DATE`,`SEVERITY`,`TYPE`) VALUES
    ('401','Hamstring strain',21,'2023-10-15','Mild','Muscle'),
    ('402','ACL tear',180,'2023-09-01','Severe','Ligament'),
    ('403','Ankle sprain',14,'2023-11-05','Mild','Joint'),
    ('404','Concussion',10,'2023-10-28','Moderate','Head'),
    ('405','Fractured metatarsal',90,'2023-11-10','Severe','Bone');
UNLOCK TABLES;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:28

-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p_dbms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `match`
--

DROP TABLE IF EXISTS `match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `match` (
    `MATCH_ID` varchar(20) NOT NULL,
    `TEAM_ONE` varchar(100) DEFAULT NULL,
    `TEAM_TWO` varchar(100) DEFAULT NULL,
    `STADIUM` varchar(100) DEFAULT NULL,
    `WINNING_TEAM` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`MATCH_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `match`
--

LOCK TABLES `match` WRITE;
-- Optional: seed sample matches (ensure columns align)
-- INSERT INTO `match` (`MATCH_ID`,`TEAM_ONE`,`TEAM_TWO`,`STADIUM`,`WINNING_TEAM`) VALUES
--   ('504','Blue Tigers','Green Eagles','United Ground','Green Eagles'),
--   ('505','Yellow Panthers','Black Wolves','Royal Field','Yellow Panthers');
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:28

-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p_dbms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `medical_staffs`
--

DROP TABLE IF EXISTS `medical_staffs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `medical_staffs` (
    `STAFF_ID` varchar(20) NOT NULL,
    `STAFF_NAME` varchar(100) DEFAULT NULL,
    `SPECIALIZATION` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`STAFF_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `medical_staffs`
--

LOCK TABLES `medical_staffs` WRITE;
/*!40000 ALTER TABLE `medical_staffs` DISABLE KEYS */
;
INSERT INTO
    `medical_staffs`
VALUES (
        201,
        'Dr. James Wilson',
        'Orthopedics'
    ),
    (
        202,
        'Dr. Lisa Cuddy',
        'Physiotherapy'
    ),
    (
        203,
        'Dr. Gregory House',
        'Diagnostics'
    ),
    (
        204,
        'Dr. Eric Foreman',
        'Neurology'
    ),
    (
        205,
        'Dr. Allison Cameron',
        'Sports Medicine'
    );
/*!40000 ALTER TABLE `medical_staffs` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:29

-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p_dbms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `player_performance`
--

DROP TABLE IF EXISTS `player_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
create table player_stats (
    `PLAYER_ID` varchar(20) NOT NULL,
    `STATS_ID` varchar(20) NOT NULL,
    PRIMARY KEY (`STATS_ID`, `PLAYER_ID`),
    KEY `PLAYER_ID` (`PLAYER_ID`),
    CONSTRAINT `player_stats_ibfk_1` FOREIGN KEY (`PLAYER_ID`) REFERENCES `player` (`PLAYER_ID`),
    CONSTRAINT `player_stats_ibfk_2` FOREIGN KEY (`STATS_ID`) REFERENCES `stats` (`STATS_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `player_stats`
--

LOCK TABLES `player_stats` WRITE;
/*!40000 ALTER TABLE `player_stats` DISABLE KEYS */
;
INSERT INTO
    `player_stats`
VALUES (1001, 601),
    (1002, 602),
    (1003, 603),
    (1004, 604),
    (1005, 605),
    (1006, 606),
    (1007, 607),
    (1008, 608),
    (1009, 609),
    (1010, 610);
/*!40000 ALTER TABLE `player_stats` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:29

-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p_dbms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `player_stats`
--

DROP TABLE IF EXISTS `stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
create table stats (
    `STATS_ID` varchar(20) NOT NULL,
    `GOALS` int DEFAULT '0',
    `ASSISTS` int DEFAULT '0',
    `FOULS` int DEFAULT '0',
    `YELLOW_CARDS` int DEFAULT '0',
    `RED_CARDS` int DEFAULT '0',
    `MINUTES_PLAYED` int DEFAULT '0',
    PRIMARY KEY (`STATS_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `stats`
--

LOCK TABLES `stats` WRITE;
/*!40000 ALTER TABLE `stats` DISABLE KEYS */
;
INSERT INTO
    `stats`
VALUES (601, 2, 1, 3, 1, 0, 90),
    (602, 1, 2, 2, 0, 0, 85),
    (603, 0, 0, 5, 2, 1, 45),
    (604, 0, 0, 1, 0, 0, 90),
    (605, 0, 3, 0, 0, 0, 90),
    (606, 1, 1, 4, 1, 0, 78),
    (607, 0, 0, 2, 0, 0, 90),
    (608, 2, 1, 1, 0, 0, 90),
    (609, 1, 0, 3, 1, 0, 65),
    (610, 0, 0, 0, 0, 0, 90);
/*!40000 ALTER TABLE `stats` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:28

-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p_dbms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `player_team`
--

DROP TABLE IF EXISTS `player_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
create table player_team (
    `PLAYER_ID` varchar(20) NOT NULL,
    `TEAM_ID` varchar(20) NOT NULL,
    PRIMARY KEY (`PLAYER_ID`, `TEAM_ID`),
    KEY `TEAM_ID` (`TEAM_ID`),
    CONSTRAINT `player_team_ibfk_1` FOREIGN KEY (`PLAYER_ID`) REFERENCES `player` (`PLAYER_ID`),
    CONSTRAINT `player_team_ibfk_2` FOREIGN KEY (`TEAM_ID`) REFERENCES `team` (`TEAM_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `player_team`
--

LOCK TABLES `player_team` WRITE;
/*!40000 ALTER TABLE `player_team` DISABLE KEYS */
;
INSERT INTO
    `player_team`
VALUES (1001, 'tm01'),
    (1006, 'tm01'),
    (1002, 'tm02'),
    (1007, 'tm02'),
    (1003, 'tm03'),
    (1008, 'tm03'),
    (1004, 'tm04'),
    (1009, 'tm04'),
    (1005, 'tm05'),
    (1010, 'tm05');
/*!40000 ALTER TABLE `player_team` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:28

-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p_dbms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
create table player (
    `PLAYER_ID` varchar(20) NOT NULL,
    `PLAYER_NAME` varchar(100) DEFAULT NULL,
    `HEIGHT` decimal(5, 2) DEFAULT NULL,
    `WEIGHT` decimal(5, 2) DEFAULT NULL,
    `CONTRACT` varchar(100) DEFAULT NULL,
    `EMAIL` varchar(20) DEFAULT NULL,
    PRIMARY KEY (`PLAYER_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */
;
INSERT INTO
    `player`
VALUES (
        1001,
        'Lionel Messi',
        1.70,
        72.00,
        '2025-12-31',
        'messi@email.com'
    ),
    (
        1002,
        'Cristiano Ronaldo',
        1.87,
        85.00,
        '2024-06-30',
        'ronaldo@email.com'
    ),
    (
        1003,
        'Neymar Jr',
        1.75,
        68.00,
        '2026-12-31',
        'neymar@email.com'
    ),
    (
        1004,
        'Kylian Mbappé',
        1.78,
        73.00,
        '2025-06-30',
        'mbappe@email.com'
    ),
    (
        1005,
        'Robert Lewandowski',
        1.85,
        81.00,
        '2024-12-31',
        'lewa@email.com'
    ),
    (
        1006,
        'Kevin De Bruyne',
        1.81,
        70.00,
        '2026-06-30',
        'debruyne@email.com'
    ),
    (
        1007,
        'Virgil van Dijk',
        1.93,
        92.00,
        '2025-12-31',
        'vandijk@email.com'
    ),
    (
        1008,
        'Mohamed Salah',
        1.75,
        71.00,
        '2024-06-30',
        'salah@email.com'
    ),
    (
        1009,
        'Harry Kane',
        1.88,
        89.00,
        '2026-12-31',
        'kane@email.com'
    ),
    (
        1010,
        'Manuel Neuer',
        1.93,
        92.00,
        '2025-06-30',
        'neuer@email.com'
    );
/*!40000 ALTER TABLE `player` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:27

-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p_dbms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `stat_match`
--

DROP TABLE IF EXISTS `stat_match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
create table stat_match (
    `STATS_ID` varchar(20) NOT NULL,
    `MATCH_ID` varchar(20) NOT NULL,
    PRIMARY KEY (`STATS_ID`, `MATCH_ID`),
    KEY `MATCH_ID` (`MATCH_ID`),
    CONSTRAINT `stat_match_ibfk_1` FOREIGN KEY (`STATS_ID`) REFERENCES `stats` (`STATS_ID`),
    CONSTRAINT `stat_match_ibfk_2` FOREIGN KEY (`MATCH_ID`) REFERENCES `match` (`MATCH_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `stat_match`
--

LOCK TABLES `stat_match` WRITE;
/*!40000 ALTER TABLE `stat_match` DISABLE KEYS */
;
INSERT INTO
    `stat_match`
VALUES (601, 501),
    (602, 501),
    (603, 502),
    (604, 502),
    (605, 503),
    (606, 503),
    (607, 504),
    (608, 504),
    (609, 505),
    (610, 505);
/*!40000 ALTER TABLE `stat_match` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:27

-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p_dbms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `team_match`
--

DROP TABLE IF EXISTS `team_match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
create table team_match (
    `MATCH_ID` varchar(20) NOT NULL,
    `TEAM_ID` varchar(20) NOT NULL,
    PRIMARY KEY (`MATCH_ID`, `TEAM_ID`),
    KEY `TEAM_ID` (`TEAM_ID`),
    CONSTRAINT `team_match_ibfk_1` FOREIGN KEY (`MATCH_ID`) REFERENCES `match` (`MATCH_ID`),
    CONSTRAINT `team_match_ibfk_2` FOREIGN KEY (`TEAM_ID`) REFERENCES `team` (`TEAM_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `team_match`
--

LOCK TABLES `team_match` WRITE;
/*!40000 ALTER TABLE `team_match` DISABLE KEYS */
;
INSERT INTO
    `team_match`
VALUES (501, 'tm01'),
    (503, 'tm01'),
    (501, 'tm02'),
    (504, 'tm02'),
    (502, 'tm03'),
    (504, 'tm03'),
    (502, 'tm04'),
    (505, 'tm04'),
    (503, 'tm05'),
    (505, 'tm05');
/*!40000 ALTER TABLE `team_match` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:29

-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p_dbms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
create table team (
    `TEAM_ID` varchar(20) NOT NULL,
    `TEAM_NAME` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`TEAM_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */
;
INSERT INTO
    `team`
VALUES ('tm01', 'Red Lions'),
    ('tm02', 'Blue Tigers'),
    ('tm03', 'Green Eagles'),
    ('tm04', 'Yellow Panthers'),
    ('tm05', 'Black Wolves');
/*!40000 ALTER TABLE `team` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:27

-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p_dbms
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `training`
--

DROP TABLE IF EXISTS `training`;
CREATE TABLE `training` (
        `training_id` INT AUTO_INCREMENT PRIMARY KEY,
        `time_of_day` ENUM('Morning','Afternoon','Evening') NOT NULL,
        `type` VARCHAR(50) NOT NULL,
        `focus` VARCHAR(100) NOT NULL,
        `activities` JSON DEFAULT NULL,
        `intensity` ENUM('High','Medium','Low') NOT NULL,
        `duration` VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Seed session types (IDs 1..3)
INSERT INTO `training` (`training_id`,`time_of_day`,`type`,`focus`,`activities`,`intensity`,`duration`) VALUES
    (1,'Morning','Physical','Strength & Conditioning', JSON_ARRAY('Box jumps','Sprints','Weight training'),'High','90 mins'),
    (2,'Afternoon','Tactical','Team Coordination', JSON_ARRAY('Formation drills','Set pieces','Match simulation'),'Medium','120 mins'),
    (3,'Evening','Mental','Recovery & Focus', JSON_ARRAY('Stretching','Video analysis','Mindfulness'),'Low','60 mins');


--
-- Table structure for table `training_records`
--

DROP TABLE IF EXISTS `training_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `training_records` (
    `training_id` INT NOT NULL,
    `player_id` VARCHAR(20) NOT NULL,
    `day` DATE NOT NULL,
    `distance_covered` DECIMAL(5,2) DEFAULT NULL,
    `sprint_count` INT DEFAULT NULL,
    `shots_on_target` INT DEFAULT NULL,
    `duration` TIME DEFAULT NULL,
    `passing_accuracy` INT DEFAULT NULL,
    PRIMARY KEY (`training_id`,`player_id`,`day`),
    CONSTRAINT `fk_records_training` FOREIGN KEY (`training_id`)
      REFERENCES `training`(`training_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_records_player` FOREIGN KEY (`player_id`)
      REFERENCES `player`(`PLAYER_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `training_records`
--

-- Build a derived 'dates' table with the past 30 days (explicit UNION ALL to avoid WITH RECURSIVE)
INSERT INTO `training_records` (`training_id`,`player_id`,`day`,`distance_covered`,`sprint_count`,`shots_on_target`,`duration`,`passing_accuracy`)
SELECT
        CASE WHEN MOD(d.n,3)=0 THEN 1 WHEN MOD(d.n,3)=1 THEN 2 ELSE 3 END AS training_id,
        p.PLAYER_ID,
        d.day,
        ROUND(3 + RAND(CONCAT(p.PLAYER_ID,d.day)) * 7,2) AS distance_covered,
        FLOOR(5 + RAND(CONCAT('s',p.PLAYER_ID,d.day)) * 15) AS sprint_count,
        FLOOR(RAND(CONCAT('t',p.PLAYER_ID,d.day)) * 5) AS shots_on_target,
        CASE WHEN MOD(d.n,3)=0 THEN '01:30:00' WHEN MOD(d.n,3)=1 THEN '02:00:00' ELSE '01:00:00' END AS duration,
        FLOOR(60 + RAND(CONCAT('pa',p.PLAYER_ID,d.day)) * 36) AS passing_accuracy
FROM (
    SELECT CURDATE() AS day, 0 AS n
    UNION ALL SELECT CURDATE() - INTERVAL 1 DAY, 1
    UNION ALL SELECT CURDATE() - INTERVAL 2 DAY, 2
    UNION ALL SELECT CURDATE() - INTERVAL 3 DAY, 3
    UNION ALL SELECT CURDATE() - INTERVAL 4 DAY, 4
    UNION ALL SELECT CURDATE() - INTERVAL 5 DAY, 5
    UNION ALL SELECT CURDATE() - INTERVAL 6 DAY, 6
    UNION ALL SELECT CURDATE() - INTERVAL 7 DAY, 7
    UNION ALL SELECT CURDATE() - INTERVAL 8 DAY, 8
    UNION ALL SELECT CURDATE() - INTERVAL 9 DAY, 9
    UNION ALL SELECT CURDATE() - INTERVAL 10 DAY, 10
    UNION ALL SELECT CURDATE() - INTERVAL 11 DAY, 11
    UNION ALL SELECT CURDATE() - INTERVAL 12 DAY, 12
    UNION ALL SELECT CURDATE() - INTERVAL 13 DAY, 13
    UNION ALL SELECT CURDATE() - INTERVAL 14 DAY, 14
    UNION ALL SELECT CURDATE() - INTERVAL 15 DAY, 15
    UNION ALL SELECT CURDATE() - INTERVAL 16 DAY, 16
    UNION ALL SELECT CURDATE() - INTERVAL 17 DAY, 17
    UNION ALL SELECT CURDATE() - INTERVAL 18 DAY, 18
    UNION ALL SELECT CURDATE() - INTERVAL 19 DAY, 19
    UNION ALL SELECT CURDATE() - INTERVAL 20 DAY, 20
    UNION ALL SELECT CURDATE() - INTERVAL 21 DAY, 21
    UNION ALL SELECT CURDATE() - INTERVAL 22 DAY, 22
    UNION ALL SELECT CURDATE() - INTERVAL 23 DAY, 23
    UNION ALL SELECT CURDATE() - INTERVAL 24 DAY, 24
    UNION ALL SELECT CURDATE() - INTERVAL 25 DAY, 25
    UNION ALL SELECT CURDATE() - INTERVAL 26 DAY, 26
    UNION ALL SELECT CURDATE() - INTERVAL 27 DAY, 27
    UNION ALL SELECT CURDATE() - INTERVAL 28 DAY, 28
    UNION ALL SELECT CURDATE() - INTERVAL 29 DAY, 29
) d
CROSS JOIN (
        SELECT PLAYER_ID FROM `player` WHERE PLAYER_ID BETWEEN '1001' AND '1010'
) p
ORDER BY p.PLAYER_ID, d.day;
-- Note: original dump used LOCK/UNLOCK TABLES around this INSERT; removed for compatibility with piped import
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-08-17 12:23:28

-- Reporting views for frontend charts
CREATE OR REPLACE VIEW training_last7 AS
SELECT *
    FROM training_records
 WHERE `day` >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);

CREATE OR REPLACE VIEW training_summary AS
SELECT `day` AS DAY,
             COUNT(*) AS session_count,
             SUM(distance_covered) AS total_distance,
             AVG(passing_accuracy) AS avg_accuracy
    FROM training_records
 GROUP BY `day`;

--
-- Additional table for user authentication system
--

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `TEAM_ID` VARCHAR(20) NOT NULL,
    `u_name` VARCHAR(100) NOT NULL,
    `role` VARCHAR(100),
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`TEAM_ID`) REFERENCES `team` (`TEAM_ID`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */
;
-- No initial data for users table - will be populated through signup process
/*!40000 ALTER TABLE `users` ENABLE KEYS */
;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

--
DELIMITER $$

-- Procedure to fetch training sessions for the last N days
DROP PROCEDURE IF EXISTS `sp_get_training_by_days`$$
CREATE PROCEDURE `sp_get_training_by_days`(IN p_days INT)
BEGIN
    SELECT *
        FROM training_records
     WHERE `day` >= DATE_SUB(CURDATE(), INTERVAL p_days DAY);
END$$

-- Function to compute average passing accuracy over the last N days
DROP FUNCTION IF EXISTS `fn_avg_accuracy`$$
CREATE FUNCTION `fn_avg_accuracy`(p_days INT)
RETURNS DECIMAL(5,2)
DETERMINISTIC
BEGIN
    DECLARE result DECIMAL(5,2);
    SELECT AVG(passing_accuracy)
        INTO result
        FROM training_records
     WHERE `day` >= DATE_SUB(CURDATE(), INTERVAL p_days DAY);
    RETURN result;
END$$

DELIMITER ;

-- Metrics procedure used by backend for charts (optional env METRICS_PROCEDURE_NAME)
DELIMITER $$
DROP PROCEDURE IF EXISTS `sp_training_performance_metrics`$$
CREATE PROCEDURE `sp_training_performance_metrics`(IN p_player_id VARCHAR(20))
BEGIN
    IF p_player_id IS NULL OR p_player_id = '' THEN
        SELECT player_id,
               `day`,
               distance_covered,
               passing_accuracy,
               sprint_count,
               shots_on_target
          FROM training_records
         ORDER BY `day` ASC;
    ELSE
        SELECT player_id,
               `day`,
               distance_covered,
               passing_accuracy,
               sprint_count,
               shots_on_target
          FROM training_records
         WHERE player_id = p_player_id
         ORDER BY `day` ASC;
    END IF;
END$$
DELIMITER ;