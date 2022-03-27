// Use IIFE to avoid polluting the global name-space
(function () {
  const {
    fetchComments,
    composeCommentHTML,
    sortCommentByLikes,
    debounceFn,
  } = require("./utils");

  let comments;
  let sortedComments;
  let isSortedCommentsRendered = false;
  let commentListElement;
  let isDOMLoaded = false;
  let isCommentFetched = false;
  const DELAY_MS = 200;

  const intervalID = setInterval(() => {
    // Keep checking if DOM is loaded and comments have been fetched.
    if (isDOMLoaded && isCommentFetched) {
      clearInterval(intervalID);
      init();
    }
  }, 1);

  window.addEventListener("DOMContentLoaded", () => {
    isDOMLoaded = true;
  });

  // start fetching comments
  fetchComments()
    .then((result) => {
      comments = result;
    })
    .catch((error) => {
      console.warn("Error occured when trying to fetch comments", error);
    })
    .finally(() => {
      isCommentFetched = true;
    });

  function init() {
    const debouncedHandleSort = debounceFn(handleSort, DELAY_MS);
    document
      .querySelector("#sort-by-likes-btn")
      .addEventListener("click", debouncedHandleSort);
    commentListElement = document.querySelector("#comment-list");
    render(composeCommentHTML(comments));
  }

  function handleSort() {
    if (isSortedCommentsRendered) {
      render(composeCommentHTML(comments));
    } else {
      sortedComments =
        sortedComments == null ? sortCommentByLikes(comments) : sortedComments;
      render(composeCommentHTML(sortedComments));
    }
    isSortedCommentsRendered = !isSortedCommentsRendered;
  }

  function render(content) {
    if (commentListElement != null) {
      commentListElement.innerHTML = content;
    }
  }
})();
