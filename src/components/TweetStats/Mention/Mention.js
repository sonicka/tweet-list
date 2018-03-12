import React from 'react';
import classes from './Mention.css';

const mention = (props) => {
    return (
        <p className={classes.Mention}>{props.name}: {props.number}</p>
    )
};

export default mention;