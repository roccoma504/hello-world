import React from 'react'; 
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  block: {
    maxWidth: 350,
  },
  radioButton: {
    marginBottom: 16,
      marginLeft: 0,
    width: "auto"
  },
};

// MUI radio buttons. Used for sorting.
// TODO: Pass in more prop info if used again.
export const SortRadioButton = (props) => (
  <div>
    <RadioButtonGroup name="sort" defaultSelected="name" onChange={props.change} style={{display: "flex"}}>
      <RadioButton
        value="name"
        label="Name"
        style={styles.radioButton}
      />
      <RadioButton
        value="density"
        label="By Population Density"
        style={styles.radioButton}
      />
    </RadioButtonGroup> 
  </div>
);

export default SortRadioButton;