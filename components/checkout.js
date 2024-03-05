import React from 'react';

class Checkout extends React.Component {
  componentDidMount() {
    this.loadMercadoPago();
  }

  async loadMercadoPago() {
    const { loadMercadoPago } = await import("@mercadopago/sdk-js");
    await loadMercadoPago();
    const mp = new window.MercadoPago('TEST-cb670351-b613-44ab-ac1a-46a5a73d430a');

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

          
          alert(token)
          console.log(cardForm.getCardFormData());

          const requestBody = {
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
          };

          console.log("requestBody", requestBody);
          
          fetch("/api/pagamentoMercadoPago", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
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
        <style>
          {`
            #form-checkout {
              display: flex;
              flex-direction: column;
              max-width: 600px;
            }

            .container {
              margin-bottom: 10px;
            }
            #expirationDate,#cardNumber,#securityCode{
              height:40px; 
              margin:10px 20px;
              widht:50px;
              padding:5px 10px;
              border:2px solid black;
              border-radius:10px;
            }
          `}
        </style>

        <form id="form-checkout">
        <div id="expirationDate"/>
        <div id="cardNumber"></div>
        <div id="securityCode"> </div>
          {/* <div className="container">
            <label htmlFor="cardNumber">Número do Cartão:</label>
            <input type="text" id="cardNumber" placeholder="Número do cartão" />
          </div>
          <div className="container">
            <label htmlFor="expirationDate">Data de Validade:</label>
            <input type="text" id="expirationDate" placeholder="MM/YY" />
          </div>
          <div className="container">
            <label htmlFor="securityCode">Código de Segurança:</label>
            <input type="text" id="securityCode" placeholder="Código de segurança" />
          </div> */}
          <div className="container">
            <label htmlFor="cardholderName">Titular do Cartão:</label>
            <input type="text" id="cardholderName" placeholder="Titular do cartão" />
          </div>
          <div className="container">
            <label htmlFor="issuer">Banco Emissor:</label>
            <select id="issuer" placeholder="Banco emissor"></select>
          </div>
          <div className="container">
            <label htmlFor="installments">Parcelas:</label>
            <select id="installments" placeholder="Parcelas"></select>
          </div>
          <div className="container">
            <label htmlFor="identificationType">Tipo de Documento:</label>
            <select id="identificationType" placeholder="Tipo de documento"></select>
          </div>
          <div className="container">
            <label htmlFor="identificationNumber">Número do Documento:</label>
            <input type="text" id="identificationNumber" placeholder="Número do documento" />
          </div>
          <div className="container">
            <label htmlFor="cardholderEmail">E-mail:</label>
            <input type="email" id="cardholderEmail" placeholder="E-mail" />
          </div>

          <button type="submit" id="form-checkout__submit">Pagar</button>
          <progress value="0" className="progress-bar">Carregando...</progress>
        </form>
      </>
    );
  }
}

export default Checkout;