import React from 'react'; 
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  block: {
    maxWidth: 350,
  },
  radioButton: {
    marginBottom: 25,
    width: "auto"
  },
};

// MUI radio buttons. Used for sorting.
// TODO: Pass in more prop info if used again.
export const RegionRadioButton = (props) => (
  <div>
    <RadioButtonGroup name="sort" defaultSelected="name" onChange={props.change} style={{display: "flex"}}>
      <RadioButton
        value="All"
        label="All"
        style={styles.radioButton}
      />
      <RadioButton
        value="Africa"
        label="Africa"
        style={styles.radioButton}
      />
      <RadioButton
        value="Americas"
        label="Americas"
        style={styles.radioButton}
      />
          <RadioButton
        value="Asia"
        label="Asia"
        style={styles.radioButton}
      />
              <RadioButton
        value="Europe"
        label="Europe"
        style={styles.radioButton}
      />
                  <RadioButton
        value="Oceania"
        label="Oceania"
        style={styles.radioButton}
      />
                      <RadioButton
        value="Polar"
        label="Polar"
        style={styles.radioButton}
      />
                      <RadioButton
        value="Other"
        label="Other"
        style={styles.radioButton}
      />
    </RadioButtonGroup> 
  </div>
);

export default RegionRadioButton;