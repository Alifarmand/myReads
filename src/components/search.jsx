import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import { DebounceInput } from 'react-debounce-input'
import BookList from './bookList'
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
            <BookList books={books} />
          </div>
        </div>
      </div >
    )
  }
}

Search.propTypes = {}
Search.defaultProps = {}

export default Search
