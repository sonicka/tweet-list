import React from 'react';
import classes from './InputField.css';

const inputField = (props) => {

    return (
        <div className={classes.Input}>
            <input className={classes.InputElement}
                   type="text"
                   value={props.username}
                   onChange={props.handleChange}
                   placeholder="username"/>
            <button
                className={classes.SubmitButton}
                type="submit"
                onClick={props.handleSubmit}>Load Tweets</button>
        </div>
    );
};

export default inputField;