import React from 'react'; 
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
radioButtonGroup: {
    marginBottom: 10,
    marginLeft: 5,
    width: "auto",
    padding: 10,
    labelPosition:'left',
    display: "flex",
    maxWidth: 500
  },
  radioButtonSmall: {
    marginBottom: 10,
    marginLeft: 5,
    width: 250,
    padding: 10,
    labelPosition:'left',
    display: "flex",
    maxWidth: 4000
  },
radioButtonLarge: {
    marginBottom: 10,
    marginLeft: 5,
    width: 400,
    padding: 10,
    labelPosition:'left',
    display: "flex",
    maxWidth: 4000
  },
  checkbox: {
    marginBottom: 16,
    maxWidth: 500,
  },
  content:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
    }
};

// MUI radio buttons. Used for sorting.
// TODO: Pass in more prop info if used again.
export const SortRadioButton = (props) => (
    <div>
        <Checkbox label="Group Regions" style={styles.checkbox} onCheck={props.onCheck}/>
        <RadioButtonGroup name={props.name} defaultSelected={props.defaultSelected} onChange={props.onChange} style={styles.radioButtonGroup}>
            <RadioButton value={props.value1} label={props.label1}style={styles.radioButtonSmall}/>
            <RadioButton value={props.value2} label={props.label2}style={styles.radioButtonLarge}/>
        </RadioButtonGroup> 
    </div>
);

export default SortRadioButton;