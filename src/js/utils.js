class Utils {
  constructor() {
    this.URL =
      "https://my-json-server.typicode.com/telegraph/frontend-exercise/comments";
  }

  async fetchComments(callback) {
    fetch(this.URL)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((e) => {
        throw new Error("An error occured while fetching comments");
      });
  }

  generateCommentHTML(comment) {
    return `
		<div class="row">
		<div class="row-header flex justify-between">
			<span class="username">${comment.name} </span>
			<span class="likes">${comment.likes}</span>
		</div>
		<div class="comment-holder flex">
			<span class="comment">${comment.body}</span>
		</div>
		</div>
		`;
  }

  renderCommentHTML(comments) {
    const commentBody = document.getElementById("comment-body");
    commentBody.innerHTML = comments;
  }
}

module.exports = Utils;
