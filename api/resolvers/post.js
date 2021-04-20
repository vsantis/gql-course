const { posts } = require('../temp');

// queries
const totalPosts = () => posts.length;
const allPosts = () => posts;

// mutation
const newPost = (parent, args) => {
  const post = {
    id: posts.length + 1,
    ...args.input,
  };
  posts.push(post);
  return post;
};

module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    newPost,
  },
};
