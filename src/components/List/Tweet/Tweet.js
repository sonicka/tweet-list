import React from 'react';

const tweet = (props) => {
    return (
        <div className={props.className}>
            <h3>{props.tweet.text}</h3>
            <br/>
            <h5>posted by {props.tweet.author} at {props.tweet.date}</h5>
            <p>{props.tweet.num_of_likes} Likes</p>
        </div>
    )
};

export default tweet;