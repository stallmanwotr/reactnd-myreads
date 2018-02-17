import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

/**
 * The <code>BookShelves</code> component renders a list of books, separated into
 * different shelves.
 *   It contains controls to move books to other shelves, and to search for books.
 */
class BookShelves extends Component {
    static propTypes = {
        // the list of all books, and the shelves to show.
        books: PropTypes.array.isRequired,

        // the shelves shown in the UI.
        shelves: PropTypes.array.isRequired,

        // handler when the user selects a shelf for the book.
        onSelectShelf: PropTypes.func.isRequired
    }

    render() {
        const { books, shelves, onSelectShelf } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        { shelves.map((shelf) => (
                            <div className="bookshelf"
                                 key={shelf.id} >
                                <h2 className="bookshelf-title">{ shelf.title }</h2>
                                <div className="bookshelf-books">
                                    <BooksGrid
                                        books={books.filter((book) => (book.shelf === shelf.id))}
                                        shelves={shelves}
                                        onSelectShelf={onSelectShelf}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookShelves;
