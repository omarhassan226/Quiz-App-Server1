const Joi = require('joi');

const validateAnnouncement = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        subject: Joi.string().required().min(1),
        avatar: Joi.string().required().min(1),
        message: Joi.string().required().min(1)
    });
    return schema.validate(data);
};

module.exports = { validateAnnouncement };
