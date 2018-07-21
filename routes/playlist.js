const express = require('express');
const router = express.Router();

const Playlist = require('../models/playlist');
const verifyToken = require('../utils/VerifyToken');

router.get('/', verifyToken, (req, res, next) => {
    Playlist.find({}).then(playlists => {
        res.status(200).send(playlists);
    }).catch(err => {
        res.status(401).send({ message:err.message })
    })
});

router.get('/:id', verifyToken, (req, res, next) => {
    Playlist.findById(req.params.id).then(playlist => {
        res.status(200).send(playlist);
    }).catch(err => {
        res.status(404).send({ message: 'Playlist not found' })
    });
});

router.post('/', verifyToken, (req, res, next) => {
    const userId = req.userId;
    const name = req.body.name;

    Playlist.create({
        name,
        createdBy: userId
    }).then(playlist => {
        res.status(200).send(playlist._id);
    }).catch(err => {
        res.status(401).send({ message: err.message });
    });
});

router.put('/:lessonId', verifyToken, (req, res, next) => {

});

router.delete('/:id', verifyToken, (req, res, next) => {
    const userId = req.userId;
    const playlistId = req.params.id;

    Playlist.findById(userId).then(playlist => {
        if((userId !== playlist.createdBy.toString())) {
            return res.status(401).send({ message: 'Cannot delete playlist' })
        }
        Playlist.deleteOne({_id: playlistId}).then(() => {
                res.status(200).send(playlist);
            }
        ).catch(err => {
            res.status(404).send({ message: 'Not found' });
        });
    }).catch(err => {
        res.status(404).send({ message: 'Not found' });
    });
});