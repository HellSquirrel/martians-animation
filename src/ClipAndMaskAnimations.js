import React, { useState } from "react";
import classNames from "classnames/bind";
import cs from "./ClipAndMaskAnimations.module.css";
import night from "./animated/night.jpg";
import { ReactComponent as HumanClip } from "./animated/human.svg";
import { ReactComponent as HumanMask } from "./animated/humanMask.svg";

const cx = classNames.bind(cs);

const ClipAndMaskAnimations = () => {
  const [animation, setAnimation] = useState(null);
  console.log(cs[animation]);
  return (
    <div className={cx("filtersAnimations")}>
      <HumanClip />
      <HumanMask style={{ display: "none" }} />
      <img src={night} className={cx("night", cs[animation])} />
      <button onClick={() => setAnimation("clip")}>Clip</button>
      <button onClick={() => setAnimation("human")}>Human</button>
      <button onClick={() => setAnimation("clipAnimation")}>
        clip animation
      </button>
      <button onClick={() => setAnimation("humanMask")}>humanMask</button>
    </div>
  );
};

export default ClipAndMaskAnimations;
