import React from 'react';
import { Select, Form } from 'semantic-ui-react';

const SelectFieldAdapter = ({ input, meta, ...rest }) => {
    return (
        <Form.Field  error={meta.error && meta.touched}>
            <label>{rest.label}</label>
            {meta.error && meta.touched && <div className='error-span'>{meta.error}</div>}
            <Select
                {...rest}
                {...input}
                onChange={
                    (event, data) => {
                        const { value } = data;
                        input.onChange(value);
                    }
                }
            />
        </Form.Field>
    )
}

export default SelectFieldAdapter;