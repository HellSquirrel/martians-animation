import React, { useState } from "react";
import classNames from "classnames/bind";
import cs from "./ThreeDAnimations.modules.css";

const cx = classNames.bind(cs);

const ThreeDAnimations = () => {
  const [animation, setAnimation] = useState(null);
  const [perspective, setPerspective] = useState(0);
  console.log(animation, cs);
  return (
    <div className={cx("threeDAnimations")}>
      <button onClick={() => setAnimation("rx")}>Rotate X</button>
      <button onClick={() => setAnimation("ry")}>Rotate Y</button>
      <button onClick={() => setAnimation("rz")}>Rotate Z</button>
      <button onClick={() => setAnimation("tz")}>Translate Z</button>
      <input
        type="number"
        value={perspective}
        onChange={({ currentTarget }) => setPerspective(currentTarget.value)}
      />
      <div className="threeDContainer" style={{ perspective: `${perspective}px` }}>
        {[...Array(6)].map((_, id) => (
          <div key={id} className={cx("face", `face${1}`, animation)} />
        ))}
      </div>
    </div>
  );
};

export default ThreeDAnimations;
