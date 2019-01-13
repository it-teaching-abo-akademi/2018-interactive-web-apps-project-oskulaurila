import React from 'react';
import './Portfolio.css';
import Stocks from '../Stocks/Stocks'
import Modal from '../Modal/Modal'

export default class Portfolio extends React.Component {
    // Prevent modal opened automatically
    state = {
        openModal: false,
        selectedStocks: []
    };

    render() {
        const {id, value, onChange, onRemove, stocks } = this.props;
        return <div className="container col-lg-6">
            <button className="delete" onClick={() => onRemove(id)}>X</button>
            <input className="title" type="text" value={value} onChange={e => onChange(id, e)}/>
            <div className="stockCont">
                {/* Table header */}
                <div className="header row">
                    <div className="col">
                        <span> Name </span>
                    </div>
                    <div className="col">
                        <span> Unit value </span>
                    </div>

                    <div className="col">
                        <span> Quantity </span>
                    </div>

                    <div className="col">
                        <span> Total </span>
                    </div>

                    <div className="col">
                    </div>
                </div>
                {/* Render stocks and keep track of selected stocks */}
                {stocks.map((stock, i) => <Stocks key={i} stock={stock}
                                                  select={(stock) => this.setState({selectedStocks: [...this.state.selectedStocks, stock]})}>
                </Stocks>)}
            </div>
            {/* when row is added modal is closed */}
            {this.state.openModal ? <Modal id={id} abort={ () => this.setState ({openModal: false}) } newRow={(id, stock) => {
                this.props.newRow(id, stock);
                this.setState({openModal: false});
            }} /> : null}

            {/* Quantity input */}
            <div className="buttonRow">
                <button onClick={() => this.setState({openModal: true})} className="addStock">Add stock +</button>
                <button className="graph"> Graph</button>
                <button className="remove" onClick={() => this.props.deleteRow(id, this.state.selectedStocks)}>Remove selected</button>
            </div>
        </div>;
    }
}