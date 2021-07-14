const express = require('express');
const router = express.Router();
const toDoStorege = require('../storage/mongo/storage')
const { validate } = require('../validatetion/validate');

router.get('/', async(req, res) => {
    const toDo = await toDoStorege.getAll();
    res.json({ success: true, toDo });
});

router.post('/create', async(req, res) => {
    try {
        await validate(req.body);

        await toDoStorege.create(req.body);

        res.status(201).json({ success: true, message: "To-Do created" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/:id', async(req, res) => {
    try {
        let toDo = await toDoStorege.get(req.params.id);

        res.json({ success: true, toDo });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
});

router.patch('/update/:id', async(req, res) => {
    try {
        await validate(req.body);
        await toDoStorege.update(req.params.id, req.body);

        res.status(200).json({ success: true, message: "To-Do updated" });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
});

router.delete('/delete/:id', async(req, res) => {
    try {
        await toDoStorege.delete(req.params.id);

        res.status(200).json({ success: true, message: "To-Do deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
});

module.exports = router;