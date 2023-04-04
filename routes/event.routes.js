const express = require('express');
const Event = require('../models/Event');
const fileMiddlewares = require('../middlewares/files.middleware');
const Ticket = require("../models/Ticket");

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

//Find by Name
router.get('/name/:name', async (req, res, next) => {
  const names = req.params.name;

  if(names == ':name'){
    console.log("No hay datos");
    return res.status(404).json('No event found by this name');
  }else{
	  try {
	  	const event = await Event.find({name: { $regex: '.' + names + '.' }});
	  	if (event) {
	  		return res.status(200).json(event);
	  	} else {
	  		return res.status(404).json('No event found by this name');
	  	}
	  } catch (error) {
	  	return next(error);
	  }
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

router.post('/create', [fileMiddlewares.parser.single('foto')], async (req, res, next) => {
	try {
    
	  const cloudinaryUrl = req.file.path ? req.file.path : null;
	  const { name, description, location, date, eventType, capacity, duration } = req.body;
	  const event = {
      name,
      description,
      location,
      date,
      eventType,
      capacity,
      duration,
		  foto: cloudinaryUrl
	  };

	  const newEvent = new Event(event);
	  const createdEvent = await newEvent.save();
	  return res.status(201).json(createdEvent);
	} catch (error) {
	  next(error);
	}
  });

  router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
  
        // Buscar cualquier ticket que tenga el mismo idEvent que el evento que se está eliminando
        const tickets = await Ticket.find({ idEvent: id });
  
        // Si se encontraron tickets, eliminarlos
        if (tickets.length > 0) {
            await Ticket.deleteMany({ idEvent: id });
        }
  
        // Eliminar el evento
        await Event.findByIdAndDelete(id);
        res.redirect('/events');

  
        return res.status(200).json('Evento Eliminado!');
    } catch (error) {
        return next(error);
    }
  });

router.post("/comprar/:id", async (req, res) => {
  const cantidad_comprada = req.query.cantidad_comprada;
  const id_event = req.params.id;

  try {
    const event = await Event.findById(id_event);

    if (!event) {
      res.status(404).json({ message: "Ticket not found" });
    } else if (event.capacity < cantidad_comprada) {
      res.status(400).json({ message: "Not enough tickets available" });
    } else {
      event.capacity -= cantidad_comprada;
      await event.save();
      res.status(200).json(event);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error buying tickets" });
  }
});

//PUT
router.put('/:id', async (req, res, next) => {
  try {
      const { id } = req.params;
      const { quantity } = req.body;
      const eventModify = await Event.findById(id);
      eventModify._id = id
      eventModify.capacity += quantity;
      await eventModify.save();
      return res.status(200).json(eventModify)
  } catch (error) {
      return next(error)
  }
});

module.exports = router;