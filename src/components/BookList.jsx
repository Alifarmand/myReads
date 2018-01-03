import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import BookView from './BookView'

import '../App.css'

const BookList = ({pages, myShelfs, onShelfChange, booksOnShelf }) => {
  return (
    <div className='list-books' >
      <div className='list-books-title' >
        <h1 >MyReads</h1 >
      </div >
      <div className='list-books-content' >
        {myShelfs.map((shelf, index) => (
          <BookView
            key={index}
            books={booksOnShelf.filter(book => book.shelf === shelf.id)}
            onChangeShelf={onShelfChange}
            shelfName={shelf.name}
            whatFor='forShelf'
          />
        ))}
      </div >
      <div className='open-search' >
        <Link to={pages.search} >Add a book</Link >
      </div >
    </div >
  )}

BookList.propTypes = {
  onChangeShelf: PropTypes.func,
  booksOnShelf: PropTypes.array.isRequired,
  pages: PropTypes.object.isRequired,
  myShelfs: PropTypes.array.isRequired
}

export default BookList