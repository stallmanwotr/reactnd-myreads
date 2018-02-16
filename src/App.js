import React from 'react';
import BookShelvesPage from './BookShelvesPage'
import SearchBooksPage from './SearchBooksPage'
import * as BooksAPI from './BooksAPI'
import './App.css';

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

    render() {
        const { books } = this.state;
        console.info("Render: " + JSON.stringify(books));

        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <SearchBooksPage />
                ) : (
                    <BookShelvesPage books={books} />
                )}
            </div>
        )
    }
}

export default BooksApp;

