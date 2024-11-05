const ExamController = require('../controllers/exam/exam.controllers');
const ExamRepository = require('../repositories/exam/exam.repository');
const { validateExam } = require('../utils/exam.validation');
const AppError = require('../error/error');

jest.mock('../utils/exam.validation'); // Mock the validation function

describe('ExamController', () => {
    let examController;
    let examRepositoryMock;

    beforeEach(() => {
        examRepositoryMock = {
            addExam: jest.fn(),
            getExamById: jest.fn(),
            getAllExams: jest.fn(),
            updateExam: jest.fn(),
            deleteExam: jest.fn(),
        };
        examController = new ExamController(examRepositoryMock);
        jest.clearAllMocks();
    });

    describe('addExam', () => {
        it('should add a new exam if validation passes', async () => {
            const examData = { examName: 'Math Exam', questions: [] };
            validateExam.mockReturnValue({ error: null });
            examRepositoryMock.addExam.mockResolvedValue(examData);

            const result = await examController.addExam(examData);

            expect(result).toEqual(examData);
            expect(validateExam).toHaveBeenCalledWith(examData);
            expect(examRepositoryMock.addExam).toHaveBeenCalledWith(examData);
        });

        it('should throw a validation error if validation fails', async () => {
            const examData = {};
            validateExam.mockReturnValue({ error: { message: 'Invalid data' } });

            await expect(examController.addExam(examData)).rejects.toThrow(AppError);
            await expect(examController.addExam(examData)).rejects.toThrow('Validation Error: Invalid data');
        });
    });

    describe('getExamById', () => {
        it('should return the exam if found', async () => {
            const exam = { _id: '123', examName: 'Math Exam', questions: [] };
            examRepositoryMock.getExamById.mockResolvedValue(exam);

            const result = await examController.getExamById('123');

            expect(result).toEqual(exam);
            expect(examRepositoryMock.getExamById).toHaveBeenCalledWith('123');
        });

        it('should throw an error if ID is not provided', async () => {
            await expect(examController.getExamById()).rejects.toThrow(AppError);
            await expect(examController.getExamById()).rejects.toThrow('Exam ID is required');
        });

        it('should throw an error if the exam is not found', async () => {
            examRepositoryMock.getExamById.mockResolvedValue(null);

            await expect(examController.getExamById('999')).rejects.toThrow(AppError);
            await expect(examController.getExamById('999')).rejects.toThrow('Exam not found');
        });
    });

    describe('getAllExams', () => {
        it('should return all exams', async () => {
            const exams = [{ _id: '123', examName: 'Math Exam', questions: [] }];
            examRepositoryMock.getAllExams.mockResolvedValue(exams);

            const result = await examController.getAllExams();

            expect(result).toEqual(exams);
            expect(examRepositoryMock.getAllExams).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateExam', () => {
        it('should update and return the updated exam if found and validation passes', async () => {
            const examData = { examName: 'Updated Exam', questions: [] };
            const updatedExam = { _id: '123', ...examData };
            validateExam.mockReturnValue({ error: null });
            examRepositoryMock.updateExam.mockResolvedValue(updatedExam);

            const result = await examController.updateExam('123', examData);

            expect(result).toEqual(updatedExam);
            expect(validateExam).toHaveBeenCalledWith(examData);
            expect(examRepositoryMock.updateExam).toHaveBeenCalledWith('123', examData);
        });

        it('should throw a validation error if validation fails', async () => {
            validateExam.mockReturnValue({ error: { message: 'Invalid data' } });

            await expect(examController.updateExam('123', {})).rejects.toThrow(AppError);
            await expect(examController.updateExam('123', {})).rejects.toThrow('Validation Error: Invalid data');
        });

        it('should throw an error if ID is not provided', async () => {
            await expect(examController.updateExam(null, { examName: 'Test' })).rejects.toThrow(AppError);
            await expect(examController.updateExam(null, { examName: 'Test' })).rejects.toThrow('Exam ID is required');
        });

        it('should throw an error if the exam is not found', async () => {
            validateExam.mockReturnValue({ error: null });
            examRepositoryMock.updateExam.mockResolvedValue(null);

            await expect(examController.updateExam('999', { examName: 'Test' })).rejects.toThrow(AppError);
            await expect(examController.updateExam('999', { examName: 'Test' })).rejects.toThrow('Exam not found for update');
        });
    });

    describe('deleteExam', () => {
        it('should delete and return the exam if found', async () => {
            const deletedExam = { _id: '123', examName: 'Math Exam', questions: [] };
            examRepositoryMock.deleteExam.mockResolvedValue(deletedExam);

            const result = await examController.deleteExam('123');

            expect(result).toEqual(deletedExam);
            expect(examRepositoryMock.deleteExam).toHaveBeenCalledWith('123');
        });

        it('should throw an error if ID is not provided', async () => {
            await expect(examController.deleteExam()).rejects.toThrow(AppError);
            await expect(examController.deleteExam()).rejects.toThrow('Exam ID is required');
        });

        it('should throw an error if the exam is not found', async () => {
            examRepositoryMock.deleteExam.mockResolvedValue(null);

            await expect(examController.deleteExam('999')).rejects.toThrow(AppError);
            await expect(examController.deleteExam('999')).rejects.toThrow('Exam not found for deletion');
        });
    });
});
