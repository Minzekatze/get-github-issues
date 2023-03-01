import React from "react";
import { FaRegCommentAlt } from "react-icons/fa";

export default function Comments({ issue }) {
  return (
    <div>
      <div>{issue.comments}</div>
      <FaRegCommentAlt />
    </div>
  );
}
