import React, { useState } from 'react';
import {
  initMercadoPago,
  createCardToken,
  CardNumber,
  SecurityCode,
  ExpirationDate,
} from '@mercadopago/sdk-react';

initMercadoPago('YOUR-PUBLIC-KEY');

const Checkoutv2 = () => {
 const [formData, setFormData] = useState({
   cardholderName: '',
   identificationType: '',
   identificationNumber: '',
 });

 const cardToken = async () => {
   const response = await createCardToken({
     cardholderName: formData.cardholderName,
     identificationType: formData.identificationType,
     identificationNumber: formData.identificationNumber,
   });
   console.log('Card Token Response = ', response);
 }

 const handleInputChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value,
   });
 }

 return (
   <div className="max-w-md mx-auto bg-white p-8 rounded border shadow-md">
     <div className="mb-4">
       <label className="block text-gray-700 font-bold mb-2">Cardholder Name</label>
       <input
         type="text"
         name="cardholderName"
         value={formData.cardholderName}
         onChange={handleInputChange}
         className="w-full p-2 text-black border rounded"
         placeholder="Enter Cardholder Name"
       />
     </div>

     <div className="mb-4">
       <label className="block text-gray-700 font-bold mb-2">Identification Type</label>
       <input
         type="text"
         name="identificationType"
         value={formData.identificationType}
         onChange={handleInputChange}
         className="w-full text-black p-2 border rounded"
         placeholder="Enter Identification Type"
       />
     </div>

     <div className="mb-4">
       <label className="block text-gray-700 font-bold mb-2">Identification Number</label>
       <input
         type="text"
         name="identificationNumber"
         value={formData.identificationNumber}
         onChange={handleInputChange}
         className="w-full text-black p-2 border rounded"
         placeholder="Enter Identification Number"
       />
     </div>

     <div className="mb-4">
       <label className="block text-gray-700 font-bold mb-2">Card Number</label>
       <CardNumber placeholder='Card Number' className="w-full p-2 border rounded" />
     </div>

     <div className="mb-4">
       <label className="block text-gray-700 font-bold mb-2">Security Code</label>
       <SecurityCode placeholder='Security Code' className="w-full p-2 border rounded" />
     </div>

     <div className="mb-4">
       <label className="block text-gray-700 font-bold mb-2">Expiration Date</label>
       <ExpirationDate placeholder='Expiration Date' mode='short' className="w-full p-2 border rounded" />
     </div>

     <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600" onClick={() => cardToken()}>Pay</button>
   </div>
 );
};

export default Checkoutv2;
