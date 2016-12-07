import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NationCard from './components/cards'
import React from 'react';
import ReactDOM from 'react-dom';
import SortRadioButton from './components/sortRadio'

// Safari issue where this is needed.
injectTapEventPlugin();

// Constants
// Define the base URL for flex when building enpoints.
const baseURL = "https://restcountries.eu/rest/v1/";

// Variables
// Expandable endpoint variable.
var endpoint = "all";

// Contains all information about the nations
var nationInfoArray = [];

// Nation array sorted by name.
// Note: Array is sorted by region first.
var isNameSorted = true;

// Nation array sorted by region.
var isRegionSorted = false;

// Functions
// Generic async request found @ w3school.
function getNationInfo(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        // The response is ready from the server.
        // 4 - Response is ready
        if (xmlHttp.readyState===4) {
            // 200 - Good request
            if (xmlHttp.status===200) {
                // console.log(xmlHttp.responseText);
                parseJSON(xmlHttp.responseText);
            } else { //There was some issue
                window.alert("HTTP error: " + xmlHttp.status +
                    ". Try reloading the page.");
            }
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

// Core sorting logic. Depending on checked flags we'll sort and redraw.
function calculateSort() {
    if (!isNameSorted) {
        if (isRegionSorted) {
        nationInfoArray.sort(function (a, b) {
            return a.region.localeCompare(b.region) || parseFloat(a.density) - parseFloat(b.density);
        });
    }
        else {
            nationInfoArray.sort(function (a, b) {
                return parseFloat(a.density) - parseFloat(b.density);
            });
        }   
    }
    else {
        if (isRegionSorted) {
            nationInfoArray.sort(function (a, b) {
                return a.region.localeCompare(b.region) || a.name.localeCompare(b.name);
        });
    }
        else {
            nationInfoArray.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });   
        }    
    }
    displayNation(nationInfoArray)
}

// Wrapper for JSON parsing. We should only get here if we got a valid response
// from the server.
function parseJSON(nationResponse) {
    // Parse the retrieved message.
    const parsedJSON = JSON.parse(nationResponse);

    // Build out data modal for sorting and display.
    buildModal(parsedJSON);

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
        const keyArray = ["name", "alpha2Code", "capital", "region", "population", "area", "timezones", "languages", "area"];

        // Build our modal from the retrieved data and the required info.
        for (var i = 0; i < parsedJSON.length; i++) {
            var nationInfo = {};
            for (var infoKey = 0; infoKey < keyArray.length; infoKey++) {
                nationInfo[keyArray[infoKey]] = parsedResponse[i][keyArray[infoKey]]
                // If the result is null replace it with N/A
                if (parsedResponse[i][keyArray[infoKey]] === null || parsedResponse[i][keyArray[infoKey]] === "") {
                    nationInfo[keyArray[infoKey]]="Unknown"
                }
                
                // If the key is area and its null, replace both area and density
                // with 0.
                if (keyArray === "area" && parsedResponse[i][keyArray[infoKey]] === null) {
                        nationInfo["area"] = 0
                        nationInfo["density"] = 0
                } 
                else {
                    // Calculate the density rounded down which is the
                    // general convention.
                    nationInfo["density"] = Math.floor(nationInfo["population"] / nationInfo["area"])
                }
                
                if (infoKey === keyArray.indexOf("languages") && parsedResponse[i][keyArray[infoKey]] !== null) {
                    for (var y = 0; y < nationInfo[keyArray[infoKey]].length; y++) {
                        //Convert languages to upper for viewing.
                        const newString = nationInfo[keyArray[infoKey]][y].toUpperCase()                        
                        nationInfo[keyArray[infoKey]][y] = newString
                    }
                }   
            }
            nationInfoArray.push(nationInfo)
        }
        calculateSort()
        displayNation(nationInfoArray)
    }
}

// Core display function. Contains a React class for a MUI
// card which is reused to display all the data.
function displayNation(nationInfoArray) {
    
    // Array of nation names.
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
                }
            }
            return (<div key={name}>
                        <NationCard key={name} additionalData={foundCountry} subtitleColor="#D24D57"/>
                        <br/>
                    </div>
                    )})        
        return <ul>{namesList}</ul>
        }  
    });
    
    // Defines element that is showed after a successful request.
    const cardElement=(
        <MuiThemeProvider>
            <div>
                <AppBar title="Nation Info - Sort"/>
                <br/>
                <SortRadioButton name={"sort"} defaultSelected={"name"} value1={"name"} label1={"Sort By Name"} value2={"density"} label2={"Sort By Population Density"} onChange={updateSort} onCheck={updateRegion}/>
                <Cards/>
            </div>
        
        </MuiThemeProvider>
        );
    
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

//TODO: Get the states instead of globals.
function updateSort() {
    isNameSorted = !isNameSorted
    calculateSort()
}

function updateRegion() {
    isRegionSorted = !isRegionSorted
    calculateSort()
}

// Fire off request on load.
getNationInfo(baseURL + endpoint)

