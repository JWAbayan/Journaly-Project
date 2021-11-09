import react from 'react'
import { PersonFill } from 'react-bootstrap-icons';


class Calendar extends react.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('in');
        return (
            <div>
                <PersonFill size='32' />
            </div>
        );
    }
}

export default Calendar;