const Announcement = require('../../models/announcements/announcements.model'); 

class AnnouncementsRepository {
    async addAnnouncement(data) {
        const announcement = new Announcement(data);
        return announcement.save();
    }

    async getAnnouncementById(id) {
        return Announcement.findById(id);
    }

    async getAllAnnouncements() {
        return Announcement.find();
    }

    async updateAnnouncement(id, data) {
        return Announcement.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async deleteAnnouncement(id) {
        return Announcement.findByIdAndDelete(id);
    }
}

module.exports = AnnouncementsRepository;
