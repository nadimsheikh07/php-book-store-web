import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

// ----------------------------------------------------------------------

hljs.configure({
  languages: [
    "javascript",
    "ts",
    "tsx",
    "jsx",
    "sh",
    "bash",
    "html",
    "scss",
    "css",
    "json"
  ]
});

if (typeof window !== "undefined") {
  window.hljs = hljs;
}
