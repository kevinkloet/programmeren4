DROP TABLE IF EXISTS `users` ;
CREATE TABLE IF NOT EXISTS `users` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`firstname` VARCHAR(32) NOT NULL,
	`lastname` VARCHAR(32) NOT NULL,
	`email` VARCHAR(64) NOT NULL UNIQUE,
	`password` VARCHAR(128) NOT NULL,
	PRIMARY KEY (`ID`)
)
ENGINE = InnoDB;

INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`) VALUES
('test', 'user', 'test@example.com', 'secret');