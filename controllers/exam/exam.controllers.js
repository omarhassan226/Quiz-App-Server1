const AppError = require('../../error/error'); 
const { validateExam } = require('../../utils/exam.validation'); 

class ExamController {
    constructor(ExamRepository) {
        this.examRepository = ExamRepository;
    }

    async addExam(data) {
        const { error } = validateExam(data);
        if (error) throw new AppError(`Validation Error: ${error.message}`, 400);

        const exam = await this.examRepository.addExam(data);
        return exam;
    }

    async getExamById(id) {
        if (!id) throw new AppError('Exam ID is required', 400);

        const exam = await this.examRepository.getExamById(id);
        if (!exam) throw new AppError('Exam not found', 404);

        return exam;
    }

    async getAllExams() {
        const exams = await this.examRepository.getAllExams();
        return exams;
    }

    async updateExam(id, data) {
        if (!id) throw new AppError('Exam ID is required', 400);

        const { error } = validateExam(data);
        if (error) throw new AppError(`Validation Error: ${error.message}`, 400);

        const updatedExam = await this.examRepository.updateExam(id, data);
        if (!updatedExam) throw new AppError('Exam not found for update', 404);

        return updatedExam;
    }

    async deleteExam(id) {
        if (!id) throw new AppError('Exam ID is required', 400);

        const deletedExam = await this.examRepository.deleteExam(id);
        if (!deletedExam) throw new AppError('Exam not found for deletion', 404);

        return deletedExam;
    }
}

module.exports = ExamController;
