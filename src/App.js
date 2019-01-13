import React, { Component } from 'react';
import './App.css';
import Portfolio from './Portfolio/Portfolio';

class App extends Component {
    constructor(props) {
        super(props);
        // Elements array for portfolio component
        this.state = {
            elements: [{
                id: 0,
                name: 'Title 0',
                // empty array for stocks when they are later added
                stocks: []
            }],
        };
        // Binds for update title, create new portfolio and delete portfolio
        this.updateTitle = this.updateTitle.bind(this);
        this.newPortfolio = this.newPortfolio.bind(this);
        this.deletePortfolio = this.deletePortfolio.bind(this);
    }
    // Rename title field
    updateTitle(id, e) {
        const { value } = e.target;
        const elements = this.state.elements;

        // Check correct portfolio ID
        const index = elements.findIndex(el => el.id === id);
        elements[index].name = value;
        this.setState({ elements });
    }

    // give basic starting values for stock and new portfolio
    // This helps to prevent same duplicate id problem when id is deleted and added again
    maxId = 0;
    maxStockId = 0;

    // Create new portfolio
    newPortfolio() {
        const { elements } = this.state;

        // Creates new array for portfolio
        elements[elements.length] = {
            id: this.maxId + 1,
            name: 'Title ' + elements.length,
            stocks: []
        };
        this.maxId += 1;

        this.setState({
            elements
        })
    }

    // Deletes existing portfolio
    deletePortfolio(id) {

        // check ID and push everything else in the array except curren ID aka. removes it from the array.
        const newElements = this.state.elements.filter(element => {
            return element.id !== id;
        });

        this.setState({
            elements: [...newElements]
        })
    }

    // Create new row
    newRow(id, newRow) {
        const { elements } = this.state;

        // map checks all items in array and returns edited array if you edit.
        const newElements = elements.map( element => {
            if (element.id === id){
                newRow.id = this.maxStockId + 1;
                this.maxStockId += 1;

                // Prevents user to add more than 50 same symbol items in one porfolio
                if (element.stocks.filter((stock) => stock.symbol === newRow.symbol).length < 50 )
                    element.stocks.push(newRow);
                else alert ('Maximum number of same type of symbols exceeded (50)')
            }
            return element;
        });
        this.setState({
            elements: newElements
        })
    }

    // Delete row
    deleteRow(id, deleteRows) {
        const newRows = this.state.elements.filter(element => {
            if (element.id === id)  {

                // lets you delete more than one rows at the same time
                element.stocks = element.stocks.filter(row => !deleteRows.some(row2 => row2.id === row.id));
            }
            return element;
        });
        this.setState({elements: newRows});
    }


    render() {
        const { elements } = this.state;
        return (
            <div className="wrapper col-lg-12">
                {/* Let's user add up to 10 portfolios */}
                { ( elements.length < 10 &&
                <button
                    onClick={this.newPortfolio}
                    className="portbtn col-lg-12">Add new portfolio +
                </button> )
                // fires this instead of a new portfolio button if there are 10 portfolios created
                ||
                <div className="infoBox">  Maximum amount (10) of portfolios exceeded </div> }


                <div>
                    (/* All variables for the Porfolios that are rendered */}
                    {elements.map(element =>
                        <Portfolio
                            key={element.id}
                            value={element.name}
                            id={element.id}
                            onChange={this.updateTitle}
                            onRemove={this.deletePortfolio}
                            newRow={this.newRow.bind(this)}
                            deleteRow={this.deleteRow.bind(this)}
                            stocks={element.stocks}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default App;
