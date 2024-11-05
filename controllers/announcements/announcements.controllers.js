// controllers/announcements/announcements.controller.js
const AppError = require('../../error/error');
const { validateAnnouncement } = require('../../utils/announcements.validation');

class AnnouncementsController {
    constructor(announcementsRepository) {
        this.announcementsRepository = announcementsRepository;
    }

    async addAnnouncement(data) {
        const { error } = validateAnnouncement(data);
        if (error) throw new AppError(`Validation Error: ${error.message}`, 400);

        const announcement = await this.announcementsRepository.addAnnouncement(data);
        return announcement;
    }

    async getAnnouncementById(id) {
        const announcement = await this.announcementsRepository.getAnnouncementById(id);
        if (!announcement) throw new AppError('Announcement not found', 404);

        return announcement;
    }

    async getAllAnnouncements() {
        const announcements = await this.announcementsRepository.getAllAnnouncements();
        return announcements;
    }

    async updateAnnouncement(id, data) {
        const { error } = validateAnnouncement(data);
        if (error) throw new AppError(`Validation Error: ${error.message}`, 400);

        const updatedAnnouncement = await this.announcementsRepository.updateAnnouncement(id, data);
        if (!updatedAnnouncement) throw new AppError('Announcement not found', 404);

        return updatedAnnouncement;
    }

    async deleteAnnouncement(id) {
        const deletedAnnouncement = await this.announcementsRepository.deleteAnnouncement(id);
        if (!deletedAnnouncement) throw new AppError('Announcement not found', 404);

        return deletedAnnouncement;
    }
}

module.exports = AnnouncementsController;
