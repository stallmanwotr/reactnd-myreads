import React, {Component} from 'react';
import PropTypes from 'prop-types'
import BookItem from './BookItem'

/**
 * The <code>BooksGrid</code> shows a list of books.
 *   It can be used as a shelf or for the search results.
 */
class BooksGrid extends Component {
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
            <ol className="books-grid">
                { books.map((book) => (
                    <li key={book.id} >
                        <BookItem
                            book={book}
                            shelves={shelves}
                            onSelectShelf={onSelectShelf}
                        />
                    </li>
                ))}
            </ol>
        );
    }
}

export default BooksGrid;
