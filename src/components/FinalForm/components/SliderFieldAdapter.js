import React from 'react';
import CheckboxFieldAdapter from './CheckboxFieldAdapter';


const SliderFieldAdapter = ({...props}) => {

    return (
        <CheckboxFieldAdapter 
            {...props}
            slider
        />
    )
}

export default SliderFieldAdapter;