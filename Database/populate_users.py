import mysql.connector
import names
from faker import Faker

fake = Faker('it_IT')

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="",
  database="bikesharing"
)

mycursor = mydb.cursor()

arr = []

sql = "INSERT INTO users (email, password, username, name, surname, address, birthdate) VALUES (%s, %s, %s, %s, %s, %s, %s)"

for index in range(100):
    name = names.get_first_name()
    surname = names.get_last_name()
    email = name + surname + "@fake.it"
    username = name + "_" + surname
    arr.append(username)
    birthdate = fake.date_of_birth(None, 16, 80)

    address =                       \
    fake.street_name() + " " +      \
    fake.building_number() + ", " + \
    fake.postcode() + " " +         \
    fake.city() + " (BG)" 

    print(name, surname, email, username, birthdate)
    print(address)
    print("")
    
    val = \
        (email, \
         "$2y$10$t6hOdFcr9ovD84b/kqtYBOXwbwix9LY1FBy0qyhVPOFXPr0VKahBa", \
        username, name, surname, address, birthdate)

    mycursor.execute(sql, val)
    mydb.commit()

f=open('users.txt','w')
for index in arr:
    f.write(index+'\n')
f.close()
