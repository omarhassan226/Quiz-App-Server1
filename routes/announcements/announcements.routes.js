// routes/announcement/announcement.routes.js
const express = require('express');
const AppError = require('../../error/error');
const errorHandler = require('../../middlewares/annErrorHandler');
const router = express.Router();

const announcementsRoutes = (announcementsController) => {
    // Create a new announcement
    router.post('/announcement', async (req, res, next) => {
        try {
            const data = req.body;
            const announcement = await announcementsController.addAnnouncement(data);
            res.status(201).json({
                status: 'success',
                data: announcement,
            });
        } catch (err) {
            next(new AppError('Failed to add announcement', 500));
        }
    });

    // Get a specific announcement by ID
    router.get('/announcement/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const announcement = await announcementsController.getAnnouncementById(id);
            if (!announcement) {
                return next(new AppError('Announcement not found', 404));
            }
            res.status(200).json({
                status: 'success',
                data: announcement,
            });
        } catch (err) {
            next(new AppError('Failed to retrieve announcement', 500));
        }
    });

    // Get all announcements
    router.get('/announcement', async (req, res, next) => {
        try {
            const announcements = await announcementsController.getAllAnnouncements();
            res.status(200).json({
                status: 'success',
                data: announcements,
            });
        } catch (err) {
            next(new AppError('Failed to retrieve announcements', 500));
        }
    });

    // Update an announcement by ID
    router.patch('/announcement/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedAnnouncement = await announcementsController.updateAnnouncement(id, data);
            if (!updatedAnnouncement) {
                return next(new AppError('Announcement not found', 404));
            }
            res.status(200).json({
                status: 'success',
                data: updatedAnnouncement,
            });
        } catch (err) {
            next(new AppError('Failed to update announcement', 500));
        }
    });

    // Delete an announcement by ID
    router.delete('/announcement/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedAnnouncement = await announcementsController.deleteAnnouncement(id);
            if (!deletedAnnouncement) {
                return next(new AppError('Announcement not found', 404));
            }
            res.status(204).json({
                status: 'success',
                data: null,
            });
        } catch (err) {
            next(new AppError('Failed to delete announcement', 500));
        }
    });

    // Use the errorHandler middleware after defining all routes
    router.use(errorHandler);

    return router;
};

module.exports = announcementsRoutes;
