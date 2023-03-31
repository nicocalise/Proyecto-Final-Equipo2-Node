const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

router.get("/:idUser", async (req, res, next) => {
  const idUser = req.params.idUser;
  try {
      tickets = await Ticket.find({ idUser:idUser });
    return res.status(200).json(tickets);
  } catch (error) {
    return next(error);
  }
});

//Creation POST
router.post("/comprar", async( req, res, next)=>{
  const { idUser, idEvent } = req.body;
  try {
      const newTicket = new Ticket({ idUser: idUser, idEvent:idEvent});
      const createdTicket = await newTicket.save();
      return res.status(201).json(createdTicket);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
