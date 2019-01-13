import React from 'react';
import './Stocks.css';

// Creates random value to imitate value from missing API
const getPrice = () => (Math.random() * 50).toFixed(2);


export default class Stock extends React.Component {
    // fires price function one time when component is rendered
    componentWillMount() {
        this.PRICE = getPrice();
    }

    render() {
        const { props } = this;
        return <div className="row">
            <div className="col">
                {/* Symbol */}
                <span> {props.stock.symbol} </span>
            </div>
            <div className="col">
                {/* Unit Value with random value generated */}
                <span> {this.PRICE} €</span>
            </div>

            <div className="col">
                {/* Amount of stocks */}
                <span> {props.stock.quantity} </span>
            </div>

            <div className="col">
                {/* Amount of stocks multiplied with Unit Value (price) */}
                <span> {(this.PRICE * props.stock.quantity).toFixed(2)} €</span>
            </div>

            <div className="check col">
                {/* Checkbox for remove (or graph output) */}
                <label><input type="checkbox" value="" onClick={() => props.select(props.stock)}>
                </input></label>
            </div>
        </div>;
    }
}
