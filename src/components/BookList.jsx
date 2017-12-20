import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BookView from './BookView'

import * as BooksAPI from '../BooksAPI'
import '../App.css'

class BookList extends Component {
  handleChangeShelf = (bookId, e) => {
    let bookToShelf = this.props.booksOnShelf
    const book = bookToShelf.filter(t => t.id === bookId)[0]
    book.shelf = e.target.value
    BooksAPI.update(book, e.target.value).then(() => {
      this.setState({
        books: bookToShelf
      })
    })
  }

  render () {
    const { pages, myShelfs } = this.props
    return (
      <div className='list-books' >
        <div className='list-books-title' >
          <h1 >MyReads</h1 >
        </div >
        <div className='list-books-content' >
          {myShelfs.map((shelf, index) => (
            <BookView
              key={index}
              books={this.props.booksOnShelf.filter(book => book.shelf === shelf.id)}
              onChangeShelf={this.handleChangeShelf}
              shelfName={shelf.name}
              whatFor='forShelf'
            />
          ))}
        </div >
        <div className='open-search' >
          <Link to={pages.search} >Add a book</Link >
        </div >
      </div >
    )
  }
}

export default BookList