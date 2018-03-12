import React from 'react';
import Aux from '../../hoc/Auxx/Auxx';
import Mention from "./Mention/Mention";

const TweetStats = (props) => {

    const countLikes = (tweets) => {
        let tweetsCopy = [];
        let sumOfLikes = 0;
        if (tweets.length !== 0) {
            tweetsCopy = [...tweets];
            sumOfLikes = tweetsCopy.reduce((sum, tweet) => {
                return sum + tweet.num_of_likes;
            }, 0);
        }
        return sumOfLikes;
    };

    const countAvgLikes = (tweets) => {
        let sum = countLikes(tweets);
        let numberOfTweets = tweets.length;
        if (numberOfTweets > 0) {
            return (sum / numberOfTweets).toFixed(2);
        }
        return 0;
    };

    const processMentions = () => {
        let mentions = [];
        let screenNames = [];

        if (props.tweets.length > 0) {
            [...props.tweets].map(item => mentions.push(...item.mentions));    // list of all mention objects
            [...mentions].map(mention => screenNames.push([mention.screen_name]));  // list of just screen names of mentions

            let result = [...screenNames].reduce(function (list, name) {
                if (typeof list[name] === 'undefined') {
                    list[name] = 1;
                } else {
                    list[name] += 1;
                }
                return list;
            }, {});

            return Object.entries(result).map((item, index) => {
                return <Mention name={item[0]} number={item[1]} key={index}/>
            });
        }
    };

    if (props.tweets.length === 0) {
        return (
            <div>
                <p>No tweets shown.</p>
            </div>
        );
    }

    return (
        <Aux>
            <p><strong>Total number of likes: </strong>{countLikes(props.tweets)}</p>
            <p><strong>Average number of likes: </strong>{countAvgLikes(props.tweets)}</p>
            <p><strong>Mentions: </strong></p>
            <div>{processMentions()}</div>
        </Aux>
    );
};

export default TweetStats;