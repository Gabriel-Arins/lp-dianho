import { Payment, MercadoPagoConfig } from 'mercadopago';
import { NextRequest, NextResponse } from "next/server";


const client = new MercadoPagoConfig({ accessToken: 'TEST-944943091234633-011315-959848dbbb6ddf979429e7b9e03b22d5-1587818833' });
const payment = new Payment(client);

export async function POST(request: NextRequest) {
    const data = await request.json()
    
   try {
    
       const makePayment = await payment.create({ 
           body: {
               token: data.token,
               installments: data.installments,
               transaction_amount: Number(99.90),
               description: data.description,
               payment_method_id: data.payment_method_id,
               payer: {
                   email: data.payer.email,
                   identification: {
                       type: data.payer.identification.type,
                       number: data.payer.identification.number
                    }
                },
            }
        })
        return NextResponse.json({ status: 'success', data: makePayment });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 'error', message: 'An error occurred while processing payment.' });
    }
        
       
}