import { Component } from 'react';
import classes from './pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

class Pagination extends Component<PaginationProps> {
  handlePrev = () => {
    const { currentPage, onPageChange } = this.props;
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  handleNext = () => {
    const { currentPage, totalPages, onPageChange } = this.props;
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  render() {
    const { currentPage, totalPages } = this.props;
    return (
      <div className={classes.pagination}>
        <button onClick={this.handlePrev} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={this.handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  }
}

export default Pagination;
