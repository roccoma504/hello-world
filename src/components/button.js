import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Button = (props) => (
  <RaisedButton 
    label={props.name}
    primary={props.isPrimary}
    secondary={props.isSecondary}/>
);

export default Button;