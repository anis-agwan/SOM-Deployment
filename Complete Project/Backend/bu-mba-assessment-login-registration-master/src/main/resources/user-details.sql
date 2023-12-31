CREATE TABLE `user`.`user_details` (
  `EMAIL_ID` varchar(25) NOT NULL,
  `B_NUMBER` varchar(9) NOT NULL,
  `PASSWORD` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'MD5(PASSWORD)',
  `FIRST_NAME` varchar(20) NOT NULL,
  `LAST_NAME` varchar(20) NOT NULL,
  `UPDT_STAT_CD` varchar(1) NOT NULL,
  `UPDT_TS` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`EMAIL_ID`),
  UNIQUE KEY `EMAIL_ID_UNIQUE` (`EMAIL_ID`),
  UNIQUE KEY `B_NUMBER_UNIQUE` (`B_NUMBER`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;