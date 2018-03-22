import React, {Component} from 'react';
import List from '../../components/List/List';
import Modal from '../../components/Modal/Modal';
import Aux from '../../hoc/Auxx/Auxx';
import TweetStats from "../../components/TweetStats/TweetStats";
import TopToolbar from "../../components/Toolbars/TopToolbar";
import {fetchTweets} from "../../methods/FetchTweets";
import BottomToolbar from "../../components/Toolbars/BottomToolbar";


class Tweeter extends Component {
    state = {
        tweets: [],
        tweetsToShow: [],
        username: "",
        tweetsShown: false,
        statsRequested: false,

        isSortedByDate: false,
        isSortedByLikes: false,
        sortedBy: "Sort",

        isFiltered: false,
        filteredBy: "",
        filteringQuery: "",
        filteredTweets: []
    };

    usernameChangeHandler = (event) => {
        this.setState({username: event.target.value}, function () {
            if (this.state.username === "") {
                this.setState({tweetsToShow: [], tweetsShown: false, isFiltered: false, filteringQuery: "",
                    filteredBy: "", sortedBy: "Sort", isSortedByDate: false, isSortedByLikes: false})
            }
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        fetchTweets(this.state.username, (allTweets) => {
            if (!allTweets) {
                alert("Chosen user hasn't tweeted yet.");
            } else {
                this.setState({tweets: allTweets, tweetsToShow: allTweets, isFiltered: false, filteringQuery: "",
                    filteredBy: "", sortedBy: "Sort", isSortedByDate: false, isSortedByLikes: false});
                if (allTweets.length > 0) {
                    this.setState({tweetsShown: true})
                }
            }
        })
    };

    showStatsHandler = () => {
        this.setState({statsRequested: true})
    };

    closeModal = () => {
        this.setState({statsRequested: false})
    };

    filterQueryChangeHandler = (event) => {
        this.setState({filteringQuery: event.target.value, sortedBy: "Sort"});
        this.filter(event.target.value);
    };

    setTitle = () => {
        let title = this.state.filteredBy.charAt(0).toUpperCase() + (this.state.filteredBy).slice(1);
        if (this.state.filteredBy === "num_of_likes") {
            title = "Number of likes"
        }
        if (this.state.filteredBy === "") {
            return "Filter by"
        } else {
            return title
        }
    };

    setFilterMode = (event) => {
        this.setState({tweetsToShow: this.state.tweets, filteringQuery: "", isFiltered: true, filteredBy: event,
            sortedBy: "Sort"})
    };

    filter = (query) => {
        let original = [...this.state.tweets];
        let filtered = [];
        let filterBy = this.state.filteredBy;
        query = query.toLowerCase();

        switch (filterBy) {
            case "text":
                original.filter(function (currentValue) {
                    if (currentValue.text.toLowerCase().indexOf(query.toString()) !== -1) {
                        filtered.push(currentValue);
                    }
                    return filtered;
                });
                break;
            case "date":
                let modQuery = query.split(" ", 3);
                let shouldBeAdded = false;
                original.filter(function (currentValue) {
                    for (let i = 0; i < modQuery.length; i++) {
                        if (currentValue.date.toLowerCase().substr(0, 11).indexOf(modQuery[i]) !== -1) {
                            shouldBeAdded = true;
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
                        if (hashtag.text.toLowerCase() === query) {
                            filtered.push(currentValue);
                        }
                        return filtered;
                    });
                    return filtered;
                });
                break;
            default:
                break;
        }
        this.setState({tweetsToShow: filtered, filteredTweets: filtered, isFiltered: true,
            isSortedByDate: false, isSortedByLikes: false});
        if (query.length === 0) {
            this.setState({tweetsToShow: original, filteredTweets: original, isFiltered: false,
                isSortedByDate: false, isSortedByLikes: false});
        }
    };

    sortByLikes = () => {
        let sortedList;
        if (!this.state.isSortedByLikes) {
            if (this.state.isFiltered) {
                sortedList = [...this.state.filteredTweets];
            } else {
                sortedList = [...this.state.tweets];
            }
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
            this.setState({tweetsToShow: sortedList, sortedBy: "Most liked first", isSortedByDate: false, isSortedByLikes: true})
        } else {
            sortedList = [...this.state.tweetsToShow];
            let title;
            if (this.state.sortedBy === "Most liked first") {
                title = "Least liked first";
            } else {
                title = "Most liked first";
            }
            this.setState({tweetsToShow: sortedList.reverse(), sortedBy: title, isSortedByDate: false, isSortedByLikes: true})
        }
    };

    sortByDate = () => {
        let sortedList;
        if (!this.state.isSortedByDate) {
            if (this.state.isFiltered) {
                sortedList = [...this.state.filteredTweets];
            } else {
                sortedList = [...this.state.tweets];
            }
            this.setState({tweetsToShow: sortedList.reverse(), sortedBy: "Oldest first", isSortedByDate: true, isSortedByLikes: false})
        } else {
            sortedList = [...this.state.tweetsToShow];
            let title;
            if (this.state.sortedBy === "Oldest first") {
                title = "Latest first";
            } else {
                title = "Oldest first";
            }
            this.setState({tweetsToShow: sortedList.reverse(), sortedBy: title, isSortedByDate: true, isSortedByLikes: false})
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
                    setTitle={this.setTitle}
                    isFiltered={this.state.isFiltered}
                    sortedBy={this.state.sortedBy}
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