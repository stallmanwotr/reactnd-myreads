import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from '../books/BooksGrid'
import * as BooksAPI from '../util/BooksAPI'
import PropTypes from 'prop-types'

/**
 *
 */
class SearchBooks extends Component {
    static propTypes = {
        // the shelves that can be added to.
        shelves: PropTypes.array.isRequired,

        // handler when the user moves the book to a shelf.
        onSelectShelf: PropTypes.func.isRequired
    }

    state = {
        matchedBooks: []
    }

    /**
     * Invoked when the user enters a search query.
     *   Performs a search and updates the matching list of books.
     */
    handleSearch = (e) => {
        const query = e.target.value;
        console.info("Handle Search: " + query);

        // TODO: check returned books have shelves, otherwise update from App state.

        // send the search query to the backend.
        BooksAPI.search(query).then((books) => {
            // if no results an error object is returned by the books api, rather
            // than an array. E.g.:  {error: "empty query", items: Array(0)}
            if (typeof books === 'undefined' || books.error) {
                books = [];
            }
            console.info(`Query '${query}' matched ${books.length} books`);

            this.setState({ matchedBooks: books });
        });
    }

    render() {
        const { shelves, onSelectShelf } = this.props;
        const { matchedBooks } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>

                    <div className="search-books-input-wrapper">
                        {/*
                          NOTES: The search from BooksAPI is limited to a particular set of search terms.
                          You can find these search terms here:
                          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
                          However, remember that the BooksAPI.search method DOES search by title or author. So,
                          don't worry if you don't find a specific author or title. Every search is limited by
                          search terms.
                        */}

                        <input type="text" placeholder="Search by title or author"
                            onChange={this.handleSearch}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid
                        books={matchedBooks}
                        shelves={shelves}
                        onSelectShelf={onSelectShelf}
                    />
                </div>
            </div>
        )
    }
}

export default SearchBooks;
