import Client from "../model/clientModel.js";
import validator from 'validator';


// @desc    Create a new client
// @route   POST /api/client
// @access  Private
const createClient = async (req, res) => {
  try {
   const { name, email } = req.body;

   // Fix the validation logic
   if (!name || !validator.isLength(name, { min: 1, max: 50 })) {
      return res.status(400).json({ message: "Name is required and must be 1-50 characters" });
   }

   if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
   }

   // Create the client
   const client = await Client.create({
     name,
     email,
     user: req.user._id, // Attach the logged-in user's ID
   });

   res.status(201).json(client);
   
 } catch (error) {
   console.error(error);
   res.status(500).json({ message: "Server error" });
 }
};



export { createClient };