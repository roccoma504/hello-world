import React from 'react'; 
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};



const RadioButtonExampleSimple = (props) => (
  <div>
    <RadioButtonGroup name="sort" defaultSelected="name" onChange={props.change}>
      <RadioButton
        value="name"
        label="Sort By Name"
        style={styles.radioButton}
      />
      <RadioButton
        value="density"
        label="Sort Sort By Population Density"
        style={styles.radioButton}
      />
    </RadioButtonGroup>
  </div>
);

export default RadioButtonExampleSimple;