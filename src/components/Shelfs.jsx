import React, { Component } from 'react'

class BookShelf extends Component {

  state = {
    forShelf: true
  }

  componentWillMount() {
    const { books, onChangeShelf, whatFor, updateBookOnSearch } = this.props
    // console.log(whatFor + 'And new function ' + updateBookOnSearch)
  }

  render () {

    return (
      <div className='bookshelf' >
        {this.state.forShelf &&
        <h2 className='bookshelf-title' >
          {this.props.shelfName}
        </h2 >
        }
        <div className='bookshelf-books' >
          <ol className='books-grid' >
            {this.props.books.map(book =>
              <li key={book.id} className='book' >
                <div className='book-top' >
                  <div
                    className='book-cover'
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.hasOwnProperty('imageLinks') ? book.imageLinks.thumbnail : 'http://www.allthingscahill.com/wp-content/uploads/2011/08/tb_sign1.png'})`
                    }}
                  />
                  <div className='book-shelf-changer' >
                    <select value={book.shelf} onChange={e => this.props.onChangeShelf(book.id, e)} >
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

export default BookShelf