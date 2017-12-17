import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import { DebounceInput } from 'react-debounce-input'
import _ from 'lodash'
// import PropTypes from 'prop-types'

class Search extends Component {

  constructor (props) {
    super(props)
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query })
    query = query.replace(/[^a-zA-Z]+/g,'')

    if (query.length > 0) {
      BooksAPI.search(query).then((books) => {
        this.setState({ books })
      })
    } else {
      this.setState({
        query: '',
        books: []
      })
    }
  }


  render () {

    const {  books } = this.state

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to={this.props.pages.root}>Close</Link>
            <div className="search-books-input-wrapper">
              <DebounceInput
                minLength={2}
                debounceTimeout={300}
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {books && books.length > 0 &&
                books.map((book, index) => {
                return (
                  <li key={index} >
                    <div className='book' >
                      <div className='book-top' >
                        <div className='book-cover' style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }} ></div >
                        <div className='book-shelf-changer' >
                          <select >
                            <option value='none' disabled >Move to...</option >
                            <option value='currentlyReading' >Currently Reading</option >
                            <option value='wantToRead' >Want to Read</option >
                            <option value='read' >Read</option >
                            <option value='none' >None</option >
                          </select >
                        </div >
                      </div >
                      <div className='book-title' >{book.title}</div >
                      <div className='book-authors' >{book.authors}</div >
                    </div >
                  </li >
                )
              })}
            </ol>
          </div>
        </div>
      </div >
    )
  }
}

Search.propTypes = {}
Search.defaultProps = {}

export default Search
