import react from "react";
import '../styles/Home.css'
import { ButtonGroup, Button } from 'react-bootstrap'

/**
 * FIXED:
 *  > Late updating of items when clicking a tag button
 */


//Item tags
const TAG_NAMES = ['Events', 'Notes', 'Tasks']

const TEST_ITEMS = [
    { id: '0', tag: TAG_NAMES[1] },
    { id: '1', tag: TAG_NAMES[1] },
    { id: '2', tag: TAG_NAMES[1] },
    { id: '3', tag: TAG_NAMES[1] },
    { id: '4', tag: TAG_NAMES[0] },
    { id: '5', tag: TAG_NAMES[2] }
]

var itemsToDisplay = []


class Home extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: '',
            show: false,
        }

        this.setTag = this.setTag.bind(this);
    }

    //Retrieve all items in the API
    retrieveItemsData() {

    }

    //Retrieve item data based on the current tag
    retrieveItems() {
        itemsToDisplay = [];

        TEST_ITEMS.forEach(item => {
            if (item['tag'] === this.state.tag) {
                itemsToDisplay.push(item);
            }
        });
    }

    //Returns new item component
    renderItems() {
        this.retrieveItems();
        return itemsToDisplay ? itemsToDisplay.map(item => <Item key={item.id} tag={item.tag} />) : null;
    }

    //Set the current tag 
    setTag(event) {
        this.setState({ tag: event.target.name });
    }

    render() {
        return (
            <>
                <div className="navbar">
                    <ButtonGroup>
                        {TAG_NAMES.map(name => (<TagButton key={TAG_NAMES.indexOf(name)} name={name} onClick={this.setTag} />))}
                    </ButtonGroup>
                </div>
                <div className="items-container">
                    {this.renderItems()}
                </div>
            </>

        );
    }
}

//Returns a new tag button 
class TagButton extends react.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.handleClick = props.onClick;
    }

    render() {
        return (
            <Button name={this.name} className="mx-2 rounded-3" size="sm" variant="outline-info" onClick={this.handleClick}>{this.name}</Button>
        );
    }
}

//Item Component
class Item extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: props.tag,
            title: props.title,
            desc: props.desc,

        };
    }

    render() {
        return (
            <div className="item">
                <div className="item-header">
                    <p>Header</p>
                </div>
                <div className="item-main">
                    <p>Main</p>
                </div>
                <div className="item-footer">
                    <p>Footer</p>
                </div>
            </div>
        );
    }
}

export default Home;