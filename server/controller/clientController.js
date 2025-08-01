import Client from "../model/clientModel.js";
import validator from "validator";

// @desc    Get all clients for the logged-in user
// @route   GET /api/client
// @access  Private
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user._id });
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a new client
// @route   POST /api/client
// @access  Private
const createClient = async (req, res) => {
  try {
    // Fetch clients for the logged-in user
    const clients = await Client.find({ user: req.user._id });
    const { name, email, phone = "" } = req.body;

    // Fix the validation logics
    if (!name || !validator.isLength(name, { min: 1, max: 50 })) {
      return res
        .status(400)
        .json({ message: "Name is required and must be 1-50 characters" });
    }
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (clients.some((client) => client.email === email)) {
      return res
        .status(400)
        .json({ message: "Client with this email already exists" });
    }

    // Create the client
    const client = await Client.create({
      name,
      email,
      phone: phone,
      user: req.user._id, // Attach the logged-in user's ID
    });

    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a client by ID
// @route   DELETE /api/client/:id
// @access  Private

const deleteClient = async (req, res) => {
  try {
    
    const client = await Client.findById(req.params.id);
    if (!client ) {
      return res.status(404).json({ message: "Client not found" });
    }
    // Check for user ownership
    if (client.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    // Use deleteOne() instead of deprecated remove()
    await Client.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Client removed" });;

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { createClient, getAllClients,deleteClient };
