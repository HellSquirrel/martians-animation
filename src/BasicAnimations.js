import React, { useState } from "react";
import classNames from "classnames/bind";
import cs from "./BasicAnimations.module.css";
import { ReactComponent as Martians } from "./animated/martians.svg";

const cx = classNames.bind(cs);

const BasicAnimations = () => {
  const [animation, setAnimation] = useState(null);
  console.log(cs[animation]);
  return (
    <div className={cx("basicAnimations")}>
      <Martians className={cx("martians", cs[animation])} />
      <button onClick={() => setAnimation("run")}>Run!</button>
    </div>
  );
};

export default BasicAnimations;
