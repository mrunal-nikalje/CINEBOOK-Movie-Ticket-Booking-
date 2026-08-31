const router = require("express").Router();
const Ticket = require("../models/Ticket");
const auth = require("../middleware/auth");

// Book Ticket
router.post("/book", auth, async (req, res) => {
    const ticket = new Ticket({
        userId: req.user,
        movie: req.body.movie,
        location: req.body.location,
        theatre: req.body.theatre,
        timing: req.body.timing,
        seats: req.body.seats,
        date: req.body.date
    });

    await ticket.save();
    res.json({ message: "Ticket booked", ticket });
});

// User tickets
router.get("/mytickets", auth, async (req, res) => {
    const tickets = await Ticket.find({ userId: req.user });
    res.json(tickets);
});

module.exports = router;
