Welcome to Nation Info!
===================
This is an attempt a React app by Matt Rocco.

code climate score [![Code Climate](https://codeclimate.com/github/roccoma504/hello-world/badges/gpa.svg)](https://codeclimate.com/github/roccoma504/hello-world)

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

 - **IMPLEMENTATION**: Display a card for each nation. There is a checkbox available to allow the user to group cards by region.
 
 This options will group cards by region and perform the selected sort (see 2). As an example if this box is checked and the Name sort is on, the user will see the Africa regionf first and within the group each African nation sorted by name. The regions are also color coded.
 
  ![Image of checkon](https://github.com/roccoma504/hello-world/blob/master/images/check_on.png)
  
  With the checkbox off the app will ignore region. In the same example as above, the user will be presented with all of the nations in order by name.
  
  ![Image of checkon](https://github.com/roccoma504/hello-world/blob/master/images/check_off.png)

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
 
  The additional information is in the section that can be expanded by the user. Data that is unknown (the API was lacking) is marked as unknown.
 
 
 
Usage
-------------------
> cd 'project directory'

> npm start

> Navigate to port 3000


MUI Elements Implemented
-------------------

 - Appear Bar 
	 - For title
 - Card/Flat Button
	 - Display information about nations
 - Checkbox
 	 - For grouping
 - Progress Bar
	 - For showing loading of data during page load
 - Radio Buttons
	 - For sorting

