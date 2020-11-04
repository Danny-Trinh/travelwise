import React from "react";

// returns a span with highlighted text, given a highlight query
export default function getHighlightedText(text: string, highlight: string) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) => {
        if (part.toLowerCase() === highlight.toLowerCase())
          return (
            <span key={i} style={{ backgroundColor: "#ffb7b7" }}>
              {part}
            </span>
          );
        else return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
