import React, { useState } from "react";
import classNames from "classnames/bind";
import cs from "./BasicAnimations.module.css";
import { ReactComponent as Martians } from "./animated/martians.svg";
import Controls from "./Controls";

const cx = classNames.bind(cs);

const BasicAnimations = () => {
  const [animation, setAnimation] = useState(null);
  console.log(cs[animation]);
  return (
    <div className={cx("basicAnimations")}>
      <Controls>
        <button onClick={() => setAnimation("run")}>Run!</button>
      </Controls>
      <Martians className={cx("martians", cs[animation])} />
    </div>
  );
};

export default BasicAnimations;
