import React, {Component} from 'react';
import PropTypes from 'prop-types'
import BookItem from './BookItem'

/**
 * The <code>BooksGrid</code> shows a list of books.
 *   It can be used as a shelf or for the search results.
 */
class BooksGrid extends Component {
    static propTypes = {
        // the list of books to show in the grid.
        books: PropTypes.array.isRequired,

        // handler when the user selects a shelf for the book.
        onSelectShelf: PropTypes.func.isRequired,

        // get the book's shelf if it doesn't have a shelf field.
        getCurrentShelf: PropTypes.func
    }

    render() {
        const { books, onSelectShelf, getCurrentShelf } = this.props;

        return (
            <ol className="books-grid">
                { books.map((book) => (
                    <li key={book.id} >
                        <BookItem
                            book={book}
                            onSelectShelf={onSelectShelf}
                            getCurrentShelf={getCurrentShelf}
                        />
                    </li>
                ))}
            </ol>
        );
    }
}

export default BooksGrid;
