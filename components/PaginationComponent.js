import React from 'react';
import ReactPaginate from 'react-paginate';
const PAGE_SIZE_DEFAULT = 5;
const PAGE_DEFAULT = 0;
class PaginationComponent extends React.Component {
  handlePageChange(state) {
    this.props.actions(state.selected);
  }
  render() {
    const { totalCount, page } = this.props;
    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/css/pagination.css"
        />
        <ReactPaginate
          previousLabel={<div className="primary-background">Previous</div>}
          nextLabel={<div className="primary-background">Next</div>}
          disabledClassName={'disabled-button'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(totalCount / PAGE_SIZE_DEFAULT)}
          forcePage={page || PAGE_DEFAULT}
          onPageChange={e => this.handlePageChange(e)}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          pageRangeDisplayed={10}
        />
        <style jsx>
          {`
            .primary-background {
              background-color: #3f51b5;
              color: #fff;
              padding-left: 12px;
              padding-right: 12px;
              border-radius: 4px;
            }
            .disabled > a > .primary-background {
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 2;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default PaginationComponent;
