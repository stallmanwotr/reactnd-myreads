import React, {Component} from 'react';
import BookView from './BookView'
import PropTypes from 'prop-types'

/**
 *
 */
class BookShelvesPage extends Component {
    // component attributes.
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    render() {
        const { books } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { books.filter((book) => (book.shelf === 'currentlyReading'))
                                           .map((book) => (
                                        <li>
                                            <BookView book={book} />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { books.filter((book) => (book.shelf === 'wantToRead'))
                                           .map((book) => (
                                        <li>
                                            <BookView book={book} />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                               <ol className="books-grid">
                                    { books.filter((book) => (book.shelf === 'read'))
                                           .map((book) => (
                                        <li>
                                            <BookView book={book} />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
            </div>
        )
    }
}

export default BookShelvesPage;
