'use client'
import React, { useState }  from 'react';
import axios from 'axios';

import {
  initMercadoPago,
  createCardToken,
  CardNumber,
  SecurityCode,
  ExpirationDate,
} from '@mercadopago/sdk-react';

initMercadoPago('APP_USR-a88c7067-020c-4a1d-8b27-b4b34150bc55');

/* const mp = new MercadoPago("APP_USR-a88c7067-020c-4a1d-8b27-b4b34150bc55", {
  locale: "pt-BR",
  advancedFraudPrevention: true,
});
 */
const App = () => {
  const [cardHolderName, setCardHolderName] = useState('');
  const [identificationType, setIdentificationType] = useState('');
  const [identificationNumber, setidentificationNumber] = useState('');
  
  
  const cardToken = async () => {
    const response = await createCardToken({
      cardholderName: cardHolderName,
      identificationType: identificationType,
      identificationNumber: identificationNumber,
    })


    console.log('Card Token Response = ', response)


    /* const bin = response.first_six_digits;
    
    const getCardDetails = async (bin) => {
      const options = {
        method: 'GET',
        url: `https://api.freebinchecker.com/bin/${bin}`,
        headers: {
          'content-type': 'application/json',
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const cardDetails = await getCardDetails(bin); */

    /* console.log('Card Details = ', cardDetails) */
    const payment = await fetch('/api/pagamentoMercadoPago', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response.id/* , cardDetails */),
    });
    console.log('Payment Response = ', payment)
  }
  return (
    <>
      <input
      className="pl-2 bg-slate-700 sm:w-[80%] w-[95%] py-2 rounded-md text-white"
        type="text"
        placeholder="Insira o nome impresso no cartão"
        value={cardHolderName}
        onChange={e => setCardHolderName(e.target.value)}
      />
      <select
      className="pl-2 bg-slate-700 sm:w-[80%] w-[95%] py-2 rounded-md text-white"
        value={identificationType}
        onChange={e => setIdentificationType(e.target.value)}
      >
        <option value="">Selecione o tipo de documento</option>
        <option value="RG">RG</option>
        <option value="CPF">CPF</option>
        <option value="type3">CNPJ</option>
      </select>
      <input
      className="pl-2 bg-slate-700 sm:w-[80%] w-[95%] py-2 rounded-md text-white"
        type="text"
        placeholder="Número de Documento"
        value={identificationNumber}
        onChange={e => setidentificationNumber(e.target.value)}
      />
      <CardNumber placeholder='Card Number' />
      <SecurityCode placeholder='Security Code' />
      <ExpirationDate placeholder='Expiration Date' mode='short' />

      <button onClick={() => cardToken()}>Pay</button>
    </>
  );
};

export default App;
