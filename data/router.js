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
            error: "The posts information could not be retrieved.",
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
				.json({ error: "The post information could not be retrieved." })
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
					.json({ message: "The post with the specified ID does not exist." });
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
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        Posts.insert(req.body)
        .then(() => {
          res.status(201).json(req.body);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: "There was an error while saving the post to the database",
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
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the comment to the database" });
        });
});

router.delete("/:id", (req, res) => {
    Posts.findById(req.params.id)
        .then((post) => {
            if (post) {
                Posts.remove(req.params.id)
                    .then(() => res.status(200).json(post))
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({ error: "The post could not be removed" });
                    });
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "The post could not be removed" });
        });
});
  
router.put("/:id", (req, res) => {
    !req.params.id
      ? res.status(404).json({ message: "The post with the specified ID does not exist." })
      : req.body.title && req.body.contents
      ? Posts.update(req.params.id, req.body)
          .then(res.status(200).json(req.body))
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "The post information could not be modified." });
          })
      : res
          .status(400).json({ errorMessage: "Please provide title and contents for the post.", });
});

module.exports = router;