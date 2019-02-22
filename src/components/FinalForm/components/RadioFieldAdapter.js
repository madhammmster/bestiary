import React from 'react';
import { Radio, Form } from 'semantic-ui-react';

const RadioFieldAdapter = ({ input, meta, ...rest }) => {    
    return (
        <Form.Field>
            <Radio
                {...input}
                {...rest}
                onChange={
                    (event, data) => {                        
                        input.onChange(input.value)
                    }
                }
            />
        </Form.Field>
    )
}


export default RadioFieldAdapter;