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
        displayNation(nationInfoArray[0].name + " Population: " + nationInfoArray[0].population + " Density: " + nationInfoArray[0].density)
    }
}



function displayNation(nationData) {

    
    var styles = {
        baseButton: {
            fontSize: 15,
            textAlign: 'center',
            color: '#446CB3',
        }
    }

    function nameSort() {
        nationInfoArray.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        })
displayNation(nationInfoArray[0].name + " Population: " + nationInfoArray[0].population + " Density: " + nationInfoArray[0].density)    }

    function densitySort() {
        nationInfoArray.sort(function (a, b) {
            return parseFloat(a.density) - parseFloat(b.density);
        });
displayNation(nationInfoArray[0].name + " Population: " + nationInfoArray[0].population + " Density: " + nationInfoArray[0].density)    }
    
    function additionalInfo() {
        window.alert()
    }
    
    const nationElement = (
    <div>
        <p> {nationData} <button style={styles.baseButton} onClick={additionalInfo} type="button">More Info </button></p>
          
    </div>);
        
  var Hello = React.createClass({
    render: function() {
    	var names = ['Jake', 'Jon', 'Thruster'];
        var namesList = names.map(function(name, index){
            			return <li key={ index }>{name} <button style={styles.baseButton} onClick={additionalInfo} type="button">More Info </button></li>;
          			})
                    
        return <ol>{namesList} </ol> 
    }
});

    const rootElement = ( 
        <div>
        <button style={styles.baseButton} onClick={nameSort}
            type="button">Sort By Name </button>  
        <button style={styles.baseButton} onClick={densitySort}
            type="button">Sort By Density</button>  
        <Hello/> 
        </div>
    );
    
    ReactDOM.render(
        rootElement,
        document.getElementById('root')
    );
}

var styles = {
    baseText: {
        fontSize: 20,
        textAlign: 'center'
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    }
}

// Defines the landing element while we get data from the site.
const landingElement = ( < div >
    <h1 style={styles.titleText}>Nation Info</h1>  
    <h2 style={styles.baseText}> Built with React </h2>  
    <h2 style={styles.baseText}>Loading info... </h2>  
    <Loading align='center' type='spin' color='#446CB3'/>
    </div>
);

ReactDOM.render(
    landingElement,
    document.getElementById('root')
);

getNationInfo(baseURL + endpoint)