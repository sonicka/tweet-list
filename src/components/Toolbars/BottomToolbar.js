import React from 'react';
import {Button, Navbar} from "react-bootstrap";
import classes from './Toolbars.css';

const bottomToolbar = (props) => (
    <Navbar className={classes.Navbar} fixedBottom>
        <Button className={classes.Button}
                bsStyle="primary"
                onClick={props.clicked}
                disabled={!props.tweetsShown}>Show Statistics</Button>
    </Navbar>
);

export default bottomToolbar;