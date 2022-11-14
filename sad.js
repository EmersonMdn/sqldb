const userSchema = new schema.Entity("users", {}, { idAttribute: "email" });
const commentSchema = new schema.Entity("comments", {
  commenter: userSchema,
});

const postSchema = new schema.Entity("posts", {
  author: userSchema,
  comments: [commentSchema],
});
const blogSchema = new schema.Entity("blogs", {
  posts: [postSchema],
});

const authorSchema = new schema.Entity("author", {}, { idAttribute: "_id" });

const mensajesSchema = new schema.Entity("mensajes", {
  author: [authorSchema],
});
