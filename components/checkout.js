import React from 'react';

import {
  initMercadoPago,
  createCardToken,
  CardNumber,
  SecurityCode,
  ExpirationDate,
} from '@mercadopago/sdk-react';

initMercadoPago('APP_USR-a88c7067-020c-4a1d-8b27-b4b34150bc55');

class Checkout extends React.Component {
  componentDidMount() {
    this.loadMercadoPago();
  }
  

  async loadMercadoPago() {
    const { loadMercadoPago } = await import("@mercadopago/sdk-js");
    await loadMercadoPago();
    const mp = new window.MercadoPago('APP_USR-a88c7067-020c-4a1d-8b27-b4b34150bc55');

    const cardForm = mp.cardForm({
      amount: "100.5",
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "cardNumber",
          placeholder: "Número do cartão",
        },
        expirationDate: {
          id: "expirationDate",
          placeholder: "MM/YY",
        },
        securityCode: {
          id: "securityCode",
          placeholder: "Código de segurança",
        },
        cardholderName: {
          id: "cardholderName",
          placeholder: "Titular do cartão",
        },
        issuer: {
          id: "issuer",
          placeholder: "Banco emissor",
        },
        installments: {
          id: "installments",
          placeholder: "Parcelas",
        },
        identificationType: {
          id: "identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "identificationNumber",
          placeholder: "Número do documento",
        },
        cardholderEmail: {
          id: "cardholderEmail",
          placeholder: "E-mail",
        },
      },
      callbacks: {
        onFormMounted: error => {
          if (error) return console.warn("Form Mounted handling error: ", error);
          console.log("Form mounted");
        },
        onSubmit: event => {
          event.preventDefault();

          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();

          fetch("/process_payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: "Descrição do produto",
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
            }),
          });
        },
        onFetching: (resource) => {
          console.log("Fetching resource: ", resource);

          // Animate progress bar
          const progressBar = document.querySelector(".progress-bar");
          progressBar.removeAttribute("value");

          return () => {
            progressBar.setAttribute("value", "0");
          };
        }
      },
    });
  }

  render() {
    return (
      <>
      

      <form id="form-checkout">
        <div className="w-full  bg-black ">
        <div className="pl-2 bg-slate-700 sm:w-[80%] w-[95%] py-2 rounded-md" id="cardNumber"></div>
          <div className="flex container mb-2 gap-x-2 justify-center">
            {/* <label htmlFor="cardNumber">Número do Cartão:</label> */}
          </div>
          <div className="flex container mb-2 gap-x-2 justify-center">
            {/* <label htmlFor="expirationDate">Data de Validade:</label> */}
            <input className="pl-2 bg-slate-700 sm:w-[80%] w-[95%] py-2 rounded-md" type="text" id="expirationDate" placeholder="MM/YY" />
          </div>
          <div className="flex container mb-2 gap-x-2 justify-center">
            {/* <label htmlFor="securityCode">Código de Segurança:</label> */}
            <input className="pl-2 bg-slate-700 sm:w-[80%] w-[95%] py-2 rounded-md" type="text" id="securityCode" placeholder="Código de segurança" />
          </div>
          <div className="flex container mb-2 gap-x-2 justify-center">
            {/* <label htmlFor="cardholderName">Titular do Cartão:</label> */}
            <input className="pl-2 bg-slate-700 sm:w-[80%] w-[95%] py-2 rounded-md" type="text" id="cardholderName" placeholder="Titular do cartão" />
          </div>
            <label className="w-full pl-2 sm:pl-12 text-gray-400" htmlFor="issuer">Banco Emissor:</label>
          <div className="flex container mb-2 gap-x-2 justify-center">
            <select className="pl-2 bg-slate-700 sm:w-[80%] w-[95%] py-2 rounded-md" id="issuer" placeholder="Banco emissor"></select>
          </div>
            <label className="w-full pl-2 sm:pl-12 text-gray-400" htmlFor="installments">Parcelas:</label>
          <div className="flex container mb-2 gap-x-2 justify-center">
            <select className="pl-2 bg-slate-700 sm:w-[80%] w-[95%] py-2 rounded-md" id="installments" placeholder="Parcelas"></select>
          </div>
            <label className="w-full pl-2 sm:pl-12 text-gray-400" htmlFor="identificationType">Tipo de Documento:</label>
          <div className="flex container mb-2 gap-x-2 justify-center">
            <select className="pl-2 bg-slate-700 sm:w-[80%] w-[95%] py-2 rounded-md" id="identificationType" placeholder="Tipo de documento"></select>
          </div>
          <div className="flex container mb-2 gap-x-2 justify-center">
            {/* <label htmlFor="identificationNumber">Número do Documento:</label> */}
            <input className="pl-2 bg-slate-700 sm:w-[80%] w-[95%] py-2 rounded-md" type="text" id="identificationNumber" placeholder="Número do documento" />
          </div>
          <div className="flex container mb-2 gap-x-2 justify-center">
            {/* <label htmlFor="cardholderEmail">E-mail:</label> */}
            <input className="pl-2 bg-slate-700 sm:w-[80%] w-[95%] py-2 rounded-md" type="email" id="cardholderEmail" placeholder="E-mail" />
          </div>
          <div className="flex w-full justify-center">

          <button className="bg-green-600 sm:w-[80%] w-[95%] py-4 rounded-md hover:bg-green-400 font-bold mb-4" type="submit" id="form-checkout__submit">PAGAR</button>
          </div>
          {/* <div className="flex w-full justify-center mt-2">

          <progress value="0" className="progress-bar">Carregando...</progress>
        </div> */}
        </div>
      </form>

        </>
    );
  }
}

export default Checkout;
