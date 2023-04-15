// domain/.netlify/functions/create-payment-intent

require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY); 

exports.handler = async (event, context) => {
    if(!event.body) {
        return {
            statusCode: 500,
            body: 'Create Payment Intent',
        }
    }

    const { 
        shipping_fee, 
        total_amount 
    } = JSON.parse(event.body);

    const calculateOrderAmount = () => shipping_fee * total_amount;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(),
            currency: 'usd',
        })

        console.log(paymentIntent);

        return {
            statusCode: 200,
            body: JSON.stringify({
                clientSecret: paymentIntent.client_secret,
            })
        }
    } catch (err) {

        return {
            statusCode: 500, 
            body: JSON.stringify({
                message: err.message
            })
        }
    }
}