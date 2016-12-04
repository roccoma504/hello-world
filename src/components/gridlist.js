import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const CardExampleExpandable = (props) => (
  <Card>
    this.setState(true)
    <CardHeader
      title={props.country}
      subtitle={props.region}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
    </CardActions>
    <CardText expandable={true}>
{props.additionalInfo}

    </CardText>
  </Card>
);

export default CardExampleExpandable;