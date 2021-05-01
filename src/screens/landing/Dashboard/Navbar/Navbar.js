import React, { useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Media from 'react-media';
import { Button, Menu, Container, Segment, Visibility } from 'semantic-ui-react';
import { AuthContext } from '../../../../services/context/AuthContext';

export default function Navbar() {

    const [fixed, setFixed] = useState(true)
    const history = useHistory();
    const {user, userData, logout} = useContext(AuthContext)

    const showFixedMenu = () => {
        setFixed(true)
    }

    const hideFixedMenu = () => {
        setFixed(false)
    }

    const signOut = () => {
        logout()
        window.location.reload(false)
    }

    return (
        <div style={{zIndex: 999999}}>
            <Visibility
                once={false}
                onBottomPassed={showFixedMenu}
                onBottomPassedReverse={hideFixedMenu} >
                    <Menu
                        fixed={'top'}
                        inverted={!fixed}
                        pointing={!fixed}
                        secondary={!fixed}
                        size='large' >
                        <Container>
                            <Menu.Item as={Link} to={'/'}>
                                Home
                            </Menu.Item>
                            <Menu.Item as={Link} to={'/my_books'}>
                                My Books
                            </Menu.Item>
                            <Menu.Item>
                                Welcome {userData.name}
                            </Menu.Item>
                            <Menu.Item>USERNAME {userData.username}</Menu.Item>
                            <Menu.Item position='right'>
                                {user.email}
                                <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }} onClick={() => signOut()}>
                                    Logout
                                </Button>
                            </Menu.Item>
                        </Container>
                    </Menu>
            </Visibility>
        </div>
    )
}
