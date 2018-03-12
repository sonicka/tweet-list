import React from 'react'
import classes from './Sort.css';
import {DropdownButton, MenuItem} from 'react-bootstrap';

const sort = (props) => {
    return (
        <div>
            <select className={classes.Sort}>
                <option value="default" >Default Sort</option>
                <option value="date" onChange={(value) => props.sort(value)}>Date</option>
                <option value="likes" onChange={(value) => props.sort(value)}>Number of Likes</option>
            </select>
            <DropdownButton className={classes.DropdownButton} title="Sort" onSelect={props.sort}> {/*change the displayed value to the one chosen*/}
                <MenuItem eventKey='default'>Default Sort</MenuItem>
                <MenuItem eventKey='date'>Date</MenuItem>
                <MenuItem eventKey='likes'>Number of Likes</MenuItem>
            </DropdownButton>
        </div>
    )
};

export default sort;


/*
    sortBy(field) {
        let sortedTweets = this.state.tweets;
        if (field === "likes") {
            sortedTweets = sortedTweets.num_of_likes.sort(function (a, b) {
                return a - b
            });
            console.log("sorted " + sortedTweets);
        } else { // date
            //todo
        }
        this.setState({
            tweets: sortedTweets
        });
    }
 */
