import React, { Component } from 'react'
import './table.css';
import { Dimmer, Loader, Table, Header, Container, Message } from 'semantic-ui-react'
import IssuesTableRow from "./table-row/table-row";
import TablePagination from "./table-pagination/pagination";

/**
 * Table header as a DUMB component
 * */
const TableHeader = () => (
    <Table.Header>
        <Table.Row>
            <Table.HeaderCell>Issue Number</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Created At</Table.HeaderCell>
            <Table.HeaderCell>Updated At</Table.HeaderCell>
            <Table.HeaderCell>Labels</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
        </Table.Row>
    </Table.Header>
);

/**
 * Table footer as a DUMB component
 * */
const TableFooter = (props) => (
    <Table.Footer>
        <Table.Row>
            <Table.HeaderCell colSpan='6'>
                {props.children}
            </Table.HeaderCell>
        </Table.Row>
    </Table.Footer>
);

/**
 * Main IssueTable component,
 * receives as props the following params:
 * @param data: array of objects
 * @param isLoading: boolean meaning that fetch is in progress
 * */
class IssueTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            data: [],
            visibleRows: [],
            page: 1,
            pageSize: 10
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({data: props.data}, () => {
            this.handlePageChange(this.state.page || 1);
        });
    }

    handlePageChange(page) {
        const {pageSize, data} = this.state;
        const visibleRows = data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

        this.setState({page, visibleRows});
    }

    handlePageSizeChange(value) {
        this.setState({pageSize: parseInt(value, 10)}, () => {
            this.handlePageChange(1);
        });
    }

    render() {
        const {error, isLoading} = this.props;
        const {data, page, visibleRows, pageSize} = this.state;
        const pageTotal = Math.ceil(data.length / pageSize) || 1;
        const totalIssuesCount = data.length || 0;

        const tableBody = (
            <Table.Body>
                {
                    visibleRows.map(issue => {
                        return (
                            <IssuesTableRow key={issue.id} issue={issue}/>
                        );
                    })
                }
            </Table.Body>
        );

        return (
            <Container className="table-container">
                <Header as='h1' className="table-heading">Issues count {totalIssuesCount}</Header>

                {/*
                    Loading indicator
                */}
                <Dimmer active={isLoading}>
                    <Loader>Loading</Loader>
                </Dimmer>

                {
                    error && (
                        <Message negative>
                            <Message.Header>Sorry an error has occurred</Message.Header>
                            <p>Please try refreshing the page !!!</p>
                        </Message>
                    )
                }

                <Table celled>

                    <TableHeader/>

                    {tableBody}

                    <TableFooter>
                        <TablePagination
                            onPageChange={this.handlePageChange}
                            onPageSizeChange={this.handlePageSizeChange}
                            page={page}
                            itemsOnPage={pageSize}
                            total={pageTotal}/>
                    </TableFooter>

                </Table>
            </Container>
        );
    }
}

export default IssueTable;

