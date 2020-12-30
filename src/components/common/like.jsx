import React from "react";

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked === true) classes += "-o";

  return (
    <i className={classes} aria-hidden="true" onClick={props.handleLike}></i>
  );
};

export default Like;
