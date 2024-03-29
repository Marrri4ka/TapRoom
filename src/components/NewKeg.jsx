import React from 'react';
import PropTypes from 'prop-types';
import {v4} from 'uuid';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Header from './Header';
import {withRouter} from 'react-router';
import axios from '../../src/axios-db';

function NewKeg(props){
  let _names = null;
  let _price = null;
  let _alcoholContent= null;
  let _pints = null;


  function handleNewKegFormSubmission(e){

    e.preventDefault();
    const newKeg = {
      names: _names.value,
      price: _price.value,
      alcoholContent: _alcoholContent.value,
      id: v4(),
      index: props.match.params.index,
      pints: _pints.value
    };
    axios
      .post("/kegs.json", newKeg)
      .then(response => props.history.push('/allkegs'))
      .catch(error => console.log(error));

  }
let initialName = "";
let initialPrice = "";
let initialAc = "";
let initialPints ="";

const kegId = props.match.params.index;
if(kegId !== undefined){
  const showKeg = props.kegListProperty[kegId];
  initialName= showKeg.names;
  initialPrice=showKeg.price;
  initialAc=showKeg.alcoholContent;
  initialPints= showKeg.pints;
}



  return (
    <div>
      <div>
      <Header/>
      </div>

      <MDBContainer>
         <MDBRow>
           <MDBCol md="6">
             <form  onSubmit={handleNewKegFormSubmission}>
               <p className="h4 text-center mb-4">Add new keg</p>
               <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                 Name
               </label>
               <input
                 type="text"
                 id="defaultFormRegisterNameEx"
                 className="form-control"
                 ref={(input) => {_names = input;}}
                 defaultValue = {initialName}
               />
               <br />
               <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                 Price
               </label>
               <input
                 type="text"
                 id="defaultFormRegisterEmailEx"
                 className="form-control"
                  ref={(input) => {_price = input;}}
                   defaultValue = {initialPrice}
               />
               <br />
               <label
                 htmlFor="defaultFormRegisterConfirmEx"
                 className="grey-text"
               >
                 Alcohol Content
               </label>
               <input
                 type="text"
                 id="defaultFormRegisterConfirmEx"
                 className="form-control"
                ref={(input) => {_alcoholContent = input;}}
                defaultValue = {initialAc}
               />
               <br />
               <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                 Pints
               </label>
               <input
                 type="text"
                 id="defaultFormRegisterEmailEx"
                 className="form-control"
                  ref={(input) => {_pints = input;}}
                   defaultValue = {initialPints}
               />



               <div className="text-center mt-4">
                 <MDBBtn scolor="unique" type="submit">
                   Add
                 </MDBBtn>
               </div>
             </form>
           </MDBCol>
         </MDBRow>
       </MDBContainer>




    </div>
  );
}

NewKeg.propTypes = {
  onNewKegCreation: PropTypes.func,
  kegListProperty: PropTypes.array
};

export default withRouter( NewKeg);
