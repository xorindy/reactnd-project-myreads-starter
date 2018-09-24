import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class SearchPage extends React.Component {

    //State is an empty array for books
  constructor(props) {
    super(props);
      this.state = {
        books: [],
        bookQuery: [],
        query: ''
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

  //Update query as user is typing
  updateQuery = (query) => {
    this.setState({ query }, this.searchQuery)
  }

  searchQuery() {
    //If the query is empty or undefined, empty out bookQuery and input field
    if (this.state.query === '' || this.state.query === undefined) {
      return this.setState({ bookQuery: [] })
    }
    //Search from the BooksAPI, as the user types words
    BooksAPI.search(this.state.query).then(results => {
      if (results.error) { //If it finds nothing, don't show anything
        return this.setState({ bookQuery: [] })
      }
      else { //Otherwise, show results
        results.forEach(b => {
          let i = this.state.books.filter(B => B.id === b.id)
          if(i[0]) { b.shelf = i[0].shelf }
        })
        return this.setState({ bookQuery: results })
      }
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
                Value={this.state.query}
				        onChange={(event) => this.updateQuery(event.target.value)} />
            </div>
          </div>
		      <div className="search-books-results">
        	  <ol className="books-grid">
              {
                this.state.bookQuery.map((item, key) => <Book changeShelf={this.changeShelf} key={ key } book={ item } />)
              }
			      </ol>
          </div>
        </div>
    )
  }
}

export default SearchPage