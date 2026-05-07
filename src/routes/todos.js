const express = require('express');
const store = require('../store/todos');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(store.list());
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const todo = store.get(id);
    if (!todo) return res.status(404).json({ error: 'not found' });
    res.json(todo);
});

router.post('/', (req, res, next) => {
    try {
        const todo = store.create(req.body || {});
        res.status(201).json(todo);
    } catch (err) {
        next(err);
    }
});

router.patch('/:id', (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const todo = store.update(id, req.body || {});
        if (!todo) return res.status(404).json({ error: 'not found' });
        res.json(todo);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const ok = store.remove(id);
    if (!ok) return res.status(404).json({ error: 'not found' });
    res.status(204).end();
});

module.exports = router;