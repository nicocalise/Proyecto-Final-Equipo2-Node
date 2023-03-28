const express = require('express');
const Event = require('../models/Event');


const router = express.Router();

// viewAll=true
router.get('/', async (req, res, next) => {
  const { viewAll } = req.query;
  try {
    let events = [];
    if (viewAll === 'true') {
      events = await Event.find().populate('events');
    } else {
      events = await Event.find();
    }
    return res.status(200).json(events);
  } catch (error) {
    return next(error);
  }
});

//Find by ID
router.get('/:id', async (req, res, next) => {
	const id = req.params.id;
	try {
		const event = await Event.findById(id);
		if (event) {
			return res.status(200).json(event);
		} else {
			return res.status(404).json('No event found by this id');
		}
	} catch (error) {
		return next(error);
	}
});

router.post('/', async (req, res, next) => {
  try {
    const newEvent = new Event({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date,
    });
    const createdEvent = await newEvent.save();
    return res.status(201).json(createdEvent);
  } catch (error) {
    next(error);
  }
});

router.post('/:eventId/add-event', async (req, res, next) => {
  try {
    const { locationId } = req.params;
    const { characterId } = req.body;
    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      { $push: { characters: characterId } },
      { new: true }
    );
    return res.status(200).json(updatedLocation);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;