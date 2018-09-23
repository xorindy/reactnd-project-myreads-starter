import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends React.Component {

    //State is an empty array for books
  constructor(props) {
    super(props);
      this.state = {
        books: [],
        bookQuery: []
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
  //Update the current shelf to move books around
  changeShelf = (book, shelf)  => {
    BooksAPI.update(book, shelf)
            .then(response => {
              book.shelf = shelf
              this.setState(state => ({
              books: state.books.filter(b => b.id !== book.id).concat([book])
              }))
            })
  }

  render() {
      return (
      	<div className="search-books">
		      <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input 
				        type="text" 
				        placeholder="Search by title or author"
				        onChange={(event) => this.updateQuery(event.target.value)}
			        />
            </div>
          </div>
		      <div className="search-books-results">
        	  <ol className="books-grid">

			      </ol>
          </div>
        </div>
    )
  }
}

export default SearchPage