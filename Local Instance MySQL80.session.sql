-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema p_dbms
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema p_dbms
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `p_dbms` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `p_dbms` ;

-- -----------------------------------------------------
-- Table `p_dbms`.`coach`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`coach` (
  `COACH_ID` INT NOT NULL,
  `COACH_NAME` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`COACH_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`team` (
  `TEAM_ID` INT NOT NULL,
  `TEAM_NAME` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`TEAM_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`administered`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`administered` (
  `COACH_ID` INT NOT NULL,
  `TEAM_ID` INT NOT NULL,
  PRIMARY KEY (`COACH_ID`, `TEAM_ID`),
  INDEX `TEAM_ID` (`TEAM_ID` ASC) VISIBLE,
  CONSTRAINT `administered_ibfk_1`
    FOREIGN KEY (`COACH_ID`)
    REFERENCES `p_dbms`.`coach` (`COACH_ID`),
  CONSTRAINT `administered_ibfk_2`
    FOREIGN KEY (`TEAM_ID`)
    REFERENCES `p_dbms`.`team` (`TEAM_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`player_stats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`player_stats` (
  `STATS_ID` INT NOT NULL,
  `GOALS` INT NULL DEFAULT '0',
  `ASSISTS` INT NULL DEFAULT '0',
  `FOULS` INT NULL DEFAULT '0',
  `YELLOW_CARDS` INT NULL DEFAULT '0',
  `RED_CARDS` INT NULL DEFAULT '0',
  `MINUTES_PLAYED` INT NULL DEFAULT '0',
  PRIMARY KEY (`STATS_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`match`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`match` (
  `MATCH_ID` INT NOT NULL,
  `TEAM_ONE` VARCHAR(100) NULL DEFAULT NULL,
  `TEAM_TWO` VARCHAR(100) NULL DEFAULT NULL,
  `STADIUM` VARCHAR(100) NULL DEFAULT NULL,
  `WINNING_TEAM` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`MATCH_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`belongs_to`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`belongs_to` (
  `STATS_ID` INT NOT NULL,
  `MATCH_ID` INT NOT NULL,
  PRIMARY KEY (`STATS_ID`, `MATCH_ID`),
  INDEX `MATCH_ID` (`MATCH_ID` ASC) VISIBLE,
  CONSTRAINT `belongs_to_ibfk_1`
    FOREIGN KEY (`STATS_ID`)
    REFERENCES `p_dbms`.`player_stats` (`STATS_ID`),
  CONSTRAINT `belongs_to_ibfk_2`
    FOREIGN KEY (`MATCH_ID`)
    REFERENCES `p_dbms`.`match` (`MATCH_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`injury`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`injury` (
  `INJURY_CASE_ID` INT NOT NULL,
  `MEDICAL_REPORT` TEXT NULL DEFAULT NULL,
  `RESTING_PERIOD` INT NULL DEFAULT NULL,
  `INJURY_DATE` DATE NULL DEFAULT NULL,
  `SEVERITY` VARCHAR(50) NULL DEFAULT NULL,
  `TYPE` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`INJURY_CASE_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`player` (
  `PLAYER_ID` INT NOT NULL,
  `PLAYER_NAME` VARCHAR(100) NULL DEFAULT NULL,
  `HEIGHT` DECIMAL(5,2) NULL DEFAULT NULL,
  `WEIGHT` DECIMAL(5,2) NULL DEFAULT NULL,
  `CONTRACT` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`PLAYER_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`medical_staffs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`medical_staffs` (
  `STAFF_ID` INT NOT NULL,
  `STAFF_NAME` VARCHAR(100) NULL DEFAULT NULL,
  `SPECIALIZATION` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`STAFF_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`injury_records`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`injury_records` (
  `PLAYER_ID` INT NOT NULL,
  `INJURY_CASE_ID` INT NOT NULL,
  `STAFF_ID` INT NOT NULL,
  PRIMARY KEY (`PLAYER_ID`, `INJURY_CASE_ID`, `STAFF_ID`),
  INDEX `INJURY_CASE_ID` (`INJURY_CASE_ID` ASC) VISIBLE,
  INDEX `STAFF_ID` (`STAFF_ID` ASC) VISIBLE,
  CONSTRAINT `injury_records_ibfk_1`
    FOREIGN KEY (`PLAYER_ID`)
    REFERENCES `p_dbms`.`player` (`PLAYER_ID`),
  CONSTRAINT `injury_records_ibfk_2`
    FOREIGN KEY (`INJURY_CASE_ID`)
    REFERENCES `p_dbms`.`injury` (`INJURY_CASE_ID`),
  CONSTRAINT `injury_records_ibfk_3`
    FOREIGN KEY (`STAFF_ID`)
    REFERENCES `p_dbms`.`medical_staffs` (`STAFF_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`part_in`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`part_in` (
  `MATCH_ID` INT NOT NULL,
  `TEAM_ID` INT NOT NULL,
  PRIMARY KEY (`MATCH_ID`, `TEAM_ID`),
  INDEX `TEAM_ID` (`TEAM_ID` ASC) VISIBLE,
  CONSTRAINT `part_in_ibfk_1`
    FOREIGN KEY (`MATCH_ID`)
    REFERENCES `p_dbms`.`match` (`MATCH_ID`),
  CONSTRAINT `part_in_ibfk_2`
    FOREIGN KEY (`TEAM_ID`)
    REFERENCES `p_dbms`.`team` (`TEAM_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`player_performance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`player_performance` (
  `PLAYER_ID` INT NOT NULL,
  `STATS_ID` INT NOT NULL,
  PRIMARY KEY (`STATS_ID`, `PLAYER_ID`),
  INDEX `PLAYER_ID` (`PLAYER_ID` ASC) VISIBLE,
  CONSTRAINT `player_performance_ibfk_1`
    FOREIGN KEY (`PLAYER_ID`)
    REFERENCES `p_dbms`.`player` (`PLAYER_ID`),
  CONSTRAINT `player_performance_ibfk_2`
    FOREIGN KEY (`STATS_ID`)
    REFERENCES `p_dbms`.`player_stats` (`STATS_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`plays_for`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`plays_for` (
  `PLAYER_ID` INT NOT NULL,
  `TEAM_ID` INT NOT NULL,
  PRIMARY KEY (`PLAYER_ID`, `TEAM_ID`),
  INDEX `TEAM_ID` (`TEAM_ID` ASC) VISIBLE,
  CONSTRAINT `plays_for_ibfk_1`
    FOREIGN KEY (`PLAYER_ID`)
    REFERENCES `p_dbms`.`player` (`PLAYER_ID`),
  CONSTRAINT `plays_for_ibfk_2`
    FOREIGN KEY (`TEAM_ID`)
    REFERENCES `p_dbms`.`team` (`TEAM_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`training`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`training` (
  `TRAINING_ID` INT NOT NULL,
  `SESSION` VARCHAR(100) NULL DEFAULT NULL,
  `DISTANCE_COVERED` DECIMAL(5,2) NULL,
  `SPRINT_COUNT` INT NULL,
  `SHOTS_ON_TARGET` INT NULL,
  `DURATION` TIME NULL,
  `PASSING_ACCURACY` INT NULL,
  PRIMARY KEY (`TRAINING_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `p_dbms`.`training_records`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `p_dbms`.`training_records` (
  `PLAYER_ID` INT NOT NULL,
  `TRAINING_ID` INT NOT NULL,
  PRIMARY KEY (`PLAYER_ID`, `TRAINING_ID`),
  INDEX `TRAINING_ID` (`TRAINING_ID` ASC) VISIBLE,
  CONSTRAINT `training_records_ibfk_1`
    FOREIGN KEY (`PLAYER_ID`)
    REFERENCES `p_dbms`.`player` (`PLAYER_ID`),
  CONSTRAINT `training_records_ibfk_2`
    FOREIGN KEY (`TRAINING_ID`)
    REFERENCES `p_dbms`.`training` (`TRAINING_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
