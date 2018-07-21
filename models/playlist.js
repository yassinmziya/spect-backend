const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    lessons: {
        type: [Schema.Types.ObjectId],
        required: true,
    }
});

const Playlist = mongoose.model('playlist', PlaylistSchema);

module.exports = Playlist;
