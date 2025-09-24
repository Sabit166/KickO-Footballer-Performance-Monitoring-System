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




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */


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
/*!40000 ALTER TABLE `injury` DISABLE KEYS */
;
INSERT INTO
    `injury`
VALUES (
        401,
        'Hamstring strain',
        21,
        '2023-10-15',
        'Mild',
        'Muscle'
    ),
    (
        402,
        'ACL tear',
        180,
        '2023-09-01',
        'Severe',
        'Ligament'
    ),
    (
        403,
        'Ankle sprain',
        14,
        '2023-11-05',
        'Mild',
        'Joint'
    ),
    (
        404,
        'Concussion',
        10,
        '2023-10-28',
        'Moderate',
        'Head'
    ),
    (
        405,
        'Fractured metatarsal',
        90,
        '2023-11-10',
        'Severe',
        'Bone'
    );
/*!40000 ALTER TABLE `injury` ENABLE KEYS */
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
/*!40000 ALTER TABLE `match` DISABLE KEYS */
;
INSERT INTO
    `match`
VALUES (
        501,
        'Red Lions',
        'Blue Tigers',
        'National Arena',
        'Red Lions'
    ),
    (
        502,
        'Green Eagles',
        'Yellow Panthers',
        'City Stadium',
        'Draw'
    ),
    (
        503,
        'Black Wolves',
        'Red Lions',
        'Olympic Park',
        'Red Lions'
    ),
    (
        504,
        'Blue Tigers',
        'Green Eagles',
        'United Ground',
        'Green Eagles'
    ),
    (
        505,
        'Yellow Panthers',
        'Black Wolves',
        'Royal Field',
        'Yellow Panthers'
    );
/*!40000 ALTER TABLE `match` ENABLE KEYS */
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
-- Table structure for table `training_records`
--

DROP TABLE IF EXISTS `training_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
create table training_records (
    `PLAYER_ID` varchar(20) NOT NULL,
    `TRAINING_ID` varchar(20) NOT NULL,
    PRIMARY KEY (`PLAYER_ID`, `TRAINING_ID`),
    KEY `TRAINING_ID` (`TRAINING_ID`),
    CONSTRAINT `training_records_ibfk_1` FOREIGN KEY (`PLAYER_ID`) REFERENCES `player` (`PLAYER_ID`),
    CONSTRAINT `training_records_ibfk_2` FOREIGN KEY (`TRAINING_ID`) REFERENCES `training` (`TRAINING_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `training_records`
--

LOCK TABLES `training_records` WRITE;
/*!40000 ALTER TABLE `training_records` DISABLE KEYS */
;
INSERT INTO
    `training_records`
VALUES (1001, 301),
    (1006, 301),
    (1002, 302),
    (1007, 302),
    (1003, 303),
    (1008, 303),
    (1004, 304),
    (1009, 304),
    (1005, 305),
    (1010, 305);
/*!40000 ALTER TABLE `training_records` ENABLE KEYS */
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
-- Table structure for table `training`
--

DROP TABLE IF EXISTS `training`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
create table training (
    `TRAINING_ID` varchar(20) NOT NULL,
    `SESSION` varchar(100) DEFAULT NULL,
    `DISTANCE_COVERED` decimal(5, 2) DEFAULT NULL,
    `SPRINT_COUNT` int DEFAULT NULL,
    `SHOTS_ON_TARGET` int DEFAULT NULL,
    `DURATION` time DEFAULT NULL,
    `PASSING_ACCURACY` int DEFAULT NULL,
    PRIMARY KEY (`TRAINING_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `training`
--

LOCK TABLES `training` WRITE;
/*!40000 ALTER TABLE `training` DISABLE KEYS */
;
INSERT INTO
    `training`
VALUES (
        301,
        'Morning Session',
        5.20,
        25,
        18,
        '01:30:00',
        85
    ),
    (
        302,
        'Afternoon Session',
        6.80,
        32,
        22,
        '02:00:00',
        78
    ),
    (
        303,
        'Recovery Session',
        3.50,
        12,
        10,
        '01:00:00',
        90
    ),
    (
        304,
        'Intensive Session',
        8.10,
        45,
        30,
        '02:30:00',
        75
    ),
    (
        305,
        'Tactical Session',
        4.70,
        20,
        15,
        '01:45:00',
        88
    );
/*!40000 ALTER TABLE `training` ENABLE KEYS */
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

DROP TABLE IF EXISTS `training_records`;
DROP TABLE IF EXISTS `training`;

-- Disable foreign key checks temporarily to avoid constraint conflicts
SET FOREIGN_KEY_CHECKS = 0;
CREATE TABLE `training` (
        `training_id` VARCHAR(20) PRIMARY KEY,
        `time_of_day` ENUM('Morning','Afternoon','Evening') NOT NULL,
        `type` VARCHAR(50) NOT NULL,
        `focus` VARCHAR(100) NOT NULL,
        `activities` JSON DEFAULT NULL,
        `intensity` ENUM('High','Medium','Low') NOT NULL,
        `duration` VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create sequence-like table for training_id generation
DROP TABLE IF EXISTS `training_sequence`;
CREATE TABLE `training_sequence` (
    `next_val` INT DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `training_sequence` VALUES (4); -- Start from 4 since we'll insert TRN001, TRN002, TRN003

-- Seed session types (VARCHAR IDs with sequence pattern)
INSERT INTO `training` (`training_id`,`time_of_day`,`type`,`focus`,`activities`,`intensity`,`duration`) VALUES
    ('TRN001','Morning','Physical','Strength & Conditioning', JSON_ARRAY('Box jumps','Sprints','Weight training'),'High','90 mins'),
    ('TRN002','Afternoon','Tactical','Team Coordination', JSON_ARRAY('Formation drills','Set pieces','Match simulation'),'Medium','120 mins'),
    ('TRN003','Evening','Mental','Recovery & Focus', JSON_ARRAY('Stretching','Video analysis','Mindfulness'),'Low','60 mins');


--
-- Table structure for table `training_records`
--

DROP TABLE IF EXISTS `training_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `training_records` (
    `training_id` VARCHAR(20) NOT NULL,
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
        CASE WHEN MOD(d.n,3)=0 THEN 'TRN001' WHEN MOD(d.n,3)=1 THEN 'TRN002' ELSE 'TRN003' END AS training_id,
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

-- Re-enable foreign key checks after table creation and data insertion
SET FOREIGN_KEY_CHECKS = 1;
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

-- Reporting views for frontend charts with extensive GROUP BY and aggregate functions
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

-- Player performance summary with GROUP BY and aggregates
CREATE OR REPLACE VIEW player_performance_summary AS
SELECT 
    tr.player_id,
    p.PLAYER_NAME,
    COUNT(*) AS total_sessions,
    AVG(tr.distance_covered) AS avg_distance,
    MAX(tr.distance_covered) AS max_distance,
    MIN(tr.distance_covered) AS min_distance,
    SUM(tr.distance_covered) AS total_distance,
    AVG(tr.passing_accuracy) AS avg_passing_accuracy,
    MAX(tr.passing_accuracy) AS max_passing_accuracy,
    AVG(tr.sprint_count) AS avg_sprint_count,
    SUM(tr.sprint_count) AS total_sprints,
    AVG(tr.shots_on_target) AS avg_shots_on_target,
    SUM(tr.shots_on_target) AS total_shots_on_target
FROM training_records tr
JOIN player p ON tr.player_id = p.PLAYER_ID
GROUP BY tr.player_id, p.PLAYER_NAME;

-- Training type performance with GROUP BY
CREATE OR REPLACE VIEW training_type_performance AS
SELECT 
    t.training_id,
    t.type AS training_type,
    t.focus,
    COUNT(tr.player_id) AS total_participants,
    AVG(tr.distance_covered) AS avg_distance,
    AVG(tr.passing_accuracy) AS avg_accuracy,
    AVG(tr.sprint_count) AS avg_sprints,
    AVG(tr.shots_on_target) AS avg_shots
FROM training t
JOIN training_records tr ON t.training_id = tr.training_id
GROUP BY t.training_id, t.type, t.focus;

-- Daily team performance with GROUP BY and aggregates
CREATE OR REPLACE VIEW daily_team_performance AS
SELECT 
    tr.day,
    COUNT(DISTINCT tr.player_id) AS active_players,
    COUNT(*) AS total_sessions,
    AVG(tr.distance_covered) AS team_avg_distance,
    SUM(tr.distance_covered) AS team_total_distance,
    AVG(tr.passing_accuracy) AS team_avg_accuracy,
    MAX(tr.passing_accuracy) AS best_accuracy,
    MIN(tr.passing_accuracy) AS worst_accuracy,
    AVG(tr.sprint_count) AS team_avg_sprints,
    SUM(tr.sprint_count) AS team_total_sprints
FROM training_records tr
GROUP BY tr.day
ORDER BY tr.day DESC;

-- Weekly performance aggregation with GROUP BY
CREATE OR REPLACE VIEW weekly_performance AS
SELECT 
    YEARWEEK(tr.day) AS week_year,
    DATE(DATE_SUB(tr.day, INTERVAL WEEKDAY(tr.day) DAY)) AS week_start,
    COUNT(DISTINCT tr.player_id) AS unique_players,
    COUNT(*) AS total_sessions,
    AVG(tr.distance_covered) AS weekly_avg_distance,
    SUM(tr.distance_covered) AS weekly_total_distance,
    AVG(tr.passing_accuracy) AS weekly_avg_accuracy,
    AVG(tr.sprint_count) AS weekly_avg_sprints,
    AVG(tr.shots_on_target) AS weekly_avg_shots
FROM training_records tr
GROUP BY YEARWEEK(tr.day), DATE(DATE_SUB(tr.day, INTERVAL WEEKDAY(tr.day) DAY))
ORDER BY week_year DESC;

-- Player ranking with GROUP BY and window functions
CREATE OR REPLACE VIEW player_rankings AS
SELECT 
    tr.player_id,
    p.PLAYER_NAME,
    AVG(tr.distance_covered) AS avg_distance,
    AVG(tr.passing_accuracy) AS avg_accuracy,
    RANK() OVER (ORDER BY AVG(tr.distance_covered) DESC) AS distance_rank,
    RANK() OVER (ORDER BY AVG(tr.passing_accuracy) DESC) AS accuracy_rank,
    RANK() OVER (ORDER BY AVG(tr.sprint_count) DESC) AS sprint_rank
FROM training_records tr
JOIN player p ON tr.player_id = p.PLAYER_ID
GROUP BY tr.player_id, p.PLAYER_NAME;

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