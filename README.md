# <span style="color:#ffd92f">Periodic Tables</span>

## <span style="color:#ffd92f">Restaurant Reservation System</span>

# Demo here: [Periodic Tables](https://jv-restaurant-client.herokuapp.com/dashboard)

## <span style="color:#ffd92f">Description</span>

The Restaurant Reservation System is a complete Full-stack application for managing reservations and tables. You can create, edit, cancel, and seat reservations to a table. The dashboard displays the reservations for the current date and you can go backward or forward by day to display reservations from another date. All reservations show the persons first and last name, mobile number, time of reservations, guest count, and status. You can also create tables and seat reservations to an available table with real time updates using React.

### <span style="color:#ffb13b">**Reservation** features</span>:

- Create reservations
- Edit reservations
- Cancel reservations
- Search reservations by date
- Search reservations by partial matching a mobile number
- Display realtime status of reservations such as "booked", "seated", "finished", or "cancelled"

### <span style="color:#ffb13b">**Table** features</span>:

- Create tables
- Seat a reservation to a table
- Displays realtime status of tables that are "free" or "occupied"

## <span style="color:#ffd92f">Project Management</span>

Utilized Github Projects for tracking and implementing user stories and issues from Backlog, Upcoming, In Progress, Ready, to finally Deployed.

## <span style="color:#ffd92f">Backend API Routing</span>

| <span style="color:#ffb13b">Reservation Routes</span> |   Method   |   Status Code   |                                                    Description |
| ----------------------------------------------------- | :--------: | :-------------: | -------------------------------------------------------------: |
| `/reservations`                                       |    POST    |       201       |                                      Creates a new reservation |
| `/reservations`                                       |    GET     |       200       |                   Fetches all reservations by the current date |
| `/reservations?date=yyyy-dd-mm`                       |    GET     |       200       |                     Fetches all reservations with a date query |
| `/reservations/:reservationsId`                       |    GET     |       200       |                   Fetches reservation data with reservation id |
| `/reservations/:reservationsId`                       |    PUT     |       200       |                        Updates reservation with reservation id |
| `/reservations/:reservationsId/status`                |    PUT     |       200       |                 Updates reservation status with reservation id |
| <span style="color:#ffb13b">**Table Routes**</span>   | **Method** | **Status Code** |                                                **Description** |
| `/tables`                                             |    POST    |       201       |                                            Creates a new table |
| `/tables`                                             |    GET     |       200       |                                             Fetches all tables |
| `/tables/:tableId`                                    |    GET     |       200       |                               Fetches table data with table id |
| `/tables/:tableId/seat`                               |    PUT     |       200       | Seats and assigns a reservation to the table with the table id |

## <span style="color:#ffd92f">Dashboard view</span>

|                                                                                    Desktop                                                                                     |                                                                                      Mobile                                                                                       |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/desktop/dashboard-HD.jpg" alt="drawing"/> | <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/mobile/dashboard-mobile.jpg" alt="drawing"/> |

## <span style="color:#ffd92f">Search view</span>

|                                                                                   Desktop                                                                                   |                                                                                     Mobile                                                                                     |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/desktop/search-HD.jpg" alt="drawing"/> | <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/mobile/search-mobile.jpg" alt="drawing"/> |

## <span style="color:#ffd92f">Create / Edit Reservation view</span>

|                                                                                         Desktop                                                                                         |                                                                                           Mobile                                                                                           |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/desktop/create-reservation-HD.jpg" alt="drawing"/> | <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/mobile/create-reservation-mobile.jpg" alt="drawing"/> |
|  <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/desktop/edit-reservation-HD.jpg" alt="drawing"/>  |  <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/mobile/edit-reservation-mobile.jpg" alt="drawing"/>  |

## <span style="color:#ffd92f">Seat Reservation view</span>

|                                                                                        Desktop                                                                                        |                                                                                          Mobile                                                                                          |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/desktop/seat-reservation-HD.jpg" alt="drawing"/> | <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/mobile/seat-reservation-mobile.jpg" alt="drawing"/> |

## <span style="color:#ffd92f">New Table view</span>

|                                                                                      Desktop                                                                                      |                                                                                        Mobile                                                                                        |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/desktop/create-table-HD.jpg" alt="drawing"/> | <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/mobile/create-table-mobile.jpg" alt="drawing"/> |

## <span style="color:#ffd92f">Error handling</span>

All API methods have middleware validation and send responses back to the front-end at the top of the page. The errors are displayed across all views with a dismissable alert of the required inputs or if there is a problem sending or receiving data.

## Example:

|                                                                                                                                                                                                   |                                                                                                                                                                                                 |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/error-display/dashboard-error.jpg" alt="drawing" />      |   <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/error-display/create-table-error.jpg" alt="drawing" />   |
| <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/error-display/create-reservation-error.jpg" alt="drawing" /> | <img src="https://raw.githubusercontent.com/JosephThomasVasquez/starter-restaurant-reservation/main/front-end/src/images/screenshots/error-display/seat-reservation-error.jpg" alt="drawing" /> |

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
