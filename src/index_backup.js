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
var endpoint = "all"

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
    displayNation(formatedNationInfo(nationInfoArray))
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
    }
}

// Core display function.
function displayNation(nationData) {
    // Button style
    const styles = {
        baseButton: {
            fontSize: 15,
            textAlign: 'center',
            color: '#446CB3',
        }
    }

    // Basic sort function by density. Called on click, will
    // fire off display.
    function densitySort(increment) {
        nationInfoArray.sort(function (a, b) {
            if (increment) {
                return parseFloat(a.density) - parseFloat(b.density);
            }
            else {
                return parseFloat(b.density) - parseFloat(a.density);
            }
        });
        displayNation(formatedNationInfo(nationInfoArray))
    }

    function additionalInfo(index) {
        window.alert("clicked")
    }
    
        var Nation = React.createClass({
            render: function () {
                var namesList = nationData.map(function (name, index) {
                    return <li key={index} > {name} 
                <button style={styles.baseButton} onClick={additionalInfo} id={name} type="button">Info</button> </li>;
                })
                return <ol> {namesList} </ol> 
            }
        });

        const rootElement = (
            <div>
                <button style={styles.baseButton}
                    onClick={nameSort} type="button">Sort By Name </button> 
                <button style={styles.baseButton}
                    onClick={densitySort} type="button">Sort By Density </button>   
            <Nation/>
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
    const landingElement=( 
        <div>
            <h1 style={styles.titleText}>Nation Info</h1>   
            <h2 style={styles.baseText}> Built with React </h2>
            <h2 style={styles.baseText}> Loading info... </h2>
        <Loading align='center' type='spin' color='#446CB3'/>
        </div>
    );

    ReactDOM.render(
        landingElement,
        document.getElementById('root')
    );

    getNationInfo(baseURL + endpoint)