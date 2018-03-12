import React from 'react';
import classes from './Tweet.css';

const tweet = (props) => {
    let tweetUrl = "https://twitter.com/i/web/status/" + props.tweet.id;
    let authorUrl = "https://twitter.com/" + props.tweet.author;
    return (
        <div className={classes.Tweet}>
            <h3>{props.tweet.text} </h3>
            <a target="_blank" href={tweetUrl}>View Full Tweet</a>
            <br/>
            <br/>
            <h5>posted by <a target="_blank" href={authorUrl}>{props.tweet.author}</a> on {props.tweet.date}</h5>
            <p>{props.tweet.num_of_likes} Likes</p>
        </div>
    )
};

export default tweet;