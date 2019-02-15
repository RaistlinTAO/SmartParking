# Smart Parking

The server is up and running at: http://manyi.ga:4000/

##ChangeLog
*15/02/2019 Data source is now using Google Map

###Basic Structure

- [x] Basic Map intergration
- [x] Server inplementation
- [X] Server GET function for locations
- [X] Server Fetch data from 3rd party sources

####Features

- [ ] Show Public Car parks on the map with icon (1)- within x range  
- [ ] Show Private Car Parks on the map with icon (2)- within x range
- [ ] Show Private Car PArks with Charging Station on the map with icon (3) within x range
- [ ] Use Manual Search to book at Time now for Private Car Park - 
	route to car park 

####Nice to have 
- [ ] Use Manual Search to book at Time X for Private Car Park - 
	have a pop up that can be 

- [ ] Use Manual Search to route at Time now for Puiblic Car Park - 
	Start iterate update 
		if free do nothing
		else Find and Route to Closest Public

- [ ] Find and route to Closest Public
	Start iterate update 
		if free do nothing
		else Find and Route to Closest Public

###Deploy Instructions
```
/
-"start": "react-scripts start"
-"build": "react-scripts build"
-"test": "react-scripts test"
-"eject": "react-scripts eject"
```
```
/service
"start": "node ./bin/www"
```