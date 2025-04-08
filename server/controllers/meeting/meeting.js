const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');

const add = async (req, res) => {
    try {
        const meeting = new MeetingHistory(req.body);
        await meeting.save();
        res.status(200).json(meeting);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create meeting' });
    }
}

const index = async (req, res) => {
    try {
        const filter = {};

        if (req.params.createBy) {
            filter.createBy = req.params.createBy;
        }

        const meetings = await MeetingHistory.find(filter).populate('createBy', 'firstName lastName');
        res.status(200).json(meetings);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch meetings' });
    }
}

const view = async (req, res) => {
    let id = req.params.id;
    try {
        const meetings = await MeetingHistory.findOne({_id: id}).populate('createBy', 'firstName lastName');
        res.status(200).json(meetings);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch meeting' });
    }
}

const deleteData = async (req, res) => {
    let id = req.params.id;
    try {
        const meetings = await MeetingHistory.deleteOne({_id: id});
        res.status(200).json(meetings);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete meeting' });
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: 'No IDs provided for deletion' });
        }

        const result = await MeetingHistory.deleteMany({ _id: { $in: ids } });

        res.status(200).json({ message: 'Meetings deleted successfully', deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete meetings' });
    }
}

module.exports = { add, index, view, deleteData, deleteMany }