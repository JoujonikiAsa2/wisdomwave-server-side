const AnnouncementModel = require("../models/AnnouncementSchema")

// create announcement
exports.createAnnouncement = async (req, res) => {
    try {
        const announcement = req.body
        const isExist = await AnnouncementModel.findOne({ 'email': announcement.email })
        if (isExist) {
            return res.status(404).json({ status: "Failed", message: "Announcement already exist" });
        }
        else {
        const result = await AnnouncementModel.create(announcement)
        res.status(200).json({ status: "success", data: result })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}

// delete announcement
exports.deleteAnnouncement = async (req, res) => {
    try {
       const id = req.params.id
       const filteredId = { _id: id }
       const result = await AnnouncementModel.deleteOne(filteredId)
       res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}

// read announcement by email
exports.announcements = async (req, res) => {
    try {
        const email = req.params.email
        const filter = { 'email': email }
        const result = await AnnouncementModel.find(filter)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message })
    }
}