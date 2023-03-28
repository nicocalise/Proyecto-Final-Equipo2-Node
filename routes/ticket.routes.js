const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

mongoose
  .connect(
    "mongodb+srv://equipo2:upgradehub@proyectofinal.lgsacwc.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

function requireAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

router.post("/add", requireAdmin, async (req, res) => {
  const { nombre, cantidad, fecha } = req.body;

  try {
    const ticket = await Ticket.findOne({ nombre });

    if (!ticket) {
      const newTicket = new Ticket({
        nombre,
        cantidad_disponible: cantidad,
        fecha,
      });
      await newTicket.save();
      res.status(201).json(newTicket);
    } else {
      ticket.cantidad_disponible += cantidad;
      await ticket.save();
      res.status(200).json(ticket);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding tickets" });
  }
});

router.get("/", async (req, res, next) => {
  const { viewAll } = req.query;
  try {
    let tickets = [];
    if (viewAll === "true") {
      tickets = await Ticket.find().populate("tickets");
    } else {
      tickets = await Ticket.find();
    }
    return res.status(200).json(tickets);
  } catch (error) {
    return next(error);
  }
});

router.post("/comprar", async (req, res) => {
  const { nombre, cantidad_comprada } = req.body;

  try {
    const ticket = await Ticket.findOne({ nombre });

    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
    } else if (ticket.cantidad_disponible < cantidad_comprada) {
      res.status(400).json({ message: "Not enough tickets available" });
    } else {
      ticket.cantidad_disponible -= cantidad_comprada;
      await ticket.save();
      res.status(200).json(ticket);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error buying tickets" });
  }
});

module.exports = router;
