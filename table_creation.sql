 use capstone_project_2025_1;

DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `phone_numbers`;


CREATE TABLE `phone_numbers` (
	`id` INT AUTO_INCREMENT NOT NULL,
    `country_code` INT NOT NULL,
    `digits` VARCHAR(16) NOT NULL,
    primary key(id)
);


CREATE TABLE `users` (
	`id` INT AUTO_INCREMENT NOT NULL,
    `name` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `phone_id` INT NOT NULL,
    primary key(id),
    foreign key(phone_id) references phone_numbers(id)
);


