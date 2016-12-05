import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CardExampleExpandable from './components/gridlist'
import injectTapEventPlugin from 'react-tap-event-plugin';
import RadioButtonExampleSimple from './components/radio'
import LinearProgress from 'material-ui/LinearProgress';
import AppBar from 'material-ui/AppBar';

injectTapEventPlugin();

// Constants
// Define the base URL for flex when building enpoints.
const baseURL = "https://restcountries.eu/rest/v1/"

// Variables
// Expandable endpoint variable.
var endpoint = "all"

// Contains all information about the nations
var nationInfoArray = [];

// Nation array sorted by name.
// Note: Array is always sorted by region first.
var isNameSorted = true;

// Functions
// Generic async request found @ w3school.
function getNationInfo(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        // This means the response is ready from the server.
        // 4 - Response is ready
        if (xmlHttp.readyState===4) {
            // 200 - Good request
            if (xmlHttp.status===200) {
                // console.log(xmlHttp.responseText);
                parseJSON(xmlHttp.responseText)
            } else { //There was some issue
                window.alert("HTTP error: " + xmlHttp.status +
                    ". Try reloading the page.")
            }
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

// Basic sort function by name. Called on click.
function nameSort(increment) {
    nationInfoArray.sort(function (a, b) {
            return a.region.localeCompare(b.region) || a.name.localeCompare(b.name) 
    })
}

// Basic sort function by density. Called on click..
function densitySort(increment) {
    nationInfoArray.sort(function (a, b) {
            return a.region.localeCompare(b.region) || parseFloat(a.density) - parseFloat(b.density)
    });
}

// Wrapper for JSON parsing. We should only get here if we got a valid response
// from the server.
function parseJSON(nationResponse) {
    // Parse the retrieved message.
    const parsedJSON = JSON.parse(nationResponse)

    // Build out data modal for sorting and display.
    buildModal(parsedJSON)

    // Builds the data modal based on the required data.
    function buildModal(parsedResponse) {
        /* Requirements state we need the following data
        - Name
        - alpha2Code
        - Capital
        - Region
        - Population
        - Area (Squared KM)
        - Number of timezones
        - List of languages spoken 
        - We also need to figure out population density with is people per square km
        */
        const keyArray = ["name", "alpha2Code", "capital", "region", "population", "area", "timezones", "languages", "area"]

        // Build our modal from the retrieved data and the required info.
        for (var i = 0; i < parsedJSON.length; i++) {
            var nationInfo = {}
            for (var infoKey = 0; infoKey < keyArray.length; infoKey++) {
                nationInfo[keyArray[infoKey]] = parsedResponse[i][keyArray[infoKey]]
            }

            // Check for area validity. It is assumed all countries
            // have at least a population of 1 so we don't check it.
            if (nationInfo["area"] === null) {
                nationInfo["area"] = 0
                nationInfo["density"] = 0
            } else {
                // Calculate the density rounded down which is the
                // general convention.
                nationInfo["density"] = Math.floor(nationInfo["population"] / nationInfo["area"])
            }
            nationInfoArray.push(nationInfo)
        }
        nameSort(true)
        displayNation(nationInfoArray)
    }
}

// Core display function. Contains a React class for a MUI
// card which is reused to display all the data.
function displayNation(nationInfoArray) {
    var names = [];
    
    // Create an array of just nation names.
    for (var i = 0; i < nationInfoArray.length; i++) {
        names.push(nationInfoArray[i]["name"])
    }
        
    // Recact class for displaying a MUI card.
    var Cards = React.createClass({
    render: function() {    
    var namesList = names.map(function(name){
    var foundCountry = {}
    // Find the country in the dict of countries to get the other data.
    for (var i = 0; i < nationInfoArray.length; i++) {
        if (nationInfoArray[i].name === name) {
            foundCountry = nationInfoArray[i]
            return (
                <div key={name}>
                    <CardExampleExpandable key={name} additionalData={foundCountry} subtitleColor="#D24D57"/>
                    <br/>
                </div>
            )}}})
        return <ul>{namesList}</ul>
        }
    });
    
// Function for radio buttons.
function onChange(value) {
    if (isNameSorted) {
        isNameSorted = false
        densitySort(true)
    }
    else {
        isNameSorted = true
        nameSort(true)
    }
    displayNation(nationInfoArray)
}
 
// Defines element that is showed after a successful request.
const cardElement=(
    <MuiThemeProvider>
        <div>
            <AppBar title="Nation Info"/>
            <br/>
            <RadioButtonExampleSimple change={onChange}/>
            <br/>
            <Cards/>
        </div>
      </MuiThemeProvider>);
    ReactDOM.render(
        cardElement,
        document.getElementById('root'));
}

// Defines element that is showed at page load.
const App=() => (
    <MuiThemeProvider>
        <div>
            <AppBar title="Nation Info Is Loading"/>
            <br/>
            <LinearProgress mode="indeterminate" />
        </div>
    </MuiThemeProvider>
);

ReactDOM.render(
        <App/>,
        document.getElementById('root'));

// Fire off request on load.
getNationInfo(baseURL + endpoint)

