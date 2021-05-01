import React, { useState } from 'react'
import Navbar from '../landing/Dashboard/Navbar/Navbar'
import { Segment, Button, Header, Container } from 'semantic-ui-react'
import { useLocation, Redirect, Link } from 'react-router-dom';
import Book from './Book';
import Reader from './reader/Reader';

export default function BookSummary() {
    const [readMode, setReadMode] = useState(null);

    const { state } = useLocation();

    if(!state)
        return <Redirect to='/' />

    const read = () => {
        setReadMode(true)
    }

    const close = () => {
        setReadMode(false)
    }

    return (
        <div>
            <Navbar />
            {
                readMode ? <Reader book={state} /> : <Segment style={{paddingTop: '10vh'}}>
                    <Container>
                        <Header as='h1'>
                            Book Summary 
                        </Header>
                        <img src={state.image ? `data:image/jpg;base64,${state.image}` : "https://m.media-amazon.com/images/I/41gr3r3FSWL.jpg"} alt='book_cover' style={{height: '23.5vh', width: '10vw'}} />
                        <div>
                            <Button onClick={() => read()}>
                                Read
                            </Button>
                        </div>
                        <Header as='h3'>
                            <b>Title: </b> {state.title}
                        </Header>
                        <Header as='h3'>
                            <b>Caption: </b> {state.caption}
                        </Header>
                    </Container>
                </Segment>
            }
        </div>
    )
}
