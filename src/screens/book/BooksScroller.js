import React, { useEffect, useState } from 'react'
import { Segment, Container } from 'semantic-ui-react'
import Book from './Book'

export default function BooksScroller({books, showOptions=false}) {


    return (
        <div style={{width: '100%', height: showOptions ? '45vh' : '37.5vh', overflowY: 'hidden', display: 'flex', flexDirection: 'row'}}>
            {
                books && books.map(book => {
                    return <Book book={book} key={book.id} showOptions={showOptions}/>
                })
            }
        </div>
    )
}
