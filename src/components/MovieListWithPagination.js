// MovieListWithPagination.js
import React from 'react';

const MovieListWithPagination = ({ currentItems, currentPage, totalPages, updatePage }) => {
    return (
        <div>
            {currentItems}
            <div className="pagination">
                <button onClick={() => updatePage(1)} disabled={currentPage === 1}>First</button>
                <button onClick={() => updatePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button onClick={() => updatePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                <button onClick={() => updatePage(totalPages)} disabled={currentPage === totalPages}>Last</button>
            </div>
        </div>
    );
};

export default MovieListWithPagination;