import React, { Component } from 'react';
import { Pagination, Dropdown } from 'semantic-ui-react';
import './pagination.css';

const itemsPerPage = [
    { key: '5 items', text: 5, value: '5' },
    { key: '10 items', text: 10, value: '10' },
    { key: '15 items', text: 15, value: '15' },
    { key: '20 items', text: 20, value: '20' },
];

class TablePagination extends Component {

    constructor(props) {
        super(props);

        this.onPageChange = this.onPageChange.bind(this);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);
    }

    onPageChange(event, {activePage}) {
        this.props.onPageChange(activePage);
    }

    onPageSizeChange(event, {value}) {
        this.props.onPageSizeChange(value);
    }

    render() {
        const {page, total} = this.props;

        return (
            <div className='pagination-wrapper'>
                <Dropdown
                    defaultValue='10'
                    selection
                    options={itemsPerPage}
                    onChange={this.onPageSizeChange} />

                <Pagination
                    activePage={page}
                    onPageChange={this.onPageChange}
                    totalPages={total} />
            </div>
        )
    }
}

export default TablePagination;
