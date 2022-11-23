import React, { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { Button } from "react-bootstrap";
import { AiOutlineHeart } from "react-icons/ai";
import useAxios from "../../hooks/useAxios";

export default function ReactButton({ reactions, id, symbol }) {
  const http = useAxios();

  const Emoji = (props) => (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}>
      {props.symbol}
    </span>
  );

  // const handleClick = (event, param) => {
  //   console.log(event.target.innerText);
  //   console.log(param);
  // };

  async function addReaction(event) {
    const emojiName = event.target.innerText;
    const url = "social/posts/" + id + "/react/" + emojiName;
    console.log(url);

    try {
      const response = await http.put(url);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <OverlayTrigger
        rootClose
        trigger="click"
        key="top"
        placement="top"
        overlay={
          <Popover variant="dark" id="popover-positioned-top">
            <Popover.Body>
              <Button id={id} variant="reaction" onClick={addReaction}>
                <Emoji label="thumbs-up" symbol="👍" />
              </Button>
              <Button id={id} variant="reaction" onClick={addReaction}>
                <Emoji label="heart" symbol="❤️" />
              </Button>
              <Button id={id} variant="reaction" onClick={addReaction}>
                <Emoji label="laughing" symbol="😂" />
              </Button>
              <Button id={id} variant="reaction" onClick={addReaction}>
                <Emoji label="angry" symbol="😡" />
              </Button>
            </Popover.Body>
          </Popover>
        }>
        <Button variant="heart" className="d-flex align-items-center">
          <AiOutlineHeart className="btn-heart__icon" />
          <small>{reactions}</small>
        </Button>
      </OverlayTrigger>
    </>
  );
}
