import React from 'react';
import {Navbar, Nav, MenuItem, NavDropdown, Button, FormControl, FormGroup} from "react-bootstrap";
import classes from "./Toolbars.css";

const topToolbar = (props) => (
    <Navbar className={classes.Navbar} fixedTop>
        <Navbar.Header>
            <Navbar.Brand>
                <a>Tweeter</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
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
                <NavDropdown title={props.tweetsShown && props.isFiltered ? props.setTitle() : "Filter by"}
                             id="basic-nav-dropdown"
                             disabled={!props.tweetsShown && !props.isFiltered}>
                    <MenuItem onSelect={() => props.handleFilterChange("text")}>Text</MenuItem>
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
                                     disabled={!props.isFiltered}
                                     placeholder="Find"
                                     value={props.filteringQuery}/>
                    </FormGroup>
                </Navbar.Form>
                <NavDropdown title={props.sortedBy}
                             id="basic-nav-dropdown"
                             disabled={!props.tweetsShown}>
                    <MenuItem onSelect={props.handleSortLikes}>Number of Likes</MenuItem>
                    <MenuItem onSelect={props.handleSortDate}>Date</MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default topToolbar;