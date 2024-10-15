import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import visa from '../../assets/card.png'
import card from '../../assets/credit-card.png'

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {


    return (
        <div>
            {/* <div className='m-20'>
                <Elements stripe={stripePromise} >
                    <CheckoutForm />
                </Elements>
            </div> */}

            <div className="flex bg-gray-100 w-full min-h-screen text-gray-800">
                <div className="rounded bg-white w-full max-w-lg m-20">
                    <ul>
                        <li className="px-8 py-4 border-b border-blue-200">
                            <div className="flex items-center">
                                <input type="radio" name="payment-option" checked="checked" /> <img src="https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/mc.svg" className="mx-2 w-10" />
                                <div className="font-semibold">Credit Card</div>
                            </div>
                            <label className="mt-4 ml-6 flex flex-col"><span className="text-sm text-gray-500">Card Number</span>
                                <input type="text" maxLength="19" placeholder="1234-1234-1234-1234" className="input-disabled text-white border border-blue-200 rounded p-2 w-96" />
                            </label>
                        </li>

                        <li className="px-8 py-4 border-b border-blue-200">
                            <div className="flex items-center">
                                <input type="radio" name="payment-option" /> <img src="https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/paypal.svg" className="mx-2 w-10" />
                                <div className="font-semibold">PayPal</div>
                            </div>
                        </li>

                        <li className="px-8 py-4 border-b border-blue-200">
                            <div className="flex items-center">
                                <input type="radio" name="payment-option" /> <img src="https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/ideal.svg" className="mx-2 w-10" />
                                <div className="font-semibold">Ideal</div>
                            </div>
                        </li>
                        <li className="px-8 py-4 border-b border-blue-200">
                            <div className="flex items-center gap-1">
                                <input type="radio" name="payment-option" /> <img src={visa} className="mx-2 w-8" />
                                <div className="font-semibold">Visa</div>
                            </div>
                        </li>
                        <li className="px-8 py-4 border-blue-200">
                            <div className="flex items-center gap-1">
                                <input type="radio" name="payment-option" /> <img src={card} className="mx-2 w-8" />
                                <div className="font-semibold">Others</div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className='m-20 w-full'>
                    <Elements stripe={stripePromise} >
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;