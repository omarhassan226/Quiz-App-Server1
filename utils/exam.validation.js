const Joi = require('joi');

const validateExam = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        course: Joi.string().required().min(1),
        topic: Joi.string().required().min(1),
        dueDate: Joi.date()
    });
    return schema.validate(data);
};

module.exports = { validateExam };
