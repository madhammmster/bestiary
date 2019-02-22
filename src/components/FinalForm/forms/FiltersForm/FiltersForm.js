import React from 'react';
import { connect } from 'react-redux';
import { Form as FinalForm, Field as FinalField } from 'react-final-form';
import { Form, Segment } from 'semantic-ui-react';
import FiltersEmmiter from '../../../FiltersEmmiter/FiltersEmmiter'

import CheckboxFieldAdapter from '../../components/CheckboxFieldAdapter';

import { setFilters } from '../../../../store/reducers/questionsReducer';

import config from '../../../../config';
const { categories } = config;

class FiltersForm extends React.Component {


    render() {

        return (
            <Segment>
                <FinalForm
                    onSubmit={() => { }}
                    render={({ handleSubmit, values }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <FiltersEmmiter
                                    values={values}
                                />
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

                                <Form.Field>
                                    <label>Poziom</label>

                                    <Form.Group>
                                        <FinalField
                                            name='skills'
                                            label='Junior'
                                            value='junior'
                                            type='checkbox'
                                            component={CheckboxFieldAdapter}
                                        />
                                        <FinalField
                                            name='skills'
                                            label='Regular'
                                            value='regular'
                                            type='checkbox'
                                            component={CheckboxFieldAdapter}
                                        />
                                        <FinalField
                                            name='skills'
                                            label='Senior'
                                            value='senior'
                                            type='checkbox'
                                            component={CheckboxFieldAdapter}
                                        />
                                    </Form.Group>
                                </Form.Field>
                            </Form>
                        )
                    }}
                />
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        candidate: state.recrutations.candidate
    }
}

const mapDispatchToProps = {
    setFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersForm);