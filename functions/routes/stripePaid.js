// require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51LAfpgJJXXwqLUlGDUY0Klje0ZGjKvXx5CTMwJ7Z4CNjvkxD8YJPIgAIdeoN06lQcAjxVE9sK77gSuV38BG42q5G00vlt5F41Z"
);

const stripePaid = async (req, res) => {
  let { source } = req.body;

  console.log(source.owner.email, source?.amount);
  try {
    const customer = await stripe.customers.create({
      email: source.owner.email,
    });
    customer.source = source;
    const charge = await stripe.charges.create({
      amount: source.amount,
      currency: source.currency,
      source: source.id,
      customer: customer.id,
    });

    if (charge.paid) {
      return res.json({ msg: "done success paid" });
    }
  } catch (err) {
    console.log("Error is: ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = stripePaid;