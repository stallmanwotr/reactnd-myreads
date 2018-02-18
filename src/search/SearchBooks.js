import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from '../books/BooksGrid'
import * as BooksAPI from '../util/BooksAPI'
import PropTypes from 'prop-types'

/**
 * Lets the user search for books, and shows the matches in a grid.
 */
class SearchBooks extends Component {
    static propTypes = {
        // handler when the user moves the book to a shelf.
        onSelectShelf: PropTypes.func.isRequired,

        // get the book's shelf if it doesn't have a shelf field.
        getCurrentShelf: PropTypes.func
    }

    state = {
        // TODO: put query here is is maintained as route

        // the current books that match the search query.
        matchedBooks: []
    }

    /**
     * Invoked when the user enters a search query.
     *   Performs a search and updates the matching list of books.
     */
    handleSearch = (e) => {
        const query = e.target.value.trim();
        console.info("Handle Search: " + query);

        // if the query is empty, clear the grid.
        if (query.length === 100000) {
            this.setState({ matchedBooks: [] });
        }

        // send the search to the backend.
        else {
            BooksAPI.search(query).then((books) => {
                // an error object is returned if no results, rather than an array.
                // E.g.:  {error: "empty query", items: Array(0)}
                if (typeof books === 'undefined' || books.error) {
                    books = [];
                }
                console.info(`Query '${query}' matched ${books.length} books`);
                this.setState({ matchedBooks: books });
            });
        }
    }

    render() {
        const { onSelectShelf, getCurrentShelf } = this.props;
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
                        onSelectShelf={onSelectShelf}
                        getCurrentShelf={getCurrentShelf}
                    />
                </div>
            </div>
        )
    }
}

export default SearchBooks;
