import React from 'react'
import { Route } from 'react-router-dom'
import BookShelves from './books/BookShelves'
import SearchBooks from './search/SearchBooks'
import * as BooksAPI from './util/BooksAPI'
import './App.css';

/**
 * Top-level React component for the MyReads application.
 */
class App extends React.Component {
    state = {
        // the book objects from the backend API.
        books: []
    }

    /**
     * Initialize the state from the backend service.
     */
    componentDidMount() {
        console.info("Fetching all books.");
        BooksAPI.getAll().then((books) => {
            this.setState({ books: books });
        });
    }

    /**
     * Moves a book to the specified shelf, and updates the backend.
     *   Note: Use arrow function '=>' so that the function is bound to 'this',
     * when invoked as a callout. Could have used ".bind(this)" instead.
     */
    moveToShelf = (book, shelf) => {
        console.info(`Updating book '${book.title}' to shelf '${shelf}'`);

        this.setState((state) => {
            // careful: don't change this.state, but the passed state.
            const foundBook = state.books.find((b) => b.id === book.id);
            if (!foundBook) {
                const newBook = Object.assign({}, book, { shelf: shelf });
                state.books.push(newBook);
            }
            else {
                Object.assign(foundBook, { shelf: shelf })
            }

            return { books: state.books };
        });

        // update the backend.
        BooksAPI.update(book, shelf);
    }

    /**
     * (Callout) Books returned from search don't have a shelf field, even though
     * the backend has been updated. In this case, get the shelf from the state.
     */
    getCurrentShelf = (book) => {
        if (book.shelf) {
            return book.shelf;
        }
        else {
            const found = this.state.books.find((b) => (b.id === book.id));
            return found && found.shelf ? found.shelf : "none";
        }
    }

    render() {
        const { books } = this.state;
        console.info("Render books, count: " + books.length);

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookShelves
                        books={books}
                        onSelectShelf={this.moveToShelf}
                    />
                )}/>
                <Route path="/search" render={() => (
                    <SearchBooks
                        onSelectShelf={this.moveToShelf}
                        getCurrentShelf={this.getCurrentShelf}
                    />
                )}/>
            </div>
        )
    }
}

export default App;

