import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const CardExampleExpandable = (props) => (
  <Card>
    <CardHeader
      title={props.additionalData.name}
      subtitle={props.additionalData.region}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
        <FlatButton label={props.additionalData.population} />
        <FlatButton label={props.additionalData.area} />
        <FlatButton label={props.additionalData.density} />
    </CardActions>
    <CardText expandable={true}>
        <ul>
            <li>{"The alpha 2 code is " + props.additionalData.alpha2Code}</li>
            <li>{"The capital city is " + props.additionalData.capital}</li>
            <li>{"The number of timezones are "}</li>
            <li>{"The spoken languages are" }</li>
        </ul>
    </CardText>
  </Card>
);

export default CardExampleExpandable;