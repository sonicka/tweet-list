import React from 'react';
import {Button, Navbar} from "react-bootstrap";
import Aux from '../../hoc/Auxx/Auxx';
import classes from './BottomToolbar.css';

const bottomToolbar = (props) => (
    <Aux>
        <Navbar className={classes.Navbar} fixedBottom>
            <Button className={classes.Button}
                    bsStyle="primary"
                    onClick={props.clicked}
                    disabled={!props.tweetsShown}>Show Statistics</Button>
        </Navbar>
    </Aux>
);

export default bottomToolbar;