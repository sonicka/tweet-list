import React, {Component} from 'react';
import List from '../../components/List/List';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxx/Auxx';
import TweetStats from "../../components/TweetStats/TweetStats";
import TopToolbar from "../../components/Toolbars/TopToolbar";
import {fetchTweets} from "../../methods/twitter";
import BottomToolbar from "../../components/Toolbars/BottomToolbar";


class Tweeter extends Component {
    state = {
        tweets: [],
        tweetsToShow: [],
        username: "",
        tweetsShown: false,
        statsRequested: false,

        descendingLikes: true,
        descendingDate: null,
        isSorted: false,

        filteredBy: "",
        filteringQuery: "",
    };

    usernameChangeHandler = (event) => {
        this.setState({username: event.target.value}, function () {
            if (this.state.username === "") {
                this.setState({tweetsToShow: [], tweetsShown: false})
            }
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        fetchTweets(this.state.username, (allTweets) => {
            if (!allTweets) {
                alert("Chosen user hasn't tweeted.");
            } else {
                this.setState({tweets: allTweets, tweetsToShow: allTweets});
                if (allTweets.length > 0) {
                    this.setState({tweetsShown: true})
                }
            }
        })
    };

    showStatsHandler = () => {
        console.log("modal closed");
        this.setState({statsRequested: true})
    };

    closeModal = () => {
        console.log("modal closed");
        this.setState({statsRequested: false})
    };

    filterQueryChangeHandler = (event) => {
        this.setState({filteringQuery: event.target.value});
        this.filter(event.target.value);
    };

    setFilterMode = (event) => {
        console.log("filter mode " + event);
        this.setState({filteredBy: event, tweetsToShow: this.state.tweets, filteringQuery: ""})
    };

    filter = (query) => {
        let original = [...this.state.tweets];
        let filtered = [];
        let filterBy = this.state.filteredBy;
        query = query.toLowerCase();

        switch (filterBy) {
            case "date":     // date format: Mth DD YYYY
                let modQuery = query.split(" ", 3);
                let shouldBeAdded = false;
                original.filter(function (currentValue) {
                    for (let i = 0; i < modQuery.length; i++) {
                        if (currentValue.date.toLowerCase().substr(0, 11).indexOf(modQuery[i]) !== -1) {
                            shouldBeAdded = true;
                            console.log(currentValue.date.toLowerCase().substr(0, 11));
                        } else {
                            shouldBeAdded = false;
                            break;
                        }
                    }
                    if (shouldBeAdded) {
                        filtered.push(currentValue);
                    }
                    return filtered;
                });
                break;
            case "length":
                original.filter(function (currentValue) {
                    if (currentValue.text.length.toString() === query.toString()) {
                        filtered.push(currentValue);
                    }
                    return filtered;
                });
                break;
            case "num_of_likes":
                original.filter(function (currentValue) {
                    if (currentValue.num_of_likes.toString() === query.toString()) {
                        filtered.push(currentValue);
                    }
                    return filtered;
                });
                break;
            case "mentions":
                original.filter(function (currentValue) {
                    currentValue.mentions.map(function (mention) {
                        if (mention.screen_name.toLowerCase() === query) {
                            filtered.push(currentValue);
                        }
                        return filtered;
                    });
                    return filtered;
                });
                break;
            case "hashtags":
                original.filter(function (currentValue) {
                    currentValue.hashtags.map(function (hashtag) {
                        console.log(currentValue);
                        if (hashtag.text.toLowerCase() === query) {
                            filtered.push(currentValue);
                        }
                        return filtered;
                    });
                    return filtered;
                });
                break;
            default:
                original.filter(function (currentValue) {
                    if (currentValue.text.indexOf(query.toString()) !== -1) {
                        filtered.push(currentValue);
                    }
                    return filtered;
                });
                break;
        }
        this.setState({tweetsToShow: filtered});
        if (query.length === 0) {
            this.setState({tweetsToShow: original});
        }
    };

    sortByLikes = () => {
        let sortedList = [...this.state.tweetsToShow];
        sortedList.sort((a, b) => {
            let sortVal = 0;
            if (a["num_of_likes"] > b["num_of_likes"]) {
                sortVal = -1;
            }
            if (a["num_of_likes"] < b["num_of_likes"]) {
                sortVal = 1;
            }
            return sortVal;
        });

        if (this.state.descendingLikes) {
            this.setState(prevState => ({
                descendingLikes: !prevState.descendingLikes, tweetsToShow: sortedList
            }));
        } else {
            this.setState(prevState => ({
                descendingLikes: !prevState.descendingLikes, tweetsToShow: sortedList.reverse()
            }));
        }
    };

    sortByDate = () => {
        let sortedList;
        sortedList = [...this.state.tweetsToShow]; // todo reaguje az na dvojklik waaat
        if (this.state.descendingDate) {
            this.setState(prevState => ({
                descendingDate: !prevState.descendingDate, tweetsToShow: sortedList
            }));
        } else {
            this.setState(prevState => ({
                descendingDate: !prevState.descendingDate, tweetsToShow: sortedList.reverse()
            }));
        }
    };

    render() {
        return (
            <Aux>
                <Modal
                    show={this.state.statsRequested}
                    close={this.closeModal}>
                    <TweetStats tweets={this.state.tweetsToShow} close={this.closeModal}/>
                </Modal>
                <TopToolbar
                    handleChange={this.usernameChangeHandler}
                    handleSubmit={this.submitHandler}
                    handleSortLikes={this.sortByLikes}
                    handleSortDate={this.sortByDate}
                    handleQueryChange={this.filterQueryChangeHandler}
                    handleFilterChange={this.setFilterMode}
                    username={this.state.username}
                    tweetsShown={this.state.tweetsShown}
                    filteringQuery={this.state.filteringQuery}/>
                {this.state.tweetsToShow.length > 0 ? <List list={this.state.tweetsToShow}/> : null}
                <BottomToolbar clicked={this.showStatsHandler}
                               close={this.closeModal}
                               tweetsShown={this.state.tweetsShown}/>
            </Aux>
        )
    }
}

export default Tweeter;