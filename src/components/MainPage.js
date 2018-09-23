import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Shelf from './Shelf'

class MainPage extends React.Component {

  //State is an empty array for books
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  //Get all the books from BooksAPI and place it on a bookList Array,
  //Set the state with the new bookList array 
  componentDidMount() {
    BooksAPI.getAll()
    .then(bookList => {
      this.setState({ books: bookList });
    });
  }

  render() {
  	return (
    	<div className="list-books">

        <div className="list-books-title">
          <h1>Clarinda's Library</h1>
        </div>

        <div className="list-books-content">
        {
          //Get shelves from our shelf component
        }
          <div>
            <Shelf name="Currently Reading" books={this.state.books.filter(b => b.shelf === 'currentlyReading')}/>
            <Shelf name="Want To Read" books={this.state.books.filter(b => b.shelf === 'wantToRead')}/>
            <Shelf name="Read" books={this.state.books.filter(b => b.shelf === 'read')}/>
          </div>

          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>

        </div>
      </div>
    )
  }
}

export default MainPage