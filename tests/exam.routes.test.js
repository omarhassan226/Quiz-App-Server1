const request = require('supertest');
const express = require('express');
const examRoutes = require('../routes/exam/exam.routes'); // adjust path as necessary
const ExamController = require('../controllers/exam/exam.controllers'); // adjust path as necessary
const AppError = require('../error/error');

// Mock the ExamController
const mockExamController = {
    addExam: jest.fn(),
    getExamById: jest.fn(),
    getAllExams: jest.fn(),
    updateExam: jest.fn(),
    deleteExam: jest.fn(),
};

const app = express();
app.use(express.json());
app.use('/api', examRoutes(mockExamController));

// Tests
describe('Exam Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/exam', () => {
        it('should add a new exam', async () => {
            const examData = { name: 'Math Exam', date: '2024-11-04' };
            mockExamController.addExam.mockResolvedValue(examData);

            const response = await request(app)
                .post('/api/exam')
                .send(examData);

            expect(response.status).toBe(201);
            expect(response.body.status).toBe('success');
            expect(response.body.data).toEqual(examData);
            expect(mockExamController.addExam).toHaveBeenCalledWith(examData);
        });

        it('should handle errors in adding a new exam', async () => {
            mockExamController.addExam.mockRejectedValue(new Error('Failed to add exam'));

            const response = await request(app)
                .post('/api/exam')
                .send({ name: 'Math Exam' });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Failed to add exam');
        });
    });

    describe('GET /api/exam/:id', () => {
        it('should get an exam by ID', async () => {
            const examData = { id: '1', name: 'Math Exam', date: '2024-11-04' };
            mockExamController.getExamById.mockResolvedValue(examData);

            const response = await request(app).get('/api/exam/1');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data).toEqual(examData);
            expect(mockExamController.getExamById).toHaveBeenCalledWith('1');
        });

        it('should return 404 if exam is not found', async () => {
            mockExamController.getExamById.mockResolvedValue(null);

            const response = await request(app).get('/api/exam/999');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Exam not found');
        });
    });

    describe('GET /api/exams', () => {
        it('should get all exams', async () => {
            const exams = [{ id: '1', name: 'Math Exam' }];
            mockExamController.getAllExams.mockResolvedValue(exams);

            const response = await request(app).get('/api/exams');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data).toEqual(exams);
        });
    });

    describe('PATCH /api/exam/:id', () => {
        it('should update an existing exam', async () => {
            const updatedExamData = { name: 'Math Exam - Updated', date: '2024-11-05' };
            mockExamController.updateExam.mockResolvedValue(updatedExamData);

            const response = await request(app)
                .patch('/api/exam/1')
                .send(updatedExamData);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data).toEqual(updatedExamData);
            expect(mockExamController.updateExam).toHaveBeenCalledWith('1', updatedExamData);
        });

        it('should return 404 if exam is not found for update', async () => {
            mockExamController.updateExam.mockResolvedValue(null);

            const response = await request(app)
                .patch('/api/exam/999')
                .send({ name: 'Math Exam' });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Exam not found for update');
        });
    });

    describe('DELETE /api/exam/:id', () => {
        it('should delete an exam', async () => {
            mockExamController.deleteExam.mockResolvedValue(true);

            const response = await request(app).delete('/api/exam/1');

            expect(response.status).toBe(204);
            expect(mockExamController.deleteExam).toHaveBeenCalledWith('1');
        });

        it('should return 404 if exam is not found for deletion', async () => {
            mockExamController.deleteExam.mockResolvedValue(null);

            const response = await request(app).delete('/api/exam/999');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Exam not found for deletion');
        });
    });
});
