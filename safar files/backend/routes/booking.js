const express = require('express');
const router = express.Router();
const Route = require('../models/route');
const Bus = require('../models/bus');

// Handle POST request to fetch buses based on routeId
router.post('/buses', async (req, res) => {
  try {
    const { routeId } = req.body;

    // Find the corresponding route based on the provided routeId
    const route = await Route.findOne({ routeId });

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    // Fetch buses from the database based on the route _id
    const buses = await Bus.find({ routeId: route._id });

    // Send the list of buses as a response
    res.json(buses);
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
