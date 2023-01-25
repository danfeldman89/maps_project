# maps_project
A map based client and server, displaying different routes and waypoints

Client - a create-react-app client using

* Typescript
* Material-UI component library
* deck.gl - a map visualization library working in tandem with MapBox
* gpxparser - a library for parsing gpx on the client

Server - a node server using:

* Typescript
* Express
* Mongoose - working in tandem with mongodb database on localhost:27017

The server populates the db with mock data (obviously an anti-pattern in commercial use).
the server exposes the following API urls: 

* /api/routes - (GET) provides a list of available routes on the database
* /api/routes/:id - (GET) provides all data about a specific routes
