export const sortPostsByDate = (posts) =>
  posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
