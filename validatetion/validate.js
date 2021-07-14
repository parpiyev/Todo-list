const joi = require('joi');

async function validateToDo(toDo) {
    const schema = joi.object({
        name: joi.string().required()
    });
    return await schema.validateAsync(toDo);
}

exports.validate = validateToDo;