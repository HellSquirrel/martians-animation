import React, { useState } from "react";
import classNames from "classnames/bind";
import cs from "./FiltersAnimations.module.css";
import colors from "./animated/colors.jpg";
import Controls from "./Controls";

const cx = classNames.bind(cs);

const FiltersAnimations = () => {
  const [animation, setAnimation] = useState(null);
  console.log(cs[animation]);
  return (
    <div className={cx("filtersAnimations")}>
      <Controls>
        <button onClick={() => setAnimation("blur")}>Blur</button>
        <button onClick={() => setAnimation("hue")}>Hue</button>
        <button onClick={() => setAnimation("grayscale")}>Grayscale</button>
      </Controls>
      <img src={colors} className={cx("colors", cs[animation])} />
    </div>
  );
};

export default FiltersAnimations;
