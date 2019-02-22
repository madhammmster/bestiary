import React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';

const CheckboxFieldAdapter = ({ input, meta, ...rest }) => {

    return (
        <Form.Field>
            <Checkbox                
                {...input}
                {...rest}
                value={undefined}
                onChange={
                    (event, data) => {
                        const { checked } = data;
                        const { value } = input;

                        if (value) {
                            input.onChange({
                                target: {
                                    type: 'checkbox',
                                    checked,
                                    value
                                }
                            })
                        } else {
                            input.onChange(checked);
                        }


                    }
                }
            />
        </Form.Field>
    )
}

export default CheckboxFieldAdapter;