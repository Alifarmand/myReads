import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class MainPage extends Component {

  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    shelfs: [
      {name: 'Currently Reading', id: 'currentlyReading'},
      {name: 'Want to Read', id: 'wantToRead'},
      {name: 'Read', id: 'read'}
    ]
  }

  showSelected() {
    return 'selected'
  }

  render () {

    const { myBooks } = this.props.data
    const { onChangeShelf } = this.props

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>myReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {this.state.shelfs.map((shelf, index) => (
                <div className="bookshelf" key={index}>
                  <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {myBooks.map((book, index) => {
                        return (
                          (book.shelf === shelf.id &&
                            <li key={index} >
                              <div className='book' >
                                <div className='book-top' >
                                  <div className='book-cover' style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                  }} ></div >
                                  <div className='book-shelf-changer' >
                                    <select value={shelf.id} onChange={(event) => onChangeShelf(event, book)}>
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
                          ))
                      })}
                    </ol>
                  </div>
                </div>
                )
              )}
            </div>
          </div>
          <div className="open-search">

            <Link to={this.props.data.pages.search}>Add a book</Link>
          </div>
        </div>
      </div >
    )
  }
}

MainPage.propTypes = {}
MainPage.defaultProps = {}

export default MainPage
