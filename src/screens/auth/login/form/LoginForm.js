import React, { useState, useContext } from 'react'
import './LoginForm.css'
import { useDispatch } from 'react-redux';
import Logo from '../../../../assets/logo.png'
import { Grid, Header, Image, Form, Segment, Button, Message } from 'semantic-ui-react'
import { AuthMode } from '../../../../config/Constants'
import { signin } from '../../../../services/actions/Auth';
import { useForm } from '../../../../helpers/hooks/useForm';
import { AuthContext } from '../../../../services/context/AuthContext';
import validateEmail from '../../../../helpers/Util';

export default function LoginForm({setAuthMode}) {

    const [loading, setLoading] = useState(false);
    const [values, handleChange] = useForm({ method: '', password: '' });
    const [errors, setErrors] = useState(Object())

    const dispatch = useDispatch();
    const context = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        let err = {}

        // EMAIL VALIDATION
        if(!values.method || values.method.length === 0) 
            err.method = 'Please enter an Email ID'
        
        // PASSWORD VALIDATION
        if(!values.password || values.password.length === 0) 
            err.password = 'Please enter a password'
        else if(values.password.length < 8 || values.password.length > 50)
            err.password = 'Password should be between 8 to 50 characters long'


        if(Object.keys(err).length) {
            console.error(err);
            setErrors(err)
        }
        else {
            setErrors(Object())
            dispatch(signin(values, context));
        }
        setLoading(false)
    };


    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    <Image src={Logo} className='App-logo' /> Log-in to your account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input 
                            fluid 
                            icon='user' 
                            error={errors.email}
                            iconPosition='left' 
                            placeholder='Username / Email' 
                            onChange={(v) => handleChange('method', v)} />
                        <Form.Input
                            fluid
                            icon='lock'
                            error={errors.password}
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={(v) => handleChange('password', v)}
                        />
                        <Button color='blue' fluid size='large' onClick={handleSubmit}>
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Visiting for the first time? 
                    <Button onClick={() => setAuthMode(AuthMode.REGISTER)}>Sign Up here</Button>
                </Message>
            </Grid.Column>
        </Grid>
    )
}
