import Transaction from "../models/Transaction.js";
import Stripe from "stripe";

export const plans = [
    {
        _id: "basic",
        name: "Basic",
        price: 10,
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "Pro",
        price: 20,
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "Premium",
        price: 30,
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
    }
];

// API to get all plans
export const getPlans = async (req, res) => {
  try {
    res.status(200).json({ success: true, plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const stripe = new Stripe("sk_test_51S0TWBE5vzoTD9L9LDkQPTRqAgpY6uDasDq5i2dwJRzGjSkVTVWQEDVrOdO7kZll6ToUGRATsgWXlpreDZcK0UCu00I9xDI3Sf")

// API for purchase plan
export const purchasePlan = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user._id;
    const plan = plans.find(plan => plan._id === planId);
    
    if (!plan) {
      return res.status(400).json({ success: false, message: "Invalid plan ID" });
    }

    // Create new transaction
    const transaction = await Transaction.create({
      userId,
      planId: plan._id,
      amount: plan.price,
      credits: plan.credits,
      isPaid: false, // Will be updated via webhook when payment succeeds
    });

    const { origin } = req.headers; 
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "usd", // or plan.currency if you add it to your plan objects
          unit_amount: Math.round(parseFloat(plan.price) * 100), // Use 'plan', not 'plans'
          product_data: {
            name: plan.name, // Use 'plan', not 'plans'
            description: `${plan.credits} credits included`, // Optional: add description
          },
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${origin}/loading`,
      cancel_url: `${origin}`,
      metadata: {
        transactionId: transaction._id.toString(),
        appId: 'quickgpt'
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    });

    res.status(200).json({ success: true, url: session.url });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}