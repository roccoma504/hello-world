import FlatButton from 'material-ui/FlatButton';
import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

// Constant map to region colors.
const regionColor = {
    "Africa"   : '#f44336',
    "Americas" : '#9C27B0',
    "Asia"     : '#2196F3',
    "Europe"   : '#00BCD4',
    "Oceania"  : '#4CAF50',
    "Polar"    : '#FFC107'
}

// Adds commas to numbers.
// TODO: Figure out why toLocal isn't working.
function numberWithCommas(x) {
    if (x !== undefined && x !== "N/A") {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
    }
    else {
        return ("N/A")
    }
}

// Defines a MUI card. The card is configured to be expandable.
// The additional required information is under the expansion.
const NationCard = (props) => (
  <Card>
    <CardHeader
      title={props.additionalData.name}
      subtitle={props.additionalData.region}
      subtitleColor={regionColor[props.additionalData.region]}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
        <FlatButton label={"Population: "+numberWithCommas(props.additionalData.population)}/>
        <FlatButton label={"Area: " + numberWithCommas(props.additionalData.area)}/>
        <FlatButton label={"Population Density: "+ numberWithCommas(props.additionalData.density)}/>
    </CardActions>
    <CardText expandable={true}>
        <ul>
            <li><b>Population (people): </b> {numberWithCommas(props.additionalData.population)}</li>
            <li><b>Area (square kilometers): </b> {numberWithCommas(props.additionalData.area)}</li>
            <li><b>Population density (person(s) per kilometer squared): </b> {numberWithCommas(props.additionalData.density)}</li>
            <li><b>Alpha 2 code: </b> {props.additionalData.alpha2Code}</li>
            <li><b>Capital city: </b> {props.additionalData.capital}</li>
            <li><b>Number of timezone(s): </b> {props.additionalData.timezones.length}</li>
            <li><b>Spoken languages:</b> {props.additionalData.languages.sort().toString()}</li>
        </ul>
    </CardText>
  </Card>
);

export default NationCard;