# [BUSKAMOVE](https://www.github.com/HR-Spaghetti-20/blue-ocean "Buskamove")<br> <sup>By Spaghetti 2.0</sup>

## INTRODUCTION
Have you ever needed to keep track of where your favorite street performers are posting up for the weekend?  Or perhaps, you want to let your fans know where your next underground comedy show is.

Sounds like you need Buskamove: a social networking app that helps performers and their audiences locate and schedule performances.

## CONTENTS
1. [Authors](#authors)
1. [Installation](#installation)
1. [API Documentation](#api-documentation)
    * [/updatePerformances](#get-updateperformances)
    * [/performersNearby](#get-performersnearby)
    * [/getUser](#get-getuser)
    * [/updateUser](#post-updateuser)
    * [auth routes](#post-login)


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
| GET |  [/updatePerformances](#get-updateperformances) |
| POST | [/updatePerformances](#post-updateperformances) |
| PATCH | [/updatePerformances](#patch-updateperformances)
| GET |  [/performersNearby](#get-performersnearby) |
| GET |  [/getUser](#get-getuser) |
| POST |  [/updateUser](#post-updateuser) |
| POST | [/login](#post-login) |
| POST | [/signup](#post-signup) |
| GET | [/signout](#get-signout) |






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

```

<br>


### POST /updatePerformances
Adds a new performance to performer specified.
|Request| Name | Type | Description
|-------|----|-----|---------|
|PARAMS | none| | |
| BODY |  username | String | Username of the performer
| BODY | location | Object | Latitude & longitude of a location
| BODY | time | String (Date) | Date of performance
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
PATCH /updatePerformance request body example
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

### GET /performersNearby
Retrieves a list of performances from each performer.
|Request| Name | Type | Description
|-------|----|-----|---------|
| PARAMS | location | Object | latitude and longitude of location selected on the map.
| PARAMS | searchRadius | Number (Integer) | Maximum number of miles a performer can be to be included in results.


```
GET /performersNearby request params example
 {
    "location": {
        "lat": 29.506480007607525,
        "lng": -98.45167516406251
    },
    "searchRadius": 5
  }

```

|Response|
|--------|
|200 OK|

```
GET /performersNearby response example
 {
    username: 'Jemaine',
    password: 'password',
    is_performer: true,
    name: 'Jemaine Clement',
    bio: 'a New Zealand actor.',
    user_picture: 'https://upload.wikimedia.org/cropped%29.jpg',
    social_media: { twitter:'https://twitter.com/AJemaineClement' },
    categories: [ 'Comedy', 'Music' ],
    favorites: [],
    band: {name: 'Flight of The Conchords'},
    media: ['https://www.youtube.com/embed/sOgC8qp_I2Y'
    ],
    performances:
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
      },
      {
       "location": {
          "lat": 25.34584932325,
          "lng": -87.43583854343
        },
        "time": "Thu Dec 17 2021 12:00:00 GMT-0600 (Central Standard Time)",
        "category": "laughing-1.svg",
        "additionalPerformers": null,
        "_id": "867d810b4b861bac4d78f161",
      }
    ]
  }

```
<br>





### GET /getUser
Retrieves all user information for indicated user
|Request| Name | Type | Description
|-------|----|-----|---------|
| PARAMS | username | String | username for the profile you are looking for.
| BODY | none


|Response|
|--------|
|200 OK|

```
GET /getUser response example
 {
    username: 'Jemaine',
    password: 'password',
    is_performer: true,
    name: 'Jemaine Clement',
    bio: 'a New Zealand actor.',
    user_picture: 'https://upload.wikimedia.org/cropped%29.jpg',
    social_media: { twitter:'https://twitter.com/AJemaineClement' },
    categories: [ 'Comedy', 'Music' ],
    favorites: [],
    band: {name: 'Flight of The Conchords'},
    media: ['https://www.youtube.com/embed/sOgC8qp_I2Y'
    ],
    performances:
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
      },
      {
       "location": {
          "lat": 25.34584932325,
          "lng": -87.43583854343
        },
        "time": "Thu Dec 17 2021 12:00:00 GMT-0600 (Central Standard Time)",
        "category": "laughing-1.svg",
        "additionalPerformers": null,
        "_id": "867d810b4b861bac4d78f161",
      }
    ]
  }

```
<br>



### POST /updateUser
Updates the given user's information
|Request| Name | Type | Description
|-------|----|-----|---------|
| PARAMS | none
| BODY |  username | String | username of the user
| BODY | name | String | full name of user
| BODY | is_performer | Boolean | set whether user is a performer
| BODY | bio | String | bio information for user
| BODY | user_picture | String | URL of user's profile picture.
| BODY | social_media | Object | Object with key/value pairs for social media sites like Facebook.
| BODY | categories | Array (Strings) | Music / Dance / Comedy / Other.
| BODY | media | Array (Strings) | URLs for images or videos to display on profile


```
POST /updateUser request body example
 {
    username: 'Jemaine',
    is_performer: true,
    name: 'Jemaine Clement',
    bio: 'a New Zealand actor.',
    user_picture: 'https://upload.wikimedia.org/cropped%29.jpg',
    social_media: { twitter:'https://twitter.com/AJemaineClement' },
    categories: [ 'Comedy', 'Music' ],
    band: {name: 'Flight of The Conchords'},
    media: ['https://www.youtube.com/embed/sOgC8qp_I2Y'
    ]
  }

```

|Response|
|--------|
|200 OK|

<br>


### POST /login
Log in by providing your username and password
|Request| Name | Type | Description
|-------|----|-----|---------|
| BODY |  username | String | username of the user
| BODY |  password | String | secret string known only to the user


```
POST /login request body example
 {
   username: 'spaghetti',
   password: 'password'
 }

```

|Response|
|--------|
|200 OK|
|403 Not Registered: User instructed to signup

<br>



### POST /signup
Signup by providing username and password
|Request| Name | Type | Description
|-------|----|-----|---------|
| BODY |  username | String | username of the user
| BODY |  password | String | secret string known only to the user


```
POST /signup request body example
 {
   username: 'spaghetti',
   password: 'password'
 }

```

|Response|
|--------|
|200 OK|
|403 Not Registered: User instructed to signup

<br>



### GET /signout
Log out of the application.
|Request| Name |
|-------|----|
| PARAMS |  none
| BODY |  none

|Response|
|--------|
|200 OK: User logged out

