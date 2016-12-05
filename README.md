Welcome to Nation Info!
===================
This is an attempt a React app by Matt Rocco.

CodeCov score [![Code Climate](https://codeclimate.com/github/roccoma504/hello-world/badges/gpa.svg)](https://codeclimate.com/github/roccoma504/hello-world)

References
-------------
A few tools were used to make this app.

- This app was made using the [react generator](https://github.com/facebookincubator/create-react-app)
- The Google [Material UI](http://www.material-ui.com/#/) was implemented 
- [w3 school](http://www.w3schools.com) got my JS and HTML mostly presentable
- Nation info was found at [rest countries](https://restcountries.eu)
- Colors were picked from [material UI Colors](https://www.materialui.co/colors)

Introduction
-------------
The purpose of this app was to display a data set containing nation information from a rest API.

The information is displayed using MUI cards.

Requirements
-------------------

The below were my interpretation and implementation of the requirements.

1) Display each of the worlds nations by region

 - **IMPLEMENTATION**: Display a card for each nation. Regardless of sort the cards will be first sorted by region. Colors will be used to have an easy identification of region.

2) Sorted by name or population

- **IMPLEMENTATION**: Allow the user to sort by name or by population via a radio button as I was't sure which one was needed.

 ![Image of button](https://github.com/roccoma504/hello-world/blob/master/images/radio.png)


3) Retrieve details of the given nation including:  

 1. Name
 2. Alpha2code
 3. Capital
 4. Region
 5. Population
 6. Area
 7. # of timezone
 8. Languages spoken
 
 **IMPLEMENTATION**: Created the cards to be expandable allowing the user to see additional data without clogging up the screen.
 
  ![Image of card closed](https://github.com/roccoma504/hello-world/blob/master/images/card_closed.png)

 
 ![Image of card](https://github.com/roccoma504/hello-world/blob/master/images/card.png)
 
 

 
Usage
-------------------
> cd 'project directory'

> npm start

> Navigate to port 3000

The app will load automatically. If there is an error the user will be notified.

The user can sort by name or sort by population density via a radio button. 

> **Note**: Data will be first sorted by region so a sort by name will be 
> Region -> Name

MUI Elements Implemented
-------------------

 - Appear Bar 
	 - For title
 - Progress Bar
	 - For showing loading of data during page load
 - Card/Flat Button
	 - Display information about nations
 - Radio Buttons
	 - For sorting

