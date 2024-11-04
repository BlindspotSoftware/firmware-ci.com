import MarkdownIt from "markdown-it";

export const markdownFilter = (value) => {
  const md = new MarkdownIt({ html: true, linkify: true });

  return (
    md
      .render(value)
      // Custom markdown renderer not working, workaround for now
      .replaceAll(
        "<img",
        `<img eleventy:widths="400,600,800,1000" sizes="100vw"`
      )
  );
};
