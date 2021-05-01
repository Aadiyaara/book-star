import React, { useContext } from 'react'
import Navbar from './Navbar/Navbar'
import { Container, Grid, Segment, Header } from 'semantic-ui-react'
import MyBooksWindow from '../../my_books/MyBooksWindow'
import BookLanding from './BookLanding/BookLanding'
import { AuthContext } from '../../../services/context/AuthContext'

export default function Dashboard() {

    const { userData } = useContext(AuthContext)

    return (
        <div>
            <Navbar />
            <Segment
                inverted
                textAlign='left'
                style={{ minHeight: '100vh', padding: '1em 0em' }}
                vertical >
                <div style={{padding: '7vh 10vw'}}>
                    <Container fluid >
                        <Header as='h1'>
                            <div style={{color: 'white'}}>
                                Welcome {userData.username}
                            </div>
                        </Header>
                    </Container>
                    <Container fluid>
                        <Grid columns={2} stackable>
                            <Grid.Column width={12}>
                                <BookLanding />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <MyBooksWindow />
                            </Grid.Column>
                        </Grid>
                    </Container>
                </div>
            </Segment>
        </div>
    )
}
