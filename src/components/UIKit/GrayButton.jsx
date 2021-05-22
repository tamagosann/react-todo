import React from 'react';
import { Button } from '@material-ui/core';

const GreyButton = (props) => {
    return (
        <Button className={props.className} variant="contained" color="secondary" onClick={props.onClick}>
            {props.label}
        </Button>
    )
};

export default GreyButton;