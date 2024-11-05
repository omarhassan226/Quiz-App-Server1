const mongoose = require('mongoose');
const ExamRepository = require('../repositories/exam/exam.repository'); 
const Exam = require('../models/exam/exam.models'); 

jest.mock('../models/exam/exam.models'); // Mock the Exam model

describe('ExamRepository', () => {
    let examRepository;

    beforeAll(() => {
        examRepository = new ExamRepository();
    });

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    afterAll(async () => {
        await mongoose.connection.close(); 
    });

    describe('addExam', () => {
        it('should add a new exam', async () => {
            const mockExamData = { examName: 'Math Exam', questions: [] };
            Exam.prototype.save = jest.fn().mockResolvedValue(mockExamData); 
            const result = await examRepository.addExam(mockExamData);
            expect(result).toEqual(mockExamData);
            expect(Exam.prototype.save).toHaveBeenCalledTimes(1); 
        });
    });

    describe('getExamById', () => {
        it('should return an exam by ID', async () => {
            const mockExam = { _id: '123', examName: 'Math Exam', questions: [] };
            Exam.findById = jest.fn().mockResolvedValue(mockExam); 
            const result = await examRepository.getExamById('123');
            expect(result).toEqual(mockExam);
            expect(Exam.findById).toHaveBeenCalledWith('123');
        });

        it('should return null if exam not found', async () => {
            Exam.findById = jest.fn().mockResolvedValue(null); 
            const result = await examRepository.getExamById('999'); 
            expect(result).toBeNull();
            expect(Exam.findById).toHaveBeenCalledWith('999');
        });
    });

    describe('getAllExams', () => {
        it('should return all exams', async () => {
            const mockExams = [{ _id: '123', examName: 'Math Exam', questions: [] }];
            Exam.find = jest.fn().mockResolvedValue(mockExams); 
            const result = await examRepository.getAllExams();
            expect(result).toEqual(mockExams);
            expect(Exam.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateExam', () => {
        it('should update an exam by ID', async () => {
            const mockExamData = { examName: 'Updated Exam', questions: [] };
            Exam.findByIdAndUpdate = jest.fn().mockResolvedValue(mockExamData); 
            const result = await examRepository.updateExam('123', mockExamData);
            expect(result).toEqual(mockExamData);
            expect(Exam.findByIdAndUpdate).toHaveBeenCalledWith('123', mockExamData, { new: true });
        });

        it('should return null if exam not found for update', async () => {
            Exam.findByIdAndUpdate = jest.fn().mockResolvedValue(null); 
            const result = await examRepository.updateExam('999', { examName: 'Non-existent Exam' });
            expect(result).toBeNull();
            expect(Exam.findByIdAndUpdate).toHaveBeenCalledWith('999', { examName: 'Non-existent Exam' }, { new: true });
        });
    });

    describe('deleteExam', () => {
        it('should delete an exam by ID', async () => {
            Exam.findByIdAndDelete = jest.fn().mockResolvedValue(true); 
            const result = await examRepository.deleteExam('123');
            expect(result).toBe(true);
            expect(Exam.findByIdAndDelete).toHaveBeenCalledWith('123');
        });

        it('should return null if exam not found for deletion', async () => {
            Exam.findByIdAndDelete = jest.fn().mockResolvedValue(null); 
            const result = await examRepository.deleteExam('999');
            expect(result).toBeNull();
            expect(Exam.findByIdAndDelete).toHaveBeenCalledWith('999');
        });
    });
});
