import React from 'react';
import { Form as FinalForm, Field as FinalField } from 'react-final-form';
import { Button, Form } from 'semantic-ui-react';

import TextFieldAdapter from '../../components/TextFieldAdapter';

import { required } from '../../validators/validators';

import './LoginForm.scss'

class LoginForm extends React.Component {

    render() {
        const { onSubmit } = this.props;
        return (
            <FinalForm
                onSubmit={onSubmit}
                render={({ handleSubmit }) =>
                    (
                        <Form className='login-form' onSubmit={handleSubmit}>
                            <Form.Group  >
                                <FinalField
                                    name='email'
                                    placeholder='email'
                                    icon='user'
                                    iconPosition='left'
                                    component={TextFieldAdapter}
                                    validate={required}
                                />
                            </Form.Group>

                            <Form.Group  >
                                <FinalField
                                    name='password'
                                    type='password'
                                    icon='key'
                                    iconPosition='left'
                                    placeholder='hasło'
                                    component={TextFieldAdapter}
                                    validate={required}
                                />
                            </Form.Group>

                            <Form.Group  >
                                <Button type='submit' color='olive'>zaloguj</Button>
                            </Form.Group>
                        </Form>
                    )
                }

            />


        )
    }
}

export default LoginForm;