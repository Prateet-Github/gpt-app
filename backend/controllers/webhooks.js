import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const stripeWebHooks = async (req, res) => {
  const stripe = new Stripe("whsec_pH0SZJ93VHwGU2lzQ2mlF4lxyRLxbMzO") // Use your actual webhook secret here
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, "whsec_pH0SZJ93VHwGU2lzQ2mlF4lxyRLxbMzO" ); // env
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
  try {
     switch (event.type) {
      case "payment_intent.succeeded":{
        const paymentIntent = event.data.object;
       const sessionList = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
       })
        const session = sessionList.data[0];
        const {transactionId,appId} = session.metadata;

        if(appId === 'quickgpt') {
const transaction = await Transaction.findOne({
  _id: transactionId,
  isPaid: false}) 

  // update credits in user account 

   await User.updateOne(
    { _id: transaction.userId },
    { $inc: { credits: transaction.credits } }
   );

   //update credit payment status

    transaction.isPaid = true;
    await transaction.save();


        }else{
          return res.status(400).json({ received: true, message: "Invalid App ID" });
        }

        break;
      }
      
      default:

      console.log(`Unhandled event type ${event.type}`);
      break;

     }
      res.json({ received: true });
  } catch (error) {

    console.error("Error processing webhook:", error);
    res.status(500).json({ success: false, message: error.message });
    
  }
}