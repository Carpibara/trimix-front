import React from 'react';
import { Button } from "react-bootstrap";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination d-flex justify-content-center'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <Button variant="dark" className="me-2" onClick={() => paginate(number)}>
                            {number}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;