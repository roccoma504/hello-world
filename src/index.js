import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from './components/button';
import CardExampleExpandable from './components/gridlist'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Constants
// Define the base URL for flex when building enpoints.
const baseURL = "https://restcountries.eu/rest/v1/"

// Variables
// Expandable endpoint variable.
var endpoint = "region/africa"

var Loading = require('react-loading');

// Contains all information about the nations
var nationInfoArray = [];

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

// Format the data for display. We cat all the info together that we need.
function formatedNationInfo(nationInfoArray) {
    // Modfied for display.
    var nationDisplayArray = [];
   /* for (var y = 0; y < nationInfoArray.length; y++) {
        nationDisplayArray[y] = nationInfoArray[y].name.toLocaleString() + " " + nationInfoArray[y].population.toLocaleString() + "(people) " + nationInfoArray[y].density.toLocaleString() + ("(people/km^2)")
    }*/
    for (var y = 0; y < nationInfoArray.length; y++) {
        nationDisplayArray[y] = nationInfoArray[y].name.toLocaleString() + " " + nationInfoArray[y].region.toLocaleString()
    }
    return nationDisplayArray;
}

// Basic sort function by name. Called on click and is the
// default load. Need it in the global scope for now.
function nameSort(increment) {
    nationInfoArray.sort(function (a, b) {
        if (increment) {
            return a.name.localeCompare(b.name);
        }
        else {
            return b.name.localeCompare(a.name);
        }
    })
   // displayNation(formatedNationInfo(nationInfoArray))
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
        console.log(nationInfoArray)
        nameSort(true)
        displayNation(nationInfoArray)
    }
}

function displayNation(nationInfoArray) {
    var names = [];
    var regions = [];
    for (var i = 0; i < nationInfoArray.length; i++) {
        names.push(nationInfoArray[i]["name"])
        regions.push(nationInfoArray[i]["region"])
    }
        
    var Hello = React.createClass({
    render: function() {    
    var namesList = names.map(function(name){
    var foundCountry = {}
    var additionalData = []

    // Find the country in the list of countries to get the other data.
    // TODO: Find a quicker way to do this, the search takes a while.
    for (var i = 0; i < nationInfoArray.length; i++) {
        if (nationInfoArray[i].name == name) {
            foundCountry = nationInfoArray[i]
            return <CardExampleExpandable key={name} additionalData={foundCountry} />
        }
    }            

    })
        return <ul>{namesList}</ul>
    }
});


const rootElement = (
      <MuiThemeProvider>
            <div>
    <Button name="Sort By Name" isPrimary={true} isSecondary={false} onClick={nameSort}/>
    <Button name="Sort By Population Density" isPrimary={false} isSecondary={true} />
            <Hello/>
            </div>
      </MuiThemeProvider>

        );

        ReactDOM.render(
            rootElement,
            document.getElementById('root')
        );

}

const App = () => (
  <MuiThemeProvider>
    <div>
    
</div>
        </MuiThemeProvider>
  
    
);

ReactDOM.render(
        <App/>,
        document.getElementById('root')
    );

    getNationInfo(baseURL + endpoint)

