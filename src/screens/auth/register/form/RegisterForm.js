import React, { useState, useContext } from 'react'
import Logo from '../../../../assets/logo.png'
import { Grid, Header, Image, Form, Segment, Button, Message } from 'semantic-ui-react'
import { AuthMode } from '../../../../config/Constants'
import { useForm } from '../../../../helpers/hooks/useForm';
import { useDispatch } from 'react-redux';
import { signup } from '../../../../services/actions/Auth';
import { AuthContext } from '../../../../services/context/AuthContext';
import validateEmail from '../../../../helpers/Util';

export default function RegisterForm({setAuthMode}) {

    const [loading, setLoading] = useState(false);
    const [values, handleChange] = useForm({ email: '', name: '', password: '', confirm_password: ''});
    const [errors, setErrors] = useState(Object());

    const dispatch = useDispatch();
    const context = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        let err = {}

        // EMAIL VALIDATION
        if(!values.email || values.email.length === 0) 
            err.email = 'Please enter an Email ID'
        else if(!validateEmail(values.email)) 
            err.email = 'Please enter a valid Email ID'
        
        // NAME VALIDATION
        if(!values.name || values.name.length === 0) 
            err.name = 'Please enter a name'
        else if(values.name.length < 3 || values.name.length > 100)
            err.name = 'Name should be between 3 to 100 characters long'
        
        // PASSWORD VALIDATION
        if(!values.password || values.password.length === 0) 
            err.password = 'Please enter a password'
        else if(values.password.length < 8 || values.password.length > 50)
            err.password = 'Password should be between 8 to 50 characters long'
        else if(values.password !== values.confirm_password) {
            err.password = 'Passwords do not match'
            err.confirm_password = 'Password do not match'
        }

        if(Object.keys(err).length) {
            setErrors(err)
        }
        else {
            setErrors(Object())
            dispatch(signup(values, context));
        }
        setLoading(false)
    };

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    <Image src={Logo} className='App-logo' /> Register a new account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input 
                            fluid 
                            icon='user' 
                            error={errors.email}
                            iconPosition='left' 
                            placeholder='Email' 
                            onChange={(v) => handleChange('email', v)}s />
                        <Form.Input 
                            fluid 
                            icon='audio description' 
                            error={errors.name}
                            iconPosition='left' 
                            placeholder='Name' 
                            onChange={(v) => handleChange('name', v)} />
                        <Form.Input
                            fluid
                            icon='lock'
                            error={errors.password}
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={(v) => handleChange('password', v)}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            error={errors.confirm_password}
                            iconPosition='left'
                            placeholder='Confirm Password'
                            type='password'
                            onChange={handleChange}
                            onChange={(v) => handleChange('confirm_password', v)}
                        />
                        {!loading && <Button color='blue' fluid size='large' onClick={handleSubmit}>
                            Register
                        </Button> }
                    </Segment>
                </Form>
                <Message>
                    Already a bookworm? 
                    <Button onClick={() => setAuthMode(AuthMode.LOGIN)}>Sign Up here</Button>
                </Message>
            </Grid.Column>
        </Grid>
    )
}
