import React, { Component } from 'react'

function BookList (props) {

  const { books, onChangeShelf } = props
  console.log(props.books)
  return(
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
                    backgroundImage: `url(${book.hasOwnProperty('imageLinks') ? book.imageLinks.thumbnail : 'http://www.allthingscahill.com/wp-content/uploads/2011/08/tb_sign1.png'})`
                  }} ></div >
                  <div className='book-shelf-changer' >
                    <select onChange={(event) => onChangeShelf(event, book)}>
                      <option value='none' disabled >Move to...</option >
                      <option value='currentlyReading' >Currently Reading</option >
                      <option value='wantToRead' >Want to Read</option >
                      <option value='read' >Read</option >
                      <option value='none' >None</option >
                    </select >
                  </div >
                </div >
                <div className={book.title ? 'book-title' : 'book-title missing'} >{book.title ? book.title : 'Title is missing'}</div >
                <div className={book.authors ? 'book-authors' : 'book-authors missing'} >{book.authors ? book.authors : 'Author name missing'}</div >
              </div >
            </li >
          )
        })}
      </ol>
  )
}

//
// class BookList extends Component {
//
//   constructor (props) {
//     super(props)
//   }
//
//   render () {
//
//     const {  books } = this.state
//
//     return (
//
//     )
//   }
// }
//
// BookList.propTypes = {}
// BookList.defaultProps = {}
//
export default BookList
