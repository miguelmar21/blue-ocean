# [BUSKAMOVE](https://www.github.com/HR-Spaghetti-20/blue-ocean "Buskamove")<br> <sup>By Spaghetti 2.0</sup>

## INTRODUCTION
Have you ever needed to keep track of where your favorite street performers are posting up for the weekend?  Or perhaps, you want to let your fans know where your next underground comedy show is.

Sounds like you need Buskamove: a social networking app that helps performers and their audiences locate and schedule performances.

## CONTENTS
1. [Authors](#authors)
1. [Installation](#installation)
1. [API Documentation](#api-documentation)

<BR>

---



## AUTHORS
* Project Manager
  * Adam Rakla
* UI Design
  * Miguel Regalado
  * Max Zhao
* Architecture
  * Prince Addai
  * Jeff DeSouza

##### Note: Because the team was so small, everyone took part in Architecture and Design.  Also, each team member's full stack work threaded data through the MongoDB database and React UI components.

<br>

---

## INSTALLATION
**Prequisites:** Git, Express, NodeJS, React, an Internet connection and web browser. <br>
**3rd Party APIS:** Google Maps

**STEP ONE:** Clone down the repo from github.  If you're reading this, you're not far from completing this step! <br>
```HTTPS:```
  > git clone https://github.com/HR-Spaghetti-20/blue-ocean.git

 ```SSH:```
  > git clone git@github.com:HR-Spaghetti-20/blue-ocean.git

<br>

**STEP TWO:** Install dependencies using node package manager.
  > npm install

<br>

**STEP THREE:** Build the project using webpack.
  > npm run build

<br>

**STEP FOUR:** Start the express server to receive requests from the front end.
  > npm start

<br>

**STEP FIVE:** Open a web browser and navigate to http://localhost:3000

<br>

**STEP SIX:**
  > profit.

<br>

<br>

---

## API DOCUMENTATION

| Endpoints |                  |
| ----| ---------------------|
| GET |  [/updatePerformances](#get-/updateperformances) |
| POST | [/updatePerformances](#post-/updateperformances) |
| PATCH | [/updatePerformances](#patch-/updateperformances)

<br>

### GET /updatePerformances
Retrieves a list of performances from each performer.
|Request| |
|-------|----|
|PARAMS | none |
| BODY |  none |

|Response|
|--------|
|200 OK|



```
GET /updatePerformances response example
[
 {
    "location": {
        "lat": 29.506480007607525,
        "lng": -98.45167516406251
    },
    "time": "Thu Dec 16 2021 22:00:00 GMT-0600 (Central Standard Time)",
    "category": "laughing-1.svg",
    "additionalPerformers": null,
    "_id": "61bac4d78f161867d810b4b8",
    "username": "adamrakla@gmail.com"
  }
]
```

<br>


### POST /updatePerformances
Adds a new performance to performer specified.
|Request| | Type | Description
|-------|----|-----|---------|
|PARAMS | none | | |
| BODY |  username | String | Username of the performer
| BODY | location | Object | Latitude & longitude of a location
| BODY | time | String (format) | Date of performance
| BODY | category | String | URL of category icon
| BODY | additionalPerformers | Array | Any other performers that will be present at performance.


```
POST /updatePerformance body example
 {
    "username": "adamrakla@gmail.com",
    "location": {
        "lat": 29.506480007607525,
        "lng": -98.45167516406251
    },
    "time": "Thu Dec 16 2021 22:00:00 GMT-0600 (Central Standard Time)",
    "category": "http://www.example.com/laugh.svg",
    "additionalPerformers": null,
  }
```


|Response|
|--------|
|201 CREATED|



<br>

### PATCH /updatePerformances
Removes a performance based on username and location.
|Request| | Type | Description
|-------|----|-----|---------|
|PARAMS | none | | |
| BODY |  username | String | Username of the performer
| BODY | lat | Number | Latitude coordinate of performance
| BODY | lng | Number | Longitude coordinate of performance


```
PATCH /updatePerformance body example
  {
    "username": "adamrakla@gmail.com",
    "lat": 29.506480007607525,
    "lng": -98.45167516406251
  }
```


|Response|
|--------|
|200 OK|



<br>



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

