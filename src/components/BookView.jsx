import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookView extends Component {

  state = {
    forShelf: true,
  }

  componentDidMount() {
    const { whatFor } = this.props
    if (whatFor === 'booksOnShelf' && this.state.forShelf === false) {
      this.setState({
        forShelf: true
      })
    } else if (whatFor === 'forSearch' && this.state.forShelf === true) {
      this.setState({
        forShelf: false
      })
    }
  }

  render () {

    const { books, updateBookOnSearch, onChangeShelf } = this.props

    return (
      <div className='bookshelf' >
        {this.state.forShelf &&
        <h2 className='bookshelf-title' >
          {this.props.shelfName}
        </h2 >
        }
        <div className='bookshelf-books' >
          <ol className='books-grid' >
            {books.map(book =>
              <li key={book.id} className='book' >
                <div className='book-top' >
                  <div
                    className='book-cover'
                    style={{
                      backgroundImage: `url(${book.hasOwnProperty('imageLinks') ? book.imageLinks.thumbnail : 'http://www.allthingscahill.com/wp-content/uploads/2011/08/tb_sign1.png'})`
                    }}
                  />
                  <div className='book-shelf-changer' >
                    <select value={book.shelf} onChange={e => this.state.forShelf ? onChangeShelf(book.id, e) : updateBookOnSearch(book, e.target.value)} >
                      <option value='none' disabled >
                        Move to...
                      </option >
                      <option value='currentlyReading' >Currently Reading</option >
                      <option value='wantToRead' >Want to Read</option >
                      <option value='read' >Read</option >
                      <option value='none' >None</option >
                    </select >
                  </div >
                </div >
                <div className={book.title ? 'book-title' : 'book-title missing'} >{book.title ? book.title : 'Title is missing'}</div >
                <div className={book.authors ? 'book-authors' : 'book-authors missing'} >{book.authors ? book.authors : 'Author name missing'}</div >
              </li >
            )}
          </ol >
        </div >
      </div >
    )
  }
}

BookView.propTypes = {
  books: PropTypes.array.isRequired,
  updateBookOnSearch: PropTypes.func,
  onChangeShelf: PropTypes.func,
  whatFor: PropTypes.string.isRequired
}

export default BookView