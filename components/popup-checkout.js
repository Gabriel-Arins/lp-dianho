import CheckoutStripe from "./checkout-stripe";
import Checkout from "./checkout";

export default function Modal({ onClose }) {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 transition-opacity">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-black border-2 border-yellow-500 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-[90%] sm:w-full">
                    <div className="bg-black sm:-mb-14 px-4 -mt-2 text-gray-400  py-6 -mb-10 sm:px-6 flex flex-row-reverse">
                        <button onClick={onClose} /* className="mt-3 text-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" */>
                            X
                        </button>
                    </div>
                    <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h1 className="text-center w-full text-2xl font-bold mb-2">Pague com Mercado Pago</h1>
                        <Checkout />
                    </div>
                </div>
            </div>
        </div>
    );
}