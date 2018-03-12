import React from 'react';
import Tweet from './Tweet/Tweet';
import classes from './List.css';

const list = (props) => {

    let transformedTweets = Object.keys(props.list)
        .map(tweetKey => {
            return <Tweet tweet={props.list[tweetKey]}
                          key={tweetKey}/>
        }).reduce((array, item) => {
            return array.concat(item);
        }, []);

    if (transformedTweets.length === 0) {
        return <p>No tweets to show!</p>
    } else {
        return (
            <div className={classes.Wrapper}>
                <div className={classes.List}>
                    {transformedTweets}
                </div>
            </div>
        )
    }
};

export default list;