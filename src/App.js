import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IssuesTable from "./components/IssuesTable/table.component";
import IssuesService from "./services/issues.service";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            listLoading: false,
            issuesList: []
        };
    }

    componentDidMount() {
        this.setState({listLoading: true});

        IssuesService
            .getIssues()
            .then(res => {
                this.setState({
                    listLoading: false,
                    issuesList: res.data
                });
            })
            .catch(e => {
                this.setState({
                    listLoading: false,
                    hasError: true,
                });
            });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Github issue tracker</h1>
                </header>
                <div className="page-wrapper">
                    <IssuesTable data={this.state.issuesList}
                                 isLoading={this.state.listLoading}
                                 error={this.state.hasError}/>
                </div>
            </div>
        );
    }
}

export default App;
