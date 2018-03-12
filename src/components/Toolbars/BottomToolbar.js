import React from 'react';
import {Button, Navbar} from "react-bootstrap";
import Aux from '../../hoc/Auxx/Auxx';
import classes from './BottomToolbar.css';

const bottomToolbar = (props) => (
    <Aux>
        <Navbar className={classes.navbar} fixedBottom>
            <Button className={classes.button}
                    bsStyle="primary"
                    onClick={props.clicked}
                    disabled={!props.tweetsShown}>Show Statistics</Button>
        </Navbar>
    </Aux>
);

export default bottomToolbar;
