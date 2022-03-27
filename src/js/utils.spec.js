const Utils = require("./utils");

const MOCK_FETCH_RESPONSE = [
  {
    id: 1,
    date: "2019-04-23T22:26:43.511Z",
    name: "Dawud Esparza",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed gravida orci.",
    likes: 33,
  },
];

const MOCK_UNSORTED_DATA = [
  {
    id: 1,
    date: "2019-04-23T22:26:43.511Z",
    name: "cat",
    body: "cool",
    likes: 33,
  },
  {
    id: 1,
    date: "2019-04-23T22:26:43.511Z",
    name: "Dawud",
    body: "testing",
    likes: 3,
  },
  {
    id: 1,
    date: "2019-04-23T22:26:43.511Z",
    name: "Dog",
    body: "Hello world",
    likes: 10,
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_FETCH_RESPONSE),
  })
);

describe("Utils", () => {
  describe("fetchComments", () => {
    const { fetchComments } = Utils;
    it("should fetch comments from the server", async () => {
      const comments = await fetchComments();
      expect(comments).toEqual(MOCK_FETCH_RESPONSE);
    });
  });

  describe("composeCommentHTML", () => {
    const { composeCommentHTML } = Utils;
    it("should return composed HTML string", () => {
      const html = composeCommentHTML(MOCK_FETCH_RESPONSE);
      expect(html).toEqual(
        `<div class="comment"><div class="username">Dawud Esparza</div><div class="comment-grid"><div class="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed gravida orci.</div></div><div class="likes">33 Likes</div></div>`
      );
    });
  });

  describe("sortCommentByLikes", () => {
    const { sortCommentByLikes } = Utils;
    it("should sort the comments by likes", () => {
      const comments = sortCommentByLikes(MOCK_UNSORTED_DATA);
      expect(comments).toEqual([
        {
          id: 1,
          date: "2019-04-23T22:26:43.511Z",
          name: "cat",
          body: "cool",
          likes: 33,
        },
        {
          id: 1,
          date: "2019-04-23T22:26:43.511Z",
          name: "Dog",
          body: "Hello world",
          likes: 10,
        },
        {
          id: 1,
          date: "2019-04-23T22:26:43.511Z",
          name: "Dawud",
          body: "testing",
          likes: 3,
        },
      ]);
    });
  });
});
