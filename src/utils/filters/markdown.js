import markdownIt from "markdown-it";

export const markdownFilter = (value) => {
  return markdownIt({ html: true, linkify: true }).renderInline(value);
};
