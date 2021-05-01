import React, { useState } from 'react'
import { Button, Modal, Image, Header } from 'semantic-ui-react'
import BookManager from '../my_books/BookManager'
import { Link, useHistory } from 'react-router-dom'
import { deleteBook } from '../../api'

export default function Book({book, showOptions=false}) {

    const [open, setOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const history = useHistory()

    const deleteMyBook = async () => {
        await deleteBook(book._id)
        history.push('/')
        setDeleteOpen(false)
    }

    return (
        <div style={{height: '35vh', paddingRight: '1rem', width: '12vw', textOverflow: 'ellipsis', overflowWrap: 'break-word'}}>
            <Link to={{ pathname: `book`, state: book}}>
                <img src={book.image ? `data:image/jpg;base64,${book.image}` : "https://m.media-amazon.com/images/I/41gr3r3FSWL.jpg"} alt='book_cover' style={{height: '23.5vh', width: '10vw'}} />
            </Link>
            <div  style={{with: '8vw', textOverflow: 'ellipsis'}}><b>{book.title}</b></div>
            <div  style={{with: '8vw', textOverflow: 'ellipsis'}}>{book.caption}</div>
            {showOptions && 
                <div>
                    <Modal
                        onOpen={(e) =>
                            setOpen(true)
                        }
                        onClose={(e) =>
                            setOpen(false)
                        }
                        open={open}
                        trigger={<Button icon='edit' />} >
                            <Modal.Header>Enter details of your Book</Modal.Header>
                            <Modal.Content image>
                                <Image size='medium' src='https://freepngimg.com/thumb/book/21935-4-civil-engineering-book.png' wrapped />
                                <div style={{width: '100%', paddingLeft: '2rem'}}>
                                    <BookManager book={book} setOpen={setOpen} />
                                </div>
                            </Modal.Content>
                    </Modal>
                    <Modal
                        onOpen={(e) =>
                            setDeleteOpen(true)
                        }
                        onClose={(e) =>
                            setDeleteOpen(false)
                        }
                        open={deleteOpen}
                        trigger={<Button icon='delete' />} >
                            <Modal.Header>
                                Are you sure you want to delete this book
                            </Modal.Header>
                            <Modal.Actions>
                                <Button onClick={() => setDeleteOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={() => deleteMyBook()}>
                                    Delete
                                </Button>
                            </Modal.Actions>
                    </Modal>
                </div>
            }
        </div>
    )
}
