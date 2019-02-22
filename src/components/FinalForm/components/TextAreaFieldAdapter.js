import React from 'react';
import { TextArea, Form} from 'semantic-ui-react';

const TextAreaFieldAdapter = ({ input, meta, ...rest }) => {
    return (
        <Form.Field error={meta.error && meta.touched}>
            <label>{rest.label}</label>
            {meta.error && meta.touched && <div className='error-span'>{meta.error}</div>}
            <TextArea
                {...rest}
                {...input}
                label={undefined}
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

export default TextAreaFieldAdapter;