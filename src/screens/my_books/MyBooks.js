import React, { useState, useEffect } from 'react'
import { Segment, Header, Container, Dimmer, Loader, Button, Image, Modal } from 'semantic-ui-react'
import Navbar from '../landing/Dashboard/Navbar/Navbar'
import { fetchUserBooks } from '../../api'
import BooksScroller from '../book/BooksScroller'
import BookManager from './BookManager'

export default function MyBooks() {

    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState(false)
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
        <div>
            <Navbar />
            <Segment style={{paddingTop: '10vh'}}>
                <Container>
                    <Header as='h2'>My Books</Header>
                    <Modal
                        onOpen={(e) =>
                            setOpen(true)
                        }
                        onClose={(e) =>
                            setOpen(false)
                        }
                        open={open}
                        trigger={<Button content='Create a new book' />} >
                            <Modal.Header>Edit your Book</Modal.Header>
                            <Modal.Content image>
                                <Image size='medium' src='https://freepngimg.com/thumb/book/21935-4-civil-engineering-book.png' wrapped />
                                <div style={{width: '100%'}}>
                                    <BookManager setOpen={setOpen} />
                                </div>
                            </Modal.Content>
                    </Modal>
                    <div style={{padding: '2rem'}} />
                    {isLoading && <Segment style={{minHeight: '100px'}}>
                        <div style={{zIndex: 100}}><Dimmer active >
                            <Loader />
                        </Dimmer></div>
                    </Segment> }
                    <BooksScroller showOptions={true} books={books} />
                </Container>
            </Segment>
        </div>
    )
}
