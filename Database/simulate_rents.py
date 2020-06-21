import mysql.connector
import names
from faker import Faker
from math import *
import random
from datetime import *

fake = Faker('it_IT')

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="",
  database="bikesharing"
)

mycursor = mydb.cursor()

arr = []

users           = "SELECT * FROM users"
stations        = "SELECT * FROM stations"
start           = "INSERT INTO rentals (IDUser, IDBike, startTime, origin) VALUES (%s, %s, %s, %s)"
searchCurrent   = "SELECT * FROM rentals WHERE IDUser = %s AND endTime IS NULL"
end             = "UPDATE rentals SET endTime = %s, destination = %s, dist = %s WHERE IDUser = %s AND endTime IS NULL"

getbikes        = "SELECT * FROM bikes WHERE state = 'available' AND location = %s"
getbikesCount   = "SELECT COUNT(*) FROM bikes WHERE location = %s AND state = 'available'"
takebike        = "UPDATE bikes SET state = 'taken', location = NULL WHERE IDBike = %s"
returnbike      = "UPDATE bikes SET state = 'available', location = %s WHERE IDBike = %s"

#get users file
mycursor.execute(users)
records = mycursor.fetchall()

users = []

for row in records:
    users.append(row[0])

#get stations

mycursor.execute(stations)
records = mycursor.fetchall()

stationsLat = []
stationsLon = []

for row in records:
    stationsLat.append(row[1])
    stationsLon.append(row[2])

stationsCount = len(stationsLat) + 1

ITERATIONS = 25

for user in users:
    dateStart = fake.date_time_between('+1y', '+2y')
    for index in range(ITERATIONS): 
        #init and update values
        timeRand = random.randrange(-3,3)
        dateStart = dateStart + timedelta(days = 1, hours = timeRand)
        dateEnd = dateStart + timedelta(hours = 1)
        stationOrigin = random.randrange(1,stationsCount)
        stationDest = random.randrange(1,stationsCount)
        distance = 0
    
        #get an available bike (if there is one)
        val = (stationOrigin,)
        mycursor.execute(getbikes, val)
        records = mycursor.fetchall()

        bikes = []

        for row in records:
            bikes.append(row[0])

        bikesCount = len(bikes)
        bikeid = 0

        if(bikesCount > 0):
            bikeid = bikes[random.randrange(0,bikesCount)]
        else:
            continue

        #take the available bike

        val = (bikeid,)
        mycursor.execute(takebike, val)
        mydb.commit()

        #start new activity

        val =           \
            (user,      \
            bikeid,     \
            dateStart.strftime("%Y/%m/%d %H:%M:%S"), \
            stationOrigin)
        mycursor.execute(start, val)
        mydb.commit()

        #check if station destination has available slots
        while True:
            val = (stationDest,)
            mycursor.execute(getbikesCount, val)
            record = mycursor.fetchone()
            
            count = record[0]

            if(count < 50):
                #end current activity
                val = (stationDest, bikeid)
                mycursor.execute(returnbike, val)
                mydb.commit()
                break
            else:
                stationDest = random.randrange(1,stationsCount)

        #calculating distance between stations
        
        lat1 = radians(stationsLat[stationOrigin-1])
        lon1 = radians(stationsLon[stationOrigin-1])
        lat2 = radians(stationsLat[stationDest-1])
        lon2 = radians(stationsLon[stationDest-1])
        
        # approximate radius of earth in km
        R = 6373.0

        dlon = lon2 - lon1
        dlat = lat2 - lat1

        a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
        print(a)
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        print(c)

        distance = "%.1f" % (R * c)
        print(distance)

        
        val =               \
            (dateEnd.strftime("%Y/%m/%d %H:%M:%S"), \
            stationDest,    \
            distance,       \
            user)
        mycursor.execute(end, val)
        mydb.commit()
        