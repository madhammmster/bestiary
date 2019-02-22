
import React from 'react';
import { Form as FinalForm, Field as FinalField } from 'react-final-form';
import { Button, Form, Divider } from 'semantic-ui-react';

import TextFieldAdapter from '../../components/TextFieldAdapter';
import RadioFieldAdapter from '../../components/RadioFieldAdapter';

import { required } from '../../validators/validators'

class RecrutationStartForm extends React.Component {

    render() {
        const { onSubmit, initialValues } = this.props;

        return (
            <FinalForm
                onSubmit={onSubmit}

                initialValues={initialValues}

                render={({ handleSubmit }) =>
                    (
                        <Form className='recrutation-start-form' onSubmit={handleSubmit}>

                            <Form.Group>
                                <FinalField
                                    name='firstname'
                                    label='Imię'
                                    placeholder='Imię'
                                    validate={required}
                                    component={TextFieldAdapter}
                                />

                                <FinalField
                                    name='lastname'
                                    label='Nazwisko'
                                    placeholder='Nazwisko'
                                    validate={required}
                                    component={TextFieldAdapter}
                                />

                            </Form.Group>

                            <Divider />

                            <Form.Field>
                                <label>Poziom</label>

                                <Form.Group>
                                    <FinalField
                                        name='skill'
                                        label='Junior'
                                        value='junior'
                                        type='radio'
                                        component={RadioFieldAdapter}
                                    />
                                    <FinalField
                                        name='skill'
                                        label='Regular'
                                        value='regular'
                                        type='radio'
                                        component={RadioFieldAdapter}
                                    />
                                    <FinalField
                                        name='skill'
                                        label='Senior'
                                        value='senior'
                                        type='radio'
                                        component={RadioFieldAdapter}
                                    />
                                </Form.Group>
                            </Form.Field>

                            <Divider />

                            <Form.Group  >
                                <Button type='submit' color='olive'>Rozpocznij rekrutację</Button>
                            </Form.Group>
                        </Form>
                    )
                }

            />


        )
    }
}

export default RecrutationStartForm;