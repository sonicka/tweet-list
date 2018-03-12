import React from 'react';
import {Navbar, Nav, MenuItem, NavDropdown, Button, FormControl, FormGroup} from "react-bootstrap";
import Aux from '../../hoc/Auxx/Auxx';

const controls = (props) => (
    <Aux>
        <Navbar collapseOnSelect>
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
                        <Button onClick={props.handleSubmit}>Load Tweets</Button>
                    </Navbar.Form>
                </Nav>
                <Nav pullRight>
                    <NavDropdown eventKey={3} title="Filter by" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1} onSelect={() => props.handleFilterChange("date")}>Date</MenuItem>
                        <MenuItem eventKey={3.2} onSelect={() => props.handleFilterChange("length")}>Length</MenuItem>
                        <MenuItem eventKey={3.3} onSelect={() => props.handleFilterChange("num_of_likes")}>Number of Likes</MenuItem>
                        <MenuItem eventKey={3.4} onSelect={() => props.handleFilterChange("mentions")}>Mentions</MenuItem>
                        <MenuItem eventKey={3.5} onSelect={() => props.handleFilterChange("hashtags")}>Hashtags</MenuItem>
                    </NavDropdown>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text"
                                         onChange={props.handleQueryChange}
                                         placeholder="Find"
                                         value={props.filteringQuery}/>
                        </FormGroup>
                    </Navbar.Form>
                    <NavDropdown eventKey={3} title="Sort" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1} onSelect={props.handleSortLikes}>Number of Likes</MenuItem>
                        <MenuItem eventKey={3.2} onSelect={props.handleSortDate}>Date</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Aux>
);

export default controls;