import React, {Component} from 'react';
import './App.css';
import './index.js';
import Tweeter from "./containers/Tweeter/Tweeter";

class App extends Component {
    render() {
        return (
            <Tweeter/>
        );
    }
}

export default App;

/*

render()
{
    console.log(this);
    // let sorted = this.state.tweets.sort(function(a, b){return a - b});

    return (
        <div className="App">
            <Grid fluid>
                <Row>

                </Row>
                <Row>
                    <Sort sortBy={this.sortBy}/>

                    <button className="btn btn-primary" onClick={this.sortHandler}>Sort by date</button>
                    <button className="btn btn-primary" onClick={this.sortHandler}>Sort by likes</button>
                    {/!*dropdown to choose sorting by date or number of likes - asc/desc*!/}
                    <button className="btn btn-primary" onClick={this.filterHandler}>Filter by</button>
                    {/!*dropdown to choose filtering by date, tweet length, number of likes, number of mentions (eg. @user) and hashtags (eg. #hashtag) in tweets*!/}
                    <input
                        type="text"/> {/!*input field with searched (sub)string / number / date with onChange reaction*!/}
                </Row>
                <Row>
                    <div className="jumbotron text-center">
                        <Table list={this.state.tweets}/>
                    </div>
                </Row>
            </Grid>
            <Grid>
                <Row>
                    <div className="text-center alert">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => this.showStatsHandler()}>
                            Show Statistics
                        </button>
                    </div>
                </Row>
            </Grid>

        </div>
    );
}
}*/
