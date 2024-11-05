// routes/exam/exam.routes.js
const express = require('express');
const AppError = require('../../error/error');
const errorHandler = require('../../middlewares/errorHandler'); // Import error handler
const router = express.Router();

const examRoutes = (examController) => {
    router.post('/exam', async (req, res, next) => {
        try {
            const data = req.body;
            const exam = await examController.addExam(data);
            res.status(201).json({
                status: 'success',
                data: exam,
            });
        } catch (err) {
            next(new AppError('Failed to add exam', 500));
        }
    });

    router.get('/exam/:id', async (req, res, next) => {
        try {
            const exam = await examController.getExamById(req.params.id);
            if (!exam) {
                return next(new AppError('Exam not found', 404));
            }
            res.status(200).json({
                status: 'success',
                data: exam,
            });
        } catch (err) {
            next(new AppError('Failed to retrieve exam', 500));
        }
    });

    router.get('/exams', async (req, res, next) => {
        try {
            const exams = await examController.getAllExams();
            res.status(200).json({
                status: 'success',
                data: exams,
            });
        } catch (err) {
            next(new AppError('Failed to retrieve exams', 500));
        }
    });

    router.patch('/exam/:id', async (req, res, next) => {
        try {
            const data = req.body;
            const updatedExam = await examController.updateExam(req.params.id, data);
            if (!updatedExam) {
                return next(new AppError('Exam not found for update', 404));
            }
            console.log(updatedExam);

            res.status(200).json({
                status: 'success',
                data: updatedExam,
            });
        } catch (err) {
            console.log(err);

            next(new AppError('Failed to update exam', 500));
        }
    });

    router.delete('/exam/:id', async (req, res, next) => {
        try {
            const deletedExam = await examController.deleteExam(req.params.id);
            if (!deletedExam) {
                return next(new AppError('Exam not found for deletion', 404));
            }
            res.status(204).json({
                status: 'success',
                data: null,
            });
        } catch (err) {
            next(new AppError('Failed to delete exam', 500));
        }
    });

    // Use the errorHandler middleware after defining all routes
    router.use(errorHandler);

    return router;
};

module.exports = examRoutes;
