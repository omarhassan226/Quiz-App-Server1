const mongoose = require('mongoose');
const { connect } = require('../connection/mongoose.connect'); // Adjust the path if needed

// Mock the mongoose connect function
jest.mock('mongoose', () => ({
    connect: jest.fn(),
}));

describe('Database Connection', () => {
    it('should call mongoose.connect with the correct URI and options', async () => {
        const expectedUri = 'mongodb+srv://omar97:24682468fha5@quiz-app1.7nqgu.mongodb.net/';
        const expectedOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        mongoose.connect.mockResolvedValueOnce('Connected to MongoDB');

        await connect();

        expect(mongoose.connect).toHaveBeenCalledWith(expectedUri, expectedOptions);
    });

    it('should handle connection errors', async () => {
        const errorMessage = 'Connection failed';
        mongoose.connect.mockRejectedValueOnce(new Error(errorMessage));

        await expect(connect()).rejects.toThrow(errorMessage);
    });
});
