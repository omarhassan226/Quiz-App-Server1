const request = require('supertest');
const express = require('express');
const announcementsRoutes = require('../routes/announcements/announcements.routes');
const AnnouncementsController = require('../controllers/announcements/announcements.controllers');
const AppError = require('../error/error');
const errorHandler = require('../middlewares/annErrorHandler');

const mockAnnouncementsController = {
    addAnnouncement: jest.fn(),
    getAnnouncementById: jest.fn(),
    getAllAnnouncements: jest.fn(),
    updateAnnouncement: jest.fn(),
    deleteAnnouncement: jest.fn(),
};

const app = express();
app.use(express.json());
app.use('/api', announcementsRoutes(mockAnnouncementsController));
app.use(errorHandler);

describe('Announcements Routes', () => {
    describe('POST /api/announcement', () => {
        it('should create a new announcement', async () => {
            const announcementData = { name: 'Test', subject: 'Test Subject', avatar: 'test.jpg', message: 'Test Message' };
            mockAnnouncementsController.addAnnouncement.mockResolvedValue(announcementData);

            const response = await request(app)
                .post('/api/announcement')
                .send(announcementData)
                .expect(201);

            expect(response.body.status).toBe('success');
            expect(response.body.data).toEqual(announcementData);
        });

        it('should return 500 if adding an announcement fails', async () => {
            mockAnnouncementsController.addAnnouncement.mockRejectedValue(new Error());

            const response = await request(app)
                .post('/api/announcement')
                .send({})
                .expect(500);

            expect(response.body.message).toBe('Failed to add announcement');
        });
    });

    describe('GET /api/announcement/:id', () => {
        it('should get an announcement by ID', async () => {
            const announcement = { id: '1', name: 'Test', subject: 'Test Subject', avatar: 'test.jpg', message: 'Test Message' };
            mockAnnouncementsController.getAnnouncementById.mockResolvedValue(announcement);

            const response = await request(app)
                .get('/api/announcement/1')
                .expect(200);

            expect(response.body.status).toBe('success');
            expect(response.body.data).toEqual(announcement);
        });

        it('should return 404 if announcement is not found', async () => {
            mockAnnouncementsController.getAnnouncementById.mockResolvedValue(null);

            const response = await request(app)
                .get('/api/announcement/1')
                .expect(404);

            expect(response.body.message).toBe('Announcement not found');
        });
    });

    describe('GET /api/announcement', () => {
        it('should get all announcements', async () => {
            const announcements = [
                { id: '1', name: 'Test', subject: 'Test Subject', avatar: 'test.jpg', message: 'Test Message' },
            ];
            mockAnnouncementsController.getAllAnnouncements.mockResolvedValue(announcements);

            const response = await request(app)
                .get('/api/announcement')
                .expect(200);

            expect(response.body.status).toBe('success');
            expect(response.body.data).toEqual(announcements);
        });
    });

    describe('PATCH /api/announcement/:id', () => {
        it('should update an announcement by ID', async () => {
            const updatedAnnouncement = { id: '1', name: 'Updated Test', subject: 'Updated Subject', avatar: 'updated.jpg', message: 'Updated Message' };
            mockAnnouncementsController.updateAnnouncement.mockResolvedValue(updatedAnnouncement);

            const response = await request(app)
                .patch('/api/announcement/1')
                .send(updatedAnnouncement)
                .expect(200);

            expect(response.body.status).toBe('success');
            expect(response.body.data).toEqual(updatedAnnouncement);
        });

        it('should return 404 if announcement to update is not found', async () => {
            mockAnnouncementsController.updateAnnouncement.mockResolvedValue(null);

            const response = await request(app)
                .patch('/api/announcement/1')
                .send({ name: 'Updated Test' })
                .expect(404);

            expect(response.body.message).toBe('Announcement not found');
        });
    });

    describe('DELETE /api/announcement/:id', () => {
        it('should delete an announcement by ID', async () => {
            mockAnnouncementsController.deleteAnnouncement.mockResolvedValue(true);

            const response = await request(app)
                .delete('/api/announcement/1')
                .expect(204);

            expect(response.body).toEqual({});
        });

        it('should return 404 if announcement to delete is not found', async () => {
            mockAnnouncementsController.deleteAnnouncement.mockResolvedValue(null);

            const response = await request(app)
                .delete('/api/announcement/1')
                .expect(404);

            expect(response.body.message).toBe('Announcement not found');
        });
    });
});
