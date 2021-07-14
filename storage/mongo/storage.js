const { json } = require('body-parser');
const { ToDo } = require('../../modul/modul')

let toDoStorege = {
    create: async(data) => {
        const todo = new ToDo(data);
        try {
            const res = await todo.save();
            return json({
                success: true,
                message: "To-do created"
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },

    update: async(id, data) => {
        try {
            let todo = await ToDo.findOne({ _id: id });

            if (!todo) {
                throw new Error("Not found in database");
            }

            todo.name = data.name;
            const res = await todo.save();

            return json({
                success: true,
                message: "To-do updated"
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    get: async(id) => {
        try {
            let todo = await ToDo.findOne({ _id: id });

            if (!todo) {
                throw new Error("Not found in database");
            }

            return todo;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    delete: async(id) => {
        try {
            let todo = await ToDo.findOne({ _id: id });

            if (!todo) {
                throw new Error("Not found in database");
            }

            await ToDo.findOneAndDelete({ _id: id });
            return json({
                success: true,
                message: "To-do deleted"
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getAll: async() => {
        try {
            const res = await ToDo.find();
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = toDoStorege;