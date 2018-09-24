import React from 'react'
class Book extends React.Component {
    
  render() {
  	return (
      <li>
    	  <div className="book">
        	<div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : "No Image" } ")` }}></div>
            <div className="book-shelf-changer">
              {
                //Default value for options will the the current shelf the book is in.
                //If the book is not on a shelf, it will set to None.
              }
            	<select value={this.props.book.shelf || "none"}
                  onChange={ (e) => {this.props.changeShelf(this.props.book, e.target.value)} }>

                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>

              </select>
            </div>
          </div>
          <div className="book-title"> {this.props.book.title || "No Title"} </div>
          <div className="book-authors"> {this.props.book.authors || "Unknown Author"} </div>
		    </div>
      </li>
    )
  }
}

export default Book