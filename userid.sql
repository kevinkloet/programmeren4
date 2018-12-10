-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema gamedb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gamedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gamedb` DEFAULT CHARACTER SET utf8 ;
USE `gamedb` ;

-- -----------------------------------------------------
-- Table `gamedb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamedb`.`users` ;

CREATE TABLE IF NOT EXISTS `gamedb`.`users` (
  `ID` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(32) NOT NULL,
  `lastname` VARCHAR(32) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `email` (`email` ASC))
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gamedb`.`producer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamedb`.`producer` ;

CREATE TABLE IF NOT EXISTS `gamedb`.`producer` (
  `ID` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`ID`))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `gamedb`.`games`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamedb`.`games` ;

CREATE TABLE IF NOT EXISTS `gamedb`.`games` (
  `ID` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(32) NOT NULL,
  `producer` INT(10) UNSIGNED NOT NULL,
  `year` INT(10) UNSIGNED NOT NULL,
  `Type` ENUM('FIRST_PERSON_SHOOTER', 'THIRD_PERSON_SHOOTER', 'ADVENTURE', 'PUZZLE', 'COMBAT', 'UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
  `LaatstGewijzigdOp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userid` INT(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  INDEX `userid` (`userid` ASC),
  INDEX `fk_games_producer1_idx` (`producer` ASC),
  CONSTRAINT `games_ibfk_1`
  FOREIGN KEY (`userid`)
  REFERENCES `gamedb`.`users` (`ID`),
  CONSTRAINT `fk_games_producer1`
  FOREIGN KEY (`producer`)
  REFERENCES `gamedb`.`producer` (`ID`)
                                                                   ON DELETE NO ACTION
                                                                   ON UPDATE NO ACTION)
  ENGINE = InnoDB
  AUTO_INCREMENT = 8
  DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `producer` (`Name`) VALUES
('EA'),
('Epic games'),
('Mojang');

INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`) VALUES
('firstname', 'lastname', 'test@test.com', 'secret');

INSERT INTO `games` (`title`, `producer`, `year`, `type`, `userid`) VALUES
('Battlefield 5', 1, 2018, 'FIRST_PERSON_SHOOTER', 1),
('Fortnite', 2, 2017, 'THIRD_PERSON_SHOOTER', 1),
('Minecraft', 3, 2009, 'ADVENTURE', 1);
