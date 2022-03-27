const SERVER_URL =
  "https://my-json-server.typicode.com/telegraph/frontend-exercise/comments";

function fetchComments() {
  return new Promise((resolve, reject) => {
    fetch(SERVER_URL)
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch(reject);
  });
}

function composeComments(comment) {
  return comment == null ||
    comment.name == null ||
    comment.body == null ||
    comment.likes == null
    ? ""
    : `<div class="comment"><div class="username">${comment.name}</div><div class="comment-grid"><div class="comment-text">${comment.body}</div></div><div class="likes">${comment.likes} Likes</div></div>`;
}

function composeCommentHTML(comments) {
  if (!Array.isArray(comments)) return "";
  return comments.map((comment) => composeComments(comment)).join("");
}

function sortCommentByLikes(comments = []) {
  return [...comments].sort((a, b) =>
    a.likes != null && b.likes != null ? b.likes - a.likes : 0
  );
}

function debounceFn(func, delay) {
  let timer;
  return function (...args) {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

module.exports = {
  fetchComments,
  composeCommentHTML,
  sortCommentByLikes,
  debounceFn,
};
