import React from 'react'
import { Route } from 'react-router-dom'
import BookShelves from './books/BookShelves'
import SearchBooks from './search/SearchBooks'
import * as BooksAPI from './util/BooksAPI'
import './App.css';

/** The ordered list of shelves to show in the UI. */
const shelves = [
    { id: "currentlyReading", title: "Currently Reading"},
    { id: "wantToRead", title: "Want to Read"},
    { id: "read", title: "Read"}
]

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,

        // list of books from the backend API.
        books: []
    }

    componentDidMount() {
        console.info("Fetching all books.");
        BooksAPI.getAll().then((books) => {
            this.setState({ books: books });
        });
    }

    /**
     * Moves a book to the specified shelf, and updates the backend state.
     *   Note: Use arrow function '=>' so that the function is bound to 'this',
     * when invoked as a callout. Could have used ".bind(this)" instead.
     */
    moveToShelf = (book, shelf) => {
        console.info(`Moving book '${book.title}' to shelf '${shelf}'`);

        this.setState((state) => {
            // careful to not change this.state, but the passed state.
            const foundBook = state.books.find((b) => b.id === book.id);
            if (!foundBook) {
                const newBook = Object.assign({}, book, { shelf: shelf });
                state.books.push(newBook);
            }
            else {
                Object.assign(foundBook, { shelf: shelf })
            }

            return { books: state.books };

            // TODO: double check/improve the above!
        });

        // TODO: check this is working!
        BooksAPI.update(book, shelf);
    }

    render() {
        const { books } = this.state;
        console.info("Render books, count: " + books.length);

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookShelves
                        books={books}
                        shelves={shelves}
                        onSelectShelf={this.moveToShelf}
                    />
                )}/>
                <Route path="/search" render={() => (
                    <SearchBooks
                        shelves={shelves}
                        onSelectShelf={this.moveToShelf}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp;

