import React, {Component} from 'react';
import PropTypes from 'prop-types'
import * as Consts from '../util/Consts'

/**
 * A React component that renders an individual book.
 *   The book to be moved to another shelf using a popup menu.
 */
class BookItem extends Component {
    static propTypes = {
        // a book object as per the books API.
        book: PropTypes.object.isRequired,

        // handler when the user selects a shelf for the book.
        onSelectShelf: PropTypes.func.isRequired,

        // get the book's shelf if it doesn't have a shelf field.
        getCurrentShelf: PropTypes.func
    }

    render() {
        const { book, onSelectShelf, getCurrentShelf } = this.props;
        const bookShelf = book.shelf ? book.shelf : getCurrentShelf(book);

        // the start code has width/height here, normally this would be css.
        let coverStyle = { width: 128, height: 193 };
        if (book.imageLinks && book.imageLinks.thumbnail) {
            coverStyle.backgroundImage = "url(" + book.imageLinks.thumbnail + ")";
        }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={coverStyle}></div>

                    <div className="book-shelf-changer">
                        <select
                            value={bookShelf}
                            onChange={(event) => onSelectShelf(book, event.target.value)} >

                            <option value="" disabled>Move to...</option>
                            { Consts.SHELVES.map((shelf) => (
                                <option
                                    key={shelf.id}
                                    value={shelf.id}
                                >{shelf.title}</option>
                            ))}
                            <option value="none">None</option>
                        </select>
                    </div>

                </div>
                <div className="book-title">{ book.title }</div>
                <div className="book-authors">{ book.authors ? book.authors.join(', ') : '' }</div>
            </div>
        )
    }
}

export default BookItem;
