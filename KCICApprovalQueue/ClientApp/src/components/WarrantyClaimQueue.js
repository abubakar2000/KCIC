import React, { Component,useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { actionCreators } from '../store/WarrantyClaims';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import AddClaimModal from './AddClaimModal';
import CurrencyFormat from 'react-currency-format';
import Moment from 'react-moment';
import Unauthenticated from './Unauthenticated';
import ClaimsService from '../services/claimsService';


class Queue extends Component {
    array = [];
    constructor(props) {
        super(props);
        this.array = this.props.claims
        
    }
  componentDidMount() {
      this.ensureDataFetched();
      
      this.array = this.props.claims
  }
  componentDidUpdate() {
      this.ensureDataFetched();
  }

  ensureDataFetched() {
      this.props.requestWarrantyClaims();
  }


  render() {
      return (
      <div>
                
              {(this.props.auth.currentUser.username === "ApproverUser" || this.props.auth.currentUser.username === "Authenticated") ? <div>
                  <h1>Warranty Claims Approval Queue</h1>
                  <p>Warranty claims pending review are listed below.</p>
                  {renderWarrantyClaimsTable(this.props)}
              </div> : <Unauthenticated />}

              
              
              <AddClaimModal buttonLabel="Add Claim" isVisible={( this.props.auth.currentUser.username === "Authenticated")} onSuccess={this.props.requestWarrantyClaims}> </AddClaimModal>
      </div>
    );
  }

}

const rightAlign = {
  textAlign: 'right'
};
function renderWarrantyClaimsTable(props) {
    const sort = (param) => {
        var newVar = param
        var sortedArray = []
        sortedArray.push(...param.filter(data => { return data.claimAcceptanceStatus === "Reviewing" }))
        var ascending = param.filter(data => { return data.claimAcceptanceStatus !== "Reviewing" });
        for (let i = 0; i < ascending.length; i++) {
            for (let j = i; j < ascending.length; j++) {
                if (ascending[i].issue > ascending[j].issue) {
                    let temp = ascending[i]
                    ascending[i] = ascending[j]
                    ascending[j] = temp
                }
            }
        }
        sortedArray.push(...ascending)
        return sortedArray
    }
  return (
    <table className='table table-striped'>Ï
      <thead>
              <tr>
                  <th>Date Submitted</th>
            <th>Name</th>
          <th>Product</th>
          <th>Issue</th>
          <th>Documented?</th>
                  <th style={rightAlign}>Payment Amount</th>
                  
                  <th>Status</th>
        </tr>
      </thead>
          <tbody>
              {sort(props.claims).map(claim =>
            <tr key={claim.id}>
            <td><Moment date={claim.dateSubmitted} format={'YYYY/MM/DD'}/></td>
              <td>{claim.firstName} {claim.lastName}</td>
              <td>{claim.product}</td>
              <td>{claim.issue}</td>
              <td>{claim.isDocumented}</td>

            <td style={rightAlign}>
                <CurrencyFormat value={claim.paymentAmount} displayType={'text'} prefix={'$'} fixedDecimalScale={true} decimalScale={2} />
                </td>
                      {claim.claimAcceptanceStatus === "Approved" ? <td style={{ color: "green" }}>Approved</td> : (claim.claimAcceptanceStatus === "Rejected" ? <td style={{ color: "red" }}>Rejected</td> : <td style={{ color: "blue" }}>Pending...</td>)}
                      {claim.claimAcceptanceStatus === "Approved" ? <td>{props.auth.currentUser.username === "ApproverUser" && <button className="btn btn-danger">Reject</button>}</td> : (claim.claimAcceptanceStatus === "Rejected" ? <td style={{ color: "red" }}>{props.auth.currentUser.username === "ApproverUser" && <button className="btn btn-success">Approve</button>}</td> : <td style={{ color: "blue" }}></td>)}

          </tr>
        )}
      </tbody>
      </table>
  );
}

function mapState(state) {
  
  return {
    auth: state.auth,
    claims: state.claims.claims
  }
}

export default connect(
  mapState,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Queue);

