import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

const CardExampleExpandable = (props) => (
  <Card>
    <CardHeader
      title={props.additionalData.name}
      subtitle={props.additionalData.region}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
        <FlatButton label={"Population: "+numberWithCommas(props.additionalData.population)} />
        <FlatButton label={"Area: " + numberWithCommas(props.additionalData.area)} primary={true}  />
        <FlatButton label={"Population Density: "+ numberWithCommas(props.additionalData.density)} secondary={true} />
    </CardActions>
    <CardText expandable={true}>
        <ul>
            <li>{"There are " + numberWithCommas(props.additionalData.population) + " people."} </li>
            <li>{"The area is " + numberWithCommas(props.additionalData.area) + " square kilometers."} </li>
            <li>{"The population density is " + numberWithCommas(props.additionalData.density) + " people per square kilometer"} </li>
            <li>{"The alpha 2 code is " + props.additionalData.alpha2Code}</li>
            <li>{"The capital city is " + props.additionalData.capital}</li>
            <li>{"There are " + props.additionalData.timezones.length + " timezone(s)."}</li>
            <li>{"The spoken languages are " + props.additionalData.languages}</li>
        </ul>
    </CardText>
  </Card>
);

export default CardExampleExpandable;