import React from "react";

export default function Labels({ issue }) {
  return (
    <div>
      {issue.labels.map((label) => (
        <button
          className="labelItem"
          key={label.id}
          style={{ backgroundColor: "#" + label.color }}
        >
          {label.name}
        </button>
      ))}
    </div>
  );
}
