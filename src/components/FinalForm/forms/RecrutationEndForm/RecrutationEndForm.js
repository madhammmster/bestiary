import React from 'react';
import { Form as FinalForm, Field as FinalField } from 'react-final-form';
import { Button, Form, Divider } from 'semantic-ui-react';

import TextAreaFieldAdapter from '../../components/TextAreaFieldAdapter';
import SelectFieldAdapter from '../../components/SelectFieldAdapter';
import TextFieldAdapter from '../../components/TextFieldAdapter';

import { required } from '../../validators/validators'


class RecrutationEndForm extends React.Component {

    scores = [
        { key: 0, value: 0, text: 'Negatywny' },
        { key: 1, value: 1, text: 'Trudno powiedzieć' },
        { key: 2, value: 2, text: 'Pozytywny' },
    ]

    render() {
        const { onSubmit, initialValues } = this.props;

        return (
            <FinalForm
                onSubmit={onSubmit}

                initialValues={initialValues}

                render={({ handleSubmit }) =>
                    (
                        <Form className='recrutation-end-form' onSubmit={handleSubmit}>
                            <Form.Group widths='equal' >

                                <FinalField
                                    name='score'
                                    placeholder='Wynik'
                                    label='Wynik'
                                    options={this.scores}
                                    component={SelectFieldAdapter}
                                    validate={required}
                                />


                                <FinalField
                                    name='grade'
                                    placeholder='Stopień'
                                    label='Stopień'
                                    type='number'
                                    step='0.5'
                                    min='0'
                                    max='10'
                                    component={TextFieldAdapter}
                                    validate={required}
                                />
                            </Form.Group>

                            <Divider />

                            <FinalField
                                label='Podsumowanie'
                                name='summary'
                                validate={required}
                                placeholder='Podsumowanie'
                                component={TextAreaFieldAdapter}
                            />

                            <Divider />

                            <Form.Group  >
                                <Button type='submit' color='red'>Zakończ rekrutację</Button>
                            </Form.Group>
                        </Form>
                    )
                }

            />


        )
    }
}

export default RecrutationEndForm;