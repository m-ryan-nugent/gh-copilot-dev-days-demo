// In-memory store todos. Resets on every process restart - by design.

const todos = [];
let nextId = 1;

function list() {
    return todos.slice();
}

function get(id) {
    return todos.find((t) => t.id === id);
}

function create({ title }) {
    if (typeof title !== 'string' || title.trim() === '') {
        const err = new Error('Title is required and must be a non-empty string');
        err.status = 400;
        throw err;
    }
    const todo = {
        id: nextId++,
        title: title.trim(),
        done: false,
        createdAt: new Date().toISOString(),
    };
    todos.push(todo);
    return todo;
}

function update(id, patch) {
    const todo = get(id);
    if (!todo) return null;
    if (patch.title !== undefined) {
        if (typeof patch.title !== 'string' || patch.title.trim() === '') {
            const err = new Error('title must be a non-empty string');
            err.status = 400;
            throw err;
        }
        todo.title = patch.title.trim();
    }
    if (patch.done !== undefined) {
        if (typeof patch.done !== 'boolean') {
            const err = new Error('done must be a boolean');
            err.status = 400;
            throw err;
        }
        todo.done = patch.done;
    }
    return todo;
}

function remove(id) {
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    todos.splice(idx, 1);
    return true;
}

function _reset() {
    todos.length = 0;
    nextId = 1;
}

module.exports = { list, get, create, update, remove, _reset };