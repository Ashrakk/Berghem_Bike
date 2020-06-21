
#DELETE FROM rentals

#SELECT * 
#FROM bikes 
#WHERE bikes.`status` = 'available'

#SELECT email, username FROM users
#WHERE email = 'test' OR username = ''

#INSERT INTO users (username, email, birthdate, password)
#VALUES ('test', 'test', 'test', 'test');

#UPDATE rentals
#SET endTime = '2020-05-29 19:08:11', destination = 2, dist = 1.0
#WHERE IDUser_Rent = 28 AND endTime IS NULL

#SELECT *
#FROM rentals
#WHERE IDUser_Rent = 28 AND endTime IS NULL

#SELECT *
#FROM bikes
#WHERE location = 3 AND state = 'available'

#UPDATE bikes
#SET state = 'taken', location = NULL
#WHERE IDBike = 16

#UPDATE bikes
#SET state = 'available', location = 3
#WHERE IDBike = 16

#SELECT COUNT(*)
#FROM bikes
#WHERE location = 2 AND state = 'available'

#SELECT * FROM bikes WHERE state = 'available' AND location = 2

#INSERT INTO rentals (IDUser_Rent, startTime, origin) VALUES (28, '2020-05-29 18:08:11', 1)


#VIAGGI UTENTE
#DI SEMPRE CON LIMITE


#COMPLETE

/*
SELECT startTime, endTime, stationOrigin.stationName AS originName, stationDest.stationName AS destName, dist
FROM (SELECT *
		 FROM rentals
		 WHERE IDUser = 28
		 ORDER BY convert(startTime, datetime) DESC
		 LIMIT 0, 10
		 ) AS tab
		 INNER JOIN stations stationOrigin
		 ON tab.origin = stationOrigin.IDStation  
 		 INNER JOIN stations stationDest
		 ON tab.destination = stationDest.IDStation  
ORDER BY convert(startTime, datetime) DESC
*/

#NOT COMPLETE

#SELECT startTime, endTime, dist
#FROM rentals
#WHERE IDUser = 28

#CONTA VIAGGI

#SELECT COUNT(*) AS count
#FROM rentals
#WHERE IDUser = 28

#VIAGGI DI OGGI

#SELECT *
#FROM (SELECT *
#		 FROM rentals
#		 WHERE IDUser = 28
#		 ) tab
#WHERE startTime >= CURDATE() AND
#		startTime < DATE_ADD(CURDATE(), INTERVAL 1 DAY);


#SELECT stations.IDStation, stations.lat, stations.lon, stations.stationName, stations.stationAddr, stations.slots, COUNT(*) AS available
#FROM stations
#INNER JOIN bikes
#ON bikes.location = stations.IDStation
#GROUP BY stations.IDStation

#SELECT COUNT(*) AS COUNT
#FROM stations