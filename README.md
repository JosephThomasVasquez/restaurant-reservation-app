# Restaurant Reservation System

# Demo here: [Perodic Tables](https://jv-restaurant-client.herokuapp.com/dashboard)

## Description

The Restaurant Reservation System is a complete Full-stack application for creating and editing reservations including cancelling reservations, and also creating tables and seating reservations to tables with real time updates using React.

### The following **Reservation** features let you:

- Create reservations
- Edit reservations
- Cancel reservations
- Search reservations by date
- Search reservations by partial matching a mobile number
- Display realtime status of reservations such as "booked", "seated", "finished", or "cancelled"

### The following **Table** features let you:

- Create tables
- Seat a reservation to a table
- Displays realtime status of tables that are "free" or "occupied"

## Project Management

Utilized Github Projects for tracking and implementing user stories and issues from Backlog, Upcoming, In Progress, Ready, to finally Deployed.

## Backend API Routing

| Reservation Routes                     |   Method   |   Status Code   |                                                    Description |
| -------------------------------------- | :--------: | :-------------: | -------------------------------------------------------------: |
| `/reservations`                        |    POST    |       201       |                                      Creates a new reservation |
| `/reservations`                        |    GET     |       200       |                   Fetches all reservations by the current date |
| `/reservations?date=yyyy-dd-mm`        |    GET     |       200       |                     Fetches all reservations with a date query |
| `/reservations/:reservationsId`        |    GET     |       200       |                   Fetches reservation data with reservation id |
| `/reservations/:reservationsId`        |    PUT     |       200       |                        Updates reservation with reservation id |
| `/reservations/:reservationsId/status` |    PUT     |       200       |                 Updates reservation status with reservation id |
| **Table Routes**                       | **Method** | **Status Code** |                                                **Description** |
| `/tables`                              |    POST    |       201       |                                            Creates a new table |
| `/tables`                              |    GET     |       200       |                                             Fetches all tables |
| `/tables/:tableId`                     |    GET     |       200       |                               Fetches table data with table id |
| `/tables/:tableId/seat`                |    PUT     |       200       | Seats and assigns a reservation to the table with the table id |

# Stack

|                                                                                                                                                                                   |              |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ------------ |
|     <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/logos/react-logo.png" alt="drawing" width="50"/>     | React        |
| <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/logos/react-router-logo.png" alt="drawing" width="100"/> | React Router |
|  <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/logos/bootstrap-4-logo.png" alt="drawing" width="50"/>  | Bootstrap    |
|   <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/logos/express-logo.png" alt="drawing" width="100"/>    | Express      |
|  <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/logos/postgreSQL-logo.png" alt="drawing" width="100"/>  | PostgreSQL   |
|       <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/logos/knex.png" alt="drawing" width="100"/>        | Knex         |
|    <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/logos/nodejs-logo.png" alt="drawing" width="100"/>    | Node         |
