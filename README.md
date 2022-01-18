# [BUSKAMOVE](https://www.github.com/HR-Spaghetti-20/blue-ocean "Buskamove")<br> <sup>By Spaghetti 2.0</sup>

## INTRODUCTION
Have you ever needed to keep track of where your favorite street performers are posting up for the weekend?  Or perhaps, you want to let your fans know where your next underground comedy show is.

Sounds like you need Buskamove: a social networking app that helps performers and their audiences locate and schedule performances.

## CONTENTS
1. [Authors](#authors)
2. [Features](#features)
3. [Installation](#installation)
4. [API Documentation](#api-documentation)
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
## FEATURES
Finding performances <br>
![Map-GIF](https://user-images.githubusercontent.com/76494184/149995986-dae74874-961f-4d66-a4a1-2cff1c92306d.gif) <br>
The main feature of this app. You can traverse through the map (which has about the same functionality of a google map) to find performances scattered across the world. You also have the ability to search any area of your liking by typing it on the search bar on top of the map. Clicking the compass on the far right of the map will use google's API to take you to your current location. When viewing a particular area, the app will notify you of nearby performers. Although not shown here, you can click on the filter button that is found below the compass to view performances by date and time. Finally, you can click on a performance icon to view the specific details of that one performance. <br> <br>
Profiles <br>
![Profiles-GIF](https://user-images.githubusercontent.com/76494184/149993900-581b1392-92f3-45f7-a90c-9148116f5579.gif) <br>
You can login if you already have an account by clicking the login button on the top left to automatically view your profile and edit it to your liking. In the edit modal you can change your name, bio, profile pictures, social medias and more. On the top of the profiles section, you can search up other profiles by typing in their name and or username. This will bring you to the profile of the searched user where you can view their information as well as their posted photos or videos. You also have the option to favorite and unfavorite a profile by clicking the heart found on the top right of the profile section.<br> <br>
Performer Access <br>
![Performers-GIF](https://user-images.githubusercontent.com/76494184/149993926-609a184e-7631-4115-b8f4-d9caf768dda8.gif) <br>
If you are a performer (which can be toggled on and off in your edit profile menu), you can click on any area of the map to create a performance and update its details. You can choose the category and date/time in the module that pop ups after clicking on the map. Once created, your performance will remain on the map unless you decide to delete it which can be done by clicking on the performance in question. You can only delete performances that are created by you and only you.
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

**STEP SIX:** Environment variables!  You need to create two files:
1. /server/config.env

    which includes three variables:
    >PORT = 3000

    >MONGO_URI = mongodb+srv://[username]:[password]@spaghetti-cluster.p5ovz.mongodb.net/buskamove

    Please use your MongoDB Atlas username and password for the MONGO_URI
    >NODE_ENV = development

2. /config.js (root folder)

    which includes the API key needed for google maps:
    >API_KEY = '0123456DEFGhijklmnopqrSTUV'
    module.exports = API_KEY

  Note: Please be sure that your config.env file's values are NOT in quotes, and that your config.js file's value IS in quotes.

<br>


**STEP SEVEN:**
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
|Request| Name | Type | Description
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

