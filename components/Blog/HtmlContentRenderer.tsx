"use client";

import { motion } from "framer-motion";

interface HtmlContentRendererProps {
  html: string;
}

export default function HtmlContentRenderer({ html }: HtmlContentRendererProps) {
  const parseHtml = (htmlString: string) => {
    if (typeof window === "undefined") return htmlString;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    const addCustomClasses = (element: Element) => {
      // Headings
      if (element.tagName === "H1") {
        element.classList.add("text-4xl","font-bold","text-foreground","mt-12","mb-6","leading-tight");
      } else if (element.tagName === "H2") {
        element.classList.add("text-3xl","font-bold","text-foreground","mt-10","mb-5","leading-tight");
      } else if (element.tagName === "H3") {
        element.classList.add("text-2xl","font-semibold","text-foreground","mt-8","mb-4","leading-tight");
      } else if (element.tagName === "H4") {
        element.classList.add("text-xl","font-semibold","text-foreground","mt-6","mb-3","leading-tight");
      }

      // Paragraphs
      if (element.tagName === "P") {
        element.classList.add("text-foreground","leading-relaxed","mb-6","text-lg");
      }

      // UL: custom bullets to keep icons/text aligned on one line
      if (element.tagName === "UL") {
        element.classList.add("list-none","space-y-3","mb-6","text-foreground","pl-0");
        const lis = element.querySelectorAll(":scope > li");
        lis.forEach((li) => {
          li.classList.add("flex","items-start","gap-3","leading-relaxed","text-lg");
          // If we already injected an icon, skip
          if (!li.querySelector(":scope > ._bullet")) {
            const bullet = document.createElement("span");
            bullet.className = "_bullet mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-primary";
            li.prepend(bullet);
          }
          // Ensure inline visuals align
          li.querySelectorAll("img, svg, i, span").forEach((inline) => {
            inline.classList.add("align-middle");
          });
        });
      }

      // OL: keep native numbers but make markers look nice
      if (element.tagName === "OL") {
        element.classList.add("list-decimal","pl-6","space-y-3","mb-6","text-foreground","marker:font-semibold","marker:text-primary");
        const lis = element.querySelectorAll(":scope > li");
        lis.forEach((li) => {
          li.classList.add("leading-relaxed","text-lg");
          li.querySelectorAll("img, svg, i, span").forEach((inline) => {
            inline.classList.add("align-middle");
          });
        });
      }

      // LI (fallback if it wasn’t caught by the UL/OL blocks)
      if (element.tagName === "LI") {
        element.classList.add("leading-relaxed","text-lg");
      }

      // Links
      if (element.tagName === "A") {
        element.classList.add(
          "text-primary","hover:text-primary/80","underline",
          "decoration-primary/30","underline-offset-4","transition-colors","break-words"
        );
      }

      // Strong/Emphasis
      if (element.tagName === "STRONG" || element.tagName === "B") {
        element.classList.add("font-semibold","text-foreground");
      }
      if (element.tagName === "EM" || element.tagName === "I") {
        element.classList.add("italic","text-foreground");
      }

      // Blockquotes
      if (element.tagName === "BLOCKQUOTE") {
        element.classList.add(
          "border-l-4","border-primary/30","pl-6","py-4","bg-muted/20",
          "rounded-r-lg","my-8","italic","text-muted-foreground"
        );
      }

      // Code blocks & inline code
      if (element.tagName === "PRE") {
        element.classList.add("bg-muted","p-4","rounded-xl","overflow-x-auto","my-8","border","border-border/50","text-sm");
      }
      if (element.tagName === "CODE") {
        // Avoid double-styling code inside pre
        if (element.parentElement?.tagName !== "PRE") {
          element.classList.add("bg-muted/50","px-2","py-0.5","rounded","text-sm","font-mono","text-foreground");
        }
      }

      // Images
      if (element.tagName === "IMG") {
        element.classList.add("rounded-xl","shadow-lg","my-8","max-w-full","h-auto","mx-auto");
      }

      // Tables
      if (element.tagName === "TABLE") {
        element.classList.add("w-full","border","border-border/50","rounded-xl","overflow-hidden","my-8","text-sm");
        const thead = element.querySelector("thead");
        if (thead) thead.classList.add("bg-muted");
        element.querySelectorAll("th, td").forEach((cell) => {
          (cell as HTMLElement).classList.add("border-b","border-border/50","px-4","py-3","align-top");
        });
      }

      // Horizontal rule
      if (element.tagName === "HR") {
        element.classList.add("border-0","border-t","border-border/50","my-12");
      }

      // Special wrappers
      if (element.tagName === "DIV") {
        if (element.classList.contains("captioned-image-container")) {
          element.classList.add("my-8");
        }
        if (element.classList.contains("youtube-wrap")) {
          // keep 16:9
          element.classList.add("my-8","rounded-xl","overflow-hidden","shadow-lg","relative","w-full");
          // If it contains an iframe, enforce aspect
          const iframe = element.querySelector("iframe") as HTMLElement | null;
          if (iframe) {
            element.classList.add("pt-[56.25%]");
            iframe.classList.add("absolute","inset-0","w-full","h-full");
          }
        }
        if (element.classList.contains("button-wrapper")) {
          element.classList.add("my-8","text-center");
        }
      }

      // Buttons (anchor-as-button)
      if (element.tagName === "A" && (element as HTMLElement).classList.contains("button")) {
        element.classList.add(
          "inline-flex","items-center","gap-2","px-6","py-3",
          "bg-primary","text-primary-foreground","rounded-lg",
          "hover:bg-primary/90","transition-colors","font-medium",
          "shadow-md","hover:shadow-lg","no-underline"
        );
      }

      // Recurse
      Array.from(element.children).forEach((child) => addCustomClasses(child));
    };

    Array.from(tempDiv.children).forEach((child) => addCustomClasses(child));

    return tempDiv.innerHTML;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="prose prose-lg max-w-none prose-p:my-0"
      dangerouslySetInnerHTML={{ __html: parseHtml(html) }}
    />
  );
}
