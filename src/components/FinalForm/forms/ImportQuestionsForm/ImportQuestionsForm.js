import React from 'react';
import { Form as FinalForm, Field as FinalField } from 'react-final-form';
import { Button, Form } from 'semantic-ui-react';

import TextAreaFieldAdapter from '../../components/TextAreaFieldAdapter';

import {required} from '../../validators/validators'

class ImportQuestionsForm extends React.Component {

    render() {
        const { onSubmit } = this.props;
        return (
            <FinalForm
                onSubmit={onSubmit}
                render={({ handleSubmit }) =>
                    (
                        <Form className='import-questions-form' onSubmit={handleSubmit}>

                            <FinalField
                                label='JSON'
                                name='json'
                                placeholder='json'
                                component={TextAreaFieldAdapter}
                                validate={required}
                            />



                            <Form.Field>
                                <Button size='tiny' type='submit' color='olive'>Zaimportuj pytania</Button>
                            </Form.Field>
                        </Form>
                    )
                }

            />


        )
    }
}

export default ImportQuestionsForm;