import React from 'react';
import classes from './Tweet.css';

const tweet = (props) => {
    return (
        <div className={classes.Tweet}>
            <h3>{props.tweet.text}</h3>
            <br/>
            <h5>posted by {props.tweet.author} on {props.tweet.date}</h5>
            <br/>
            <p>{props.tweet.num_of_likes} Likes</p>
        </div>
    )
};

/*
TODO link in tweet make clickable
*/

export default tweet;