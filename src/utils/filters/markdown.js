import markdownItShiki from "@shikijs/markdown-it";
import MarkdownIt from "markdown-it";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { codeToHtml } from "shiki";

export const markdownFilter = async (value) => {
  const marked = new Marked(
    markedHighlight({
      emptyLangClass: "shiki",
      langPrefix: "shiki language-",
      highlight(code, lang, info) {
        return `sdwfe?`;
      },
    })
  );
  // const md = new MarkdownIt({
  //   html: true,
  //   linkify: true,
  //   highlight: async (str, lang) => {
  //     return await codeToHtml(str, {
  //       lang,
  //       theme: "vitesse-dark",
  //     });
  //   },
  // });
  //   .use(
  //   await markdownItShiki({
  //     themes: {
  //       light: "github-light",
  //       dark: "github-dark",
  //     },
  //   })
  // );

  // return md.render(value);
  return marked.parse(value);
};
