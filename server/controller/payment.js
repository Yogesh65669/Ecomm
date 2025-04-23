// controller/payment.js
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
    const { amount } = req.body; // Amount should be in cents

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd', // Change this to your preferred currency
        });

        res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};



// export const createPaymentIntent = async (req, res) => {
//     const { amount } = req.body;

//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount,
//             currency: 'usd',
//         });

//         console.log('Client Secret:', paymentIntent.client_secret); // 🔍 Log here

//         res.status(200).send({ clientSecret: paymentIntent.client_secret });
//     } catch (error) {
//         console.error('Stripe Error:', error); // Log any error for debugging
//         res.status(500).send({ error: error.message });
//     }
// };
