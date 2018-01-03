import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import BookView from './BookView'

import * as BooksAPI from '../BooksAPI'
import '../App.css'

class Search extends Component {
  state = {
    query: '',
    books: [],
    mySearch: {
      query: '',
      books: []
    }
  }

  constructor() {
    super()
    this.updateBookOnSearch = this.updateBookOnSearch.bind(this)
  }

  componentDidMount() {
    const localSearch = localStorage.getItem('mySearch')
    this.updateQuery(localSearch)

    //This is a spread operator
    this.setState({
      mySearch: Object.assign(this.state.mySearch, {query: localSearch})
    })
  }

  updateQuery = (query) => {
    this.setState({ query })
    localStorage.setItem('mySearch', query)
    if (query !== null){
      query = query.replace(/[^a-zA-Z]+/g, '')
    }
    if (query) {
      BooksAPI.search(query).then(
        response => {
          if (response.error) {
            this.setState({
              books: []
            })
          } else {
            this.updateBooks(response)
          }
        }
      )
    } else {
      localStorage.setItem('mySearch', '')
      this.setState({
        query: '',
        books: []
      })
    }
  }

  updateBooks = (books) => {
    const newBooks = books.map(book => {
      book.shelf = 'none'
      this.props.booksOnShelf.forEach(bookOnShelf => {
        if (book.id === bookOnShelf.id) {
          book.shelf = bookOnShelf.shelf
        }
      })
      return book
    })
    this.setState({
      books: newBooks
    })
  }

  updateBookOnSearch = (book, shelf) => {
    let oldBooks = this.state.books
    const bookToUpdate = oldBooks.filter(t => t.id === book.id)[0]
    bookToUpdate.shelf = shelf
    this.setState({
      books: oldBooks,
      mySearch: Object.assign(this.state.mySearch, {books: oldBooks})
    })
    this.props.onShelfChange(book, shelf)
  }

  render () {
    const { pages } = this.props
    return (
      <div className='search-books' >
        <div className='search-books-bar' >
          <Link to={pages.root} className='close-search' >
            Close
          </Link >
          <div className='search-books-input-wrapper' >
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              type='text'
              placeholder='Search by title or author'
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div >
        </div >
        <div className='search-books-results' >
          <BookView
            whatFor='forSearch'
            books={this.state.books}
            updateBookOnSearch={this.updateBookOnSearch}
          />
        </div >
      </div >
    )
  }
}

Search.propTypes = {
  onShelfChange: PropTypes.func.isRequired,
  pages: PropTypes.object.isRequired,
  booksOnShelf: PropTypes.array.isRequired
}

export default Search