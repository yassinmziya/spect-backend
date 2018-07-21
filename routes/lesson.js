const express = require('express');
const router = express.Router();

const verifyToken = require('../utils/VerifyToken');
const Lesson = require('../models/lesson');

router.get('/:id', verifyToken, (req, res, next) => {
    // const userId = req.userId; // see verifyToken middleware in utils
    const lessonId = req.params.id;

    Lesson.findById(lessonId).then((lesson) => {
        res.status(200).send(lesson);
    }).catch((err) => {
        res.status(404).send({ message: "Not found." });
    })
});

router.post('/', verifyToken, (req, res, next) => {
    const name = req.body.name;
    const length = req.body.length;
    const userId = req.userId;

    Lesson.create({
        name,
        length,
        createdBy: userId
    }).then(lesson => {
        res.status(200).send(lesson._id );
    }).catch(err => {
        res.status(401).send({ message: err.message });
    })
});

router.delete('/:id', verifyToken, (req, res, next) => {
    const userId = req.userId;
    const lessonId = req.params.id;

    Lesson.findById(lessonId).then((lesson) => {
        // users should not be able to delete each others lessons
        if(lesson.createdBy.toString() !== userId) return res.status(401).send({ message: 'Cannot delete another user\'s lesson' });

        Lesson.deleteOne({_id: lessonId}).then(() => {
            res.status(200).send(lesson);
        }).catch(err => {
            res.status(401).send({ message: err.message });
        })
    }).catch(err => {
        res.status(401).send({ message: "Lesson not found"});
    })
});

module.exports = router;