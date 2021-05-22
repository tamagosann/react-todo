import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
  
const Selector = (props) => {
  const classes = useStyles();

  const progressData = [
    0,10,20,30,40,50,60,70,80,90,100,
  ]

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        value={props.progress}
        onChange={props.onChange}
      >
        {progressData.map(data => {
          return <MenuItem key={data} value={data}>{data.toString() + '%'}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
}

export default Selector;
