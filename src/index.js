import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import './index.css';


//https://www.npmjs.com/package/react-loading


// Constants
// Define the base URL for flex when building enpoints.
const baseURL = "https://restcountries.eu/rest/v1/"

// Variables
// Expandable endpoint variable.
var endpoint = "region/africa"

var Loading = require('react-loading');


function tick() {
    ReactDOM.render( < App time = {
            "test"
        }
        />,
        document.getElementById('root')
    );
}

// Functions
// Generic async request found @ w3school.
function getNationInfo(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        // This means the response is ready from the server.
        // 4 - Response is ready
        if (xmlHttp.readyState === 4) {
            // 200 - Good request
            if (xmlHttp.status === 200) {
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

// Wrapper for JSON parsing. We should only get here if we got a valid response
// from the server.
function parseJSON(nationResponse) {
    // Parse the retrieved message.
    const parsedJSON = JSON.parse(nationResponse)

    //# TODO REmove
    /* const preface = "Population of "
    for (var i = 0; i < parsedJSON.length; i++) {
        console.log(preface + parsedJSON[i].name + " " + parsedJSON[i].population)
    }
    */

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

        var nationInfoArray = [];

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
        console.log(nationInfoArray)

        nationInfoArray.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        })

        nationInfoArray.sort(function (a, b) {
            return parseFloat(a.density) - parseFloat(b.density);
        });

        //displayURL(nationInfoArray[0].name)
    }

}


function displayURL(nationData) {
    const element = ( 
        <div>
        <p> {nationData} </p> 
        </div>
    );
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}

cost landingStyle = (
fontSize: 20
    
)

// Defines the landing element while we get data from the site.
const landingElement = (
    <div>
    <h1 style={landingStyle}> Nation Info </h1> 
    <h2> Built with Rect </h2> 
    <h2> Loading info... </h2> 
    <Loading type='spin' color='#446CB3' /> 
    </div>
);

ReactDOM.render(
    landingElement,
    document.getElementById('root')
);

getNationInfo(baseURL + endpoint)