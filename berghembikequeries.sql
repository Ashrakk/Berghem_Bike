#SELECT count(*) as Sufficenze 
#FROM   studenti 
#       INNER JOIN voti ON studenti.matricola = voti.matricola
#       INNER JOIN compiti ON voti.IDCompito = compiti.IDCompito
#WHERE studenti.IDClasse = '3AII' AND compiti.data = '2002-11-26' AND voti.voto >= 6

#SELECT * 
#FROM bikes 
#WHERE bikes.`status` = 'available'

#SELECT email, username FROM users
#WHERE email = 'test' OR username = ''

#INSERT INTO users (username, email, birthdate, password)
#VALUES ('test', 'test', 'test', 'test');