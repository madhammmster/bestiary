
import React from 'react';
import { Form as FinalForm, Field as FinalField } from 'react-final-form';
import { Button, Form, Divider } from 'semantic-ui-react';

import TextFieldAdapter from '../../components/TextFieldAdapter';
import CheckboxFieldAdapter from '../../components/CheckboxFieldAdapter';
import RadioFieldAdapter from '../../components/RadioFieldAdapter';

import TextAreaFieldAdapter from '../../components/TextAreaFieldAdapter';
import { required } from '../../validators/validators'
import './QuestionForm.scss'

import config from '../../../../config';
const { categories } = config;

class QuestionForm extends React.Component {

    render() {
        const { onSubmit, initialValues } = this.props;

        return (
            <FinalForm
                onSubmit={onSubmit}

                initialValues={initialValues}

                render={({ handleSubmit, submitting, errors, meta }) =>
                    (
                        <Form className='question-form' onSubmit={handleSubmit}>
                            <FinalField
                                name='question'
                                label='Pytanie'
                                validate={required}
                                placeholder='Pytanie'
                                component={TextFieldAdapter}
                            />

                            <Form.Field>
                                <label>Opis</label>
                                <FinalField
                                    name='description'
                                    placeholder='Opis'
                                    component={TextAreaFieldAdapter}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Odpowiedz</label>
                                <FinalField
                                    name='answer'
                                    placeholder='Odpowiedz'
                                    component={TextAreaFieldAdapter}
                                />
                            </Form.Field>

                            <Divider />

                            <FinalField
                                name='website'
                                label='Strona pomocnicza'
                                placeholder='Strona pomocnicza'
                                component={TextFieldAdapter}
                            />

                            <Divider />

                            <Form.Field>
                                <label>Kategorie</label>

                                <Form.Group>
                                    {
                                        categories.map((category) => {
                                            return (
                                                <FinalField
                                                    key={category.value}
                                                    name='categories'
                                                    label={category.label}
                                                    type='checkbox'
                                                    value={category.value}
                                                    component={CheckboxFieldAdapter}
                                                />
                                            )
                                        })
                                    }
                                </Form.Group>
                            </Form.Field>

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
                                <Button type='submit' color='olive' disabled={submitting}>Zapisz</Button>
                            </Form.Group>
                        </Form>
                    )
                }

            />


        )
    }
}

export default QuestionForm;