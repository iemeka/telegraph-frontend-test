const Utils = require("./utils");

const utils = new Utils();

utils.fetchComments((data) => {
  const comments = data;
  const sortedComments = [...comments].sort((a, b) => b.likes - a.likes);
  let sorted = false;

  const renderComments = (comments) => {
    const commentsHTML = comments
      .map((comment) => utils.generateCommentHTML(comment))
      .join("");
    utils.renderCommentHTML(commentsHTML);
  };

  const likeButton = document.getElementById("button-likes");
  likeButton.onclick = () => {
    renderComments(sorted ? comments : sortedComments);
    sorted = !sorted;
  };

  renderComments(comments);
});
