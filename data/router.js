const express = require('express');

const router = express.Router();
const Posts = require('./db.js');

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving the posts"
        });
    });
});

router.get('/:id', (req, res) => {
        Posts.findById(req.params.id)
        .then((post) => {
			if (post.length) {
				res.status(200).json(post);
			} else {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist." });
			}
		})
		.catch((err) =>
			res
				.status(500)
				.json({ error: "The post information could not be retrieved" })
		);
});

router.get("/:id/comments", (req, res) => {
	Posts.findPostComments(req.params.id)
		.then((comments) => {
			if (comments.length) {
				res.status(200).json(comments);
			} else {
				res
					.status(404)
					.json({ message: "The comments does not exist." });
			}
		})
		.catch((err) =>
			res
				.status(500)
				.json({ error: "The comments information could not be retrieved." })
		);
});

router.post("/", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents." });
    } else {
        Posts.insert(req.body)
        .then(() => {
          res.status(201).json(req.body);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            messge: "Failed to save the post to the database",
          });
        })
    }
});

router.post("/:id/comments", (req, res) => {
    Posts.findById(req.params.id)
        .then((post) => {
            if (post) {
                req.body.text
                ? Posts.insertComment(req.body)
                    .then(res.status(200).json(req.body))
                    .catch((err) => {
                        console.log(err);
                    })
                : res.status(400).json({ errorMessage: "Please provide text for the comment." });
            } else {
                res.status(404).json({ message: "Post not found" });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Error processing request" });
        });
});

module.exports = router;