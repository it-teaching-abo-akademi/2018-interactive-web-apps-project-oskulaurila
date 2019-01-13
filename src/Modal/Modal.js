import React from 'react';
import './Modal.css';

// this modal lets you add new row
export default class Modal extends React.Component {
    state = {
        symbol: '',
        quantity: 0
    };

    render() {
        // bootstrap modal
        return <div className="modal" style={{display: 'block'}} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        {/* Title */}
                        <h5 className="modal-title">Add new stock</h5>
                    </div>

                    <div className="modal-body">
                        {/* Symbol input */}
                        <div className="form-group">
                            <label> Symbol </label>
                            <input placeholder="Insert Symbol here, i.e. NOK" className='form-control' onChange={
                                (e) => this.setState({symbol: e.target.value})
                            }>
                            </input>

                        </div>
                        {/* Quantity input */}
                        <div className="form-group">
                            <label> Quantity </label>
                            <input placeholder="Insert amount" type='number' className='form-control' onChange={
                                (e) => this.setState({quantity: parseInt(e.target.value, 10)})
                            }>
                            </input>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="modal-footer">
                        <button type="button" className="save btn-sm btn-primary"
                                onClick={() => this.props.newRow(this.props.id, this.state)}>
                            Save changes
                        </button>
                        <button type="button" className="cancel btn-sm btn-secondary" data-dismiss="modal" onClick={this.props.abort}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>;
    }
}
