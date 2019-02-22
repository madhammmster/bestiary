import React from 'react';
import CheckboxFieldAdapter from './CheckboxFieldAdapter';


const ToggleFieldAdapter = ({...props}) => {

    return (
        <CheckboxFieldAdapter 
            {...props}
            toggle
        />
    )
}

export default ToggleFieldAdapter;