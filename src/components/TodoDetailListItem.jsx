import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import React from "react";

const TodoDetailListItem = (props) => {
  return (
    <ListItem> 
      <ListItemText primary={props.text} secondary={props.label} />
    </ListItem>
  );
};

export default TodoDetailListItem;
