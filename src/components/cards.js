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

// Adds (s) to words depending on value. 
function wordsWithS(base,value) {
    if (value > 1) {
        return (base + "s ")
    }
    else {
        return(base + " ")
    }
}

// Adds (s) to words depending on value. 
function plural(value) {
    if (value > 1) {
        return ("are ")
    }
    else {
        return("is ")
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
            <li>{"There are " + numberWithCommas(props.additionalData.population) + " people."}</li>
            <li>{"The area is " + numberWithCommas(props.additionalData.area) + " square kilometers."}</li>
            <li>{"The population density is " + numberWithCommas(props.additionalData.density) + " people per square kilometers"}</li>
            <li>{"The alpha 2 code is " + props.additionalData.alpha2Code}</li>
            <li>{"The capital city is " + props.additionalData.capital}</li>
            <li>{"There " + plural(props.additionalData.timezones.length) + props.additionalData.timezones.length + wordsWithS(" timezone",props.additionalData.timezones.length)}</li>
            <li>{"The spoken languages are " + props.additionalData.languages}</li>
        </ul>
    </CardText>
  </Card>
);

export default NationCard;