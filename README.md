# [BUSKAMOVE](https://www.github.com/HR-Spaghetti-20/blue-ocean "Buskamove")<br> <sup>By Spaghetti 2.0</sup>

## CONTENTS
1. Introduction
1. Authors
1. Installation
1. API Documentation
1.

---

## INTRODUCTION
Have you ever needed to keep track of where your favorite street performers are posting up for the weekend? Or perhaps there's an underground comedian whose last-minute shows are hard to keep track of.  Or you want to let your fans know where your next dance performance is.  Sounds like you need Buskamove!<br><br>

### FEATURES
Buskamove is a social networking app that allows performers and their audiences locate and schedule performances.

## AUTHORS
Adam Rakla - Project Manager
Prince Addai -





## API DOCUMENTATION
---

//MIGUEL
Performance API

GET  /updatePerformances
Retrieves a list of performances from each performer

Response 200 OK

[
 {
    "location": {
        "lat": 29.506480007607525,
        "lng": -98.45167516406251
    },
    "time": "Thu Dec 16 2021 22:00:00 GMT-0600 (Central Standard Time)",
    "category": "https://upload.wikimedia.org/wikipedia/commons/e/e7/004-rolling-on-the-floor-laughing-1.svg",
    "additionalPerformers": null,
    "_id": "61bac4d78f161867d810b4b8",
    "username": "adamrakla@gmail.com"
}

]

POST /updatePerformances
Adds a new performance to performer specified

Body Parameters

Parameter
Type
Description
username
String
Username of performer
location
Object
Lat and lng coordinates of a location
time
String
Date of performance chosen
category
String
URL of category icon
additionalPerformers
Array
Any other performers that will be present at performance


Response: 201 CREATED


PATCH /updatePerformances
Removes a performance based on username and location

Body Parameters

Parameters
Type
Description
username
String
Username of performer
lat
Number
Latitude coordinate of performance
lng
Number
Longitude coordinate of performance

Response: 200 OK


//MAX
Performers Nearby API
Performers Nearby
GET /performersNearby Retrieves a list of performers relative to the current location of the map.
Parameters
Parameter
Type
Description
location
object
Contains the latitude and longitude values of the current location selected on the map.
Search Radius
integer
The maximum number of miles a performer can be from the location to get included inside of Performers Nearby.







Response
Status: 200 OK


//ADAM
GET  /getUser
Retrieves all user information for indicated user

Response 200 OK

{"data":
[{"social_media":
{"twitter":"https://twitter.com/?lang=en","facebook":"https://www.facebook.com/","instagram":"https://www.instagram.com/"},
"_id":"61bb75e2491ad7a99cf4ed06",
"username":"test@test.com",
"Is_performer":false,
"categories":["Music","Comedy","Dance"],
"Favorites":["61b5245688f5c61b8993cdbb"],
"media":["https://www.youtube.com/embed/e3EqY5gPrcU"],
"Performances":[],
"__v":0,
"bio":"This is to test the functionality of getUser API",
"name":"Tester",
"user_picture":"https://testenvironmentmanagement.com/wp-content/uploads/2015/10/wiki.png"}],
"Status":200,
"statusText":"OK",
"headers":{"access-control-allow-origin":"*",
"Connection":"keep-alive","content-length":"569",
"content-type":"application/json; charset=utf-8",
"date":"Thu, 16 Dec 2021 17:33:44 GMT",
"etag":"W/\"239-xKdwm9Ei3+XrZ72ZmsXOQgR1ouU\"",
"keep-alive":"timeout=5",
"x-powered-by":"Express"},
"config":
{"transitional":
{"silentJSONParsing":true,
"forcedJSONParsing":true,
"clarifyTimeoutError":false},
"transformRequest":[null],
"transformResponse":[null],
"Timeout":0,
"xsrfCookieName":"XSRF-TOKEN",
"xsrfHeaderName":"X-XSRF-TOKEN",
"maxContentLength":-1,
"maxBodyLength":-1,
"headers":
{"Accept":"application/json, text/plain, */*"},
"Params":
{"username":"test@test.com"},
"Method":"get",
"url":"http://localhost:3000/getUser"},
"Request":{}
}



//PRINCE
API Documentation

Summary

Auth Routes
 post /login
 post /signup
 get  /signout


Auth Routes

POST /login
Description: Log in by providing your username and password
Status:
 200 OK: Logged In
 403 Not Registered: User instructed to signup

 Parameter Type  Description
 username  String  user's name that'll be used to login
 password  String  Secret String known only to user

 Request Body Example:
 {
   username: 'spaghetti',
   password: 'password'
 }

POST /signup
Description: Signup by providing username and password
Status:
 200 OK: Logged In
 403 User already Registered: User instructed to login

 Parameter Type  Description
 username  String  user's name that'll be used to sign up
 password  String  Secret String known only to user

 Request Body Example:
 {
   username: 'spaghetti',
   password: 'password'
 }

GET /signout
Description: Log out
Status:
 200 OK: User logged out

