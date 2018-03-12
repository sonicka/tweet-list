import React, {Component} from 'react';
import Aux from '../Auxx/Auxx';
import Controls from '../../components/Controls/Controls';
import classes from './Layout.css'

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    render() {
        return (
            <Aux>
                <main className={classes.Content}> {this.props.children} </main>
            </Aux>
        )
    }
}

export default Layout;