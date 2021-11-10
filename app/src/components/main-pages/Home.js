import react from "react";
import '../styles/Home.css'
import { ButtonGroup, Button } from 'react-bootstrap'
import axios from "axios";
/**
 * FIXED:
 *  > Late updating of items when clicking a type button
 */


//Item tags
const TYPES = ['T', 'N', 'E']

// const TEST_ITEMS = [
//     { id: '0', type: TYPES[1] },
//     { id: '1', type: TYPES[1] },
//     { id: '2', type: TYPES[1] },
//     { id: '3', type: TYPES[1] },
//     { id: '4', type: TYPES[0] },
//     { id: '5', type: TYPES[2] }
// ]


var items = [];
var itemsToDisplay = [];


class Home extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            show: false,
        }

        this.setTag = this.setTag.bind(this);
    }

    //Retrieve data from API after Home is rendered
    componentDidMount() {
        this.retrieveItemsData();
    }

    //Retrieve all items in the API
    retrieveItemsData() {
        const url = "http://localhost:8000/api/items/"
        axios.get(url)
            .then(result => {
                items = result.data;
                console.log(items);
            })
    }

    //Retrieve item data based on the current type
    retrieveItems() {
        itemsToDisplay = [];



        if (items) {
            items.forEach(item => {
                if (item['Type'] === this.state.type) {
                    itemsToDisplay.push(item);
                }
            });
        }
    }

    //Returns new item component
    renderItems() {
        this.retrieveItems();
        return itemsToDisplay ? itemsToDisplay.map(item => <Item key={item.id} type={item.type} />) : null;
    }

    //Set the current type 
    setTag(event) {
        this.setState({ type: event.target.name });
    }

    render() {
        return (
            <>
                <div className="navbar">
                    <ButtonGroup>
                        {TYPES.map(name => (<TagButton key={TYPES.indexOf(name)} name={name} onClick={this.setTag} />))}
                    </ButtonGroup>
                </div>
                <div className="items-container">
                    {this.renderItems()}
                </div>
            </>

        );
    }
}

//Returns a new type button 
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
            type: props.type,
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