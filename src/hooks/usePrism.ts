import Prism from "prismjs";
import "prismjs/components/prism-rust";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/themes/prism-tomorrow.css";
import React from "react";

export const usePrism = (code?: string) => {
  React.useEffect(() => {
    Prism.highlightAll();
  }, [code]);
};
