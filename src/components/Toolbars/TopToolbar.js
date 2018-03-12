import React from 'react';
import {Navbar, Nav, MenuItem, NavDropdown, Button, FormControl, FormGroup} from "react-bootstrap";
import Aux from '../../hoc/Auxx/Auxx';

const controls = (props) => (
    <Aux>
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a>Tweeter</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" onChange={props.handleChange} placeholder="Username"/>
                        </FormGroup>{' '}
                        <Button onClick={props.handleSubmit} disabled={props.username === ""}>Load Tweets</Button>
                    </Navbar.Form>
                </Nav>
                <Nav pullRight>
                    <NavDropdown title="Filter by" id="basic-nav-dropdown" disabled={!props.tweetsShown}>
                        <MenuItem onSelect={() => props.handleFilterChange("date")}>Date</MenuItem>
                        <MenuItem onSelect={() => props.handleFilterChange("length")}>Length</MenuItem>
                        <MenuItem onSelect={() => props.handleFilterChange("num_of_likes")}>Number of Likes</MenuItem>
                        <MenuItem onSelect={() => props.handleFilterChange("mentions")}>Mentions</MenuItem>
                        <MenuItem onSelect={() => props.handleFilterChange("hashtags")}>Hashtags</MenuItem>
                    </NavDropdown>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text"
                                         onChange={props.handleQueryChange}
                                         disabled={!props.tweetsShown}
                                         placeholder="Find"
                                         value={props.filteringQuery}/>
                        </FormGroup>
                    </Navbar.Form>
                    <NavDropdown title="Sort" id="basic-nav-dropdown" disabled={!props.tweetsShown}>
                        <MenuItem onSelect={props.handleSortLikes}>Number of Likes</MenuItem>
                        <MenuItem onSelect={props.handleSortDate}>Date</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Aux>
);

export default controls;