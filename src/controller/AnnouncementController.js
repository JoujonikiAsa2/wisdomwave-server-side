const AnnouncementModel = require("../models/AnnouncementSchema")

// create announcement
exports.createAnnouncement = async (req, res) => {
    try {
        // console.log("Hittet")
        const announcement = req.body
        const result = await AnnouncementModel.create(announcement)
        // console.log(result)
        res.status(200).json({ status: "success", data: result })
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
// read announcement by email
exports.StudentAnnouncements = async (req, res) => {
    try {
        const email = req.params.email;
        const result = await AnnouncementModel.find({'studentEmails.email': email });
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }    
}

exports.isReadStatus = async (req, res) => {
    const userEmail = req.params.email;

    try {
        const unreadAnnouncements = await AnnouncementModel.find({
            studentEmails: {
                $elemMatch: { email: userEmail, isRead: false }
            }
        });
        const counter = await AnnouncementModel.countDocuments({
            studentEmails: {
                $elemMatch: { email: userEmail, isRead: false }
            }
        });

        res.status(200).json({ status: "success", data: unreadAnnouncements , total: counter});
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}

exports.readStatusUpdate = async (req, res) => {
    try {
        const email = req.params.email; // Trim to remove any leading or trailing white spaces
        
        // Update documents where studentEmails.email matches the specified email
        const result = await AnnouncementModel.updateMany(
            {'studentEmails.email': email },
            { $set: { 'studentEmails.$[elem].isRead': true } },
            { arrayFilters: [{ 'elem.email': email }]}
        );
        // console.log(result)
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        console.error("Error updating announcements:", error);
        res.status(500).json({ status: "fail", message: error.message });
    }   
}