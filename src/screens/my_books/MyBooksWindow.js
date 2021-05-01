import React, { useState, useEffect, useContext } from 'react'
import { Segment, Button, Loader, Dimmer } from 'semantic-ui-react'
import Book from '../book/Book'
import { fetchUserBooks } from '../../api'
import { AuthContext } from '../../services/context/AuthContext'
import { Link } from 'react-router-dom'

export default function MyBooksWindow() {

    const [isLoading, setIsLoading] = useState(true)
    const [books, setBooks] = useState([])

    useEffect(() => {
        getMyBooks()
    }, [])

    const getMyBooks = async () => {
        const myBooks = await fetchUserBooks()
        setBooks(myBooks.data)
        setIsLoading(false)
    }

    return (
        <Segment
            textAlign='center'
            style={{ minHeight: '40vh', padding: '1em 0em' }}>
            My Books
            {isLoading && <div style={{zIndex: 100}}><Dimmer active >
                <Loader />
            </Dimmer></div>}
            {!isLoading && !books.length && 
                <div style={{textAlign: 'center'}}>
                    No books created yet
                </div>
            }
            <div style={{height: '35vh', overflowX: 'hidden', overflowY: 'scroll'}}>
                {!!(books.length) && books.map(book => {
                    return <div>
                        <Book book={book} key={book.id} />
                    </div>
                })}
            </div>
            <Button as={Link} to='/my_books' >View All</Button>
        </Segment>
    )
}
