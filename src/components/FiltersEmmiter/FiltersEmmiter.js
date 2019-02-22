import React from 'react';
import { connect } from 'react-redux';
import { setFilters } from '../../store/reducers/questionsReducer'

class FiltersEmmiter extends React.Component {

    componentDidUpdate() {
        const { values, setFilters } = this.props;
        setFilters(values)
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = {
    setFilters
}

export default connect(null, mapDispatchToProps)(FiltersEmmiter);