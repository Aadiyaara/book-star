import React, { useState, useEffect } from 'react'
import { Segment, Container, Header, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import BooksScroller from '../../../book/BooksScroller'
import { fetchBooks } from '../../../../api'
import {FILTER_COLLECTION_HEADINGS } from '../../../../config/Constants'

export default function BookLandingList({filter}) {

    const [books, setBooks] = useState([])
    const [order, setOrder] = useState(filter === 'title' ? 'ASC' : 'DSC')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getBooks(filter, order)
    }, [])

    const getBooks = async (filter, order) => {
        const newBooks = (await fetchBooks(filter, order)).data
        setBooks(newBooks)
        setLoading(false)
    }

    const onOrderChange = (value) => {
        setOrder(value)
        getBooks(filter, value)
    }

    return (
        <Segment
            textAlign={'left'}
            style={{ minHeight: '40vh', padding: '1em 1em' }}  >

                {loading && <div style={{zIndex: 100}}><Dimmer active >
                    <Loader />
                </Dimmer></div>}
                <Container >
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <Header as='h2'>{FILTER_COLLECTION_HEADINGS(filter, order)}</Header>
                        <Dropdown text='Choose order'>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Inc' onClick={() => onOrderChange('ASC')}/>
                                <Dropdown.Item text='Dec' onClick={() => onOrderChange('DEC')}/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <BooksScroller books={books}/>
                </Container>
        </Segment>
    )
}
