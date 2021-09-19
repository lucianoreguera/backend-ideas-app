let _commentService = null;

class CommentController {
    constructor({ CommentService }) {
        _commentService = CommentService;
    }

    async get(req, res) {
        const { commentId } = req.params;
        const comment = await _commentService.get(commentId);
        return res.send(comment);
    }

    async getAll(req, res) {
        const comments = await _commentService.getAll();
        return res.send(comments);
    }

    async createComment(req, res) {
        const { body } = req;
        const { ideaId } = req.params;
        const comment = await _commentService.createComment(ideaId, body);
        return res.status(201).send(comment);
    }

    async update(req, res) {
        const { body } = req;
        const { commentId } = req.params;
        const updatedComment = _commentService.update(commentId, body);
        return res.send(updatedComment);
    }

    async delete(req, res) {
        const { commentId } = req.params;
        const deletedComment = await _commentService.delete(commentId);
        return res.send(deletedComment);
    }

    async getIdeasComments(req, res) {
        const { ideaId } = req.params;
        const comments = await _commentService.getIdeasComments(ideaId);
        return res.send(comments);
    }
}

module.exports = CommentController;
