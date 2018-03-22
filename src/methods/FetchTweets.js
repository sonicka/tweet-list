let twit = require('twitter'),
    twitter = new twit({
        consumer_key: '0fVkdNW2qeRTTCkr0vMppaXA5',
        consumer_secret: 'rJqFv9EmARJaOtvOQSV4GWk3e8WAIsrj2u5PngTQ2XPyT3IPKU',
        access_token_key: '1905434718-MUBETL4glVeCexLv2sHCGarxXLFeCm2kuqQIrVO',
        access_token_secret: 'eIQeD8PC3DJ1RRZSUO6ftFl1GrRqeqSfksYuTbB51H4Ng'
    });

export class Tweet {
    constructor(id, text, author, date, num_of_likes, mentions, hashtags) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.date = date;
        this.num_of_likes = num_of_likes;
        this.mentions = mentions;
        this.hashtags = hashtags;
    }
}

export const fetchTweets = (username, handleResult) => {
    twitter.get("statuses/user_timeline", {screen_name: username, count: 50}, function (error, tweets) {
        if (username === "") {
            alert("Enter a username!");
            return [];
        }
        if (!error) {
            let allTweets = [];
            let date = new Date();
            for (let i = 0; i < tweets.length; i++) {
                let tw = tweets[i];
                date = tw.created_at.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/, "$1 $2 $4 $3 UTC");
                let newTweet = new Tweet(tw.id_str, tw.text, tw.user.screen_name, date, tw.favorite_count,
                    tw.entities.user_mentions, tw.entities.hashtags);
                allTweets.push(newTweet);
            }
            if (allTweets.length === 0) {
                handleResult(false)
            } else {
                handleResult(allTweets);
            }
        } else {
            if (error[0]) {
                if (error[0].code === 34) {
                    alert("Username does not exist.");
                } else {
                    alert("Error " + error[0].code + " occurred: " + error[0].message);
                }
            } else {
                alert("An error occurred: " + error);
            }
            handleResult([]);
        }
    })
};