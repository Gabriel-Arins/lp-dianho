import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './checkout-stripe-form';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_live_51OZIoJLKOUVvvhg9dIqbbe9n2yQhIPGU0JS0ew6xxGd6I7OkA6XlC5tkQsFk5d5BTwQiPbtd9cC7NfSU68cERUxJ00BQtqucsf');

//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

export default function CheckoutStripe() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};