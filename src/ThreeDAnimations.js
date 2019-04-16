import React, { useState } from "react";
import classNames from "classnames/bind";
import cs from "./ThreeDAnimations.modules.css";
import Controls from "./Controls";

const cx = classNames.bind(cs);

const ThreeDAnimations = () => {
  const [animation, setAnimation] = useState(null);
  const [perspective, setPerspective] = useState(1000);
  const [perspectiveOrigin, setPerspectiveOrigin] = useState("center center");
  return (
    <div className={cx("threeDAnimations")}>
      <Controls>
        <button onClick={() => setAnimation("rx")}>Rotate X</button>
        <button onClick={() => setAnimation("ry")}>Rotate Y</button>
        <button onClick={() => setAnimation("rz")}>Rotate Z</button>
        <button onClick={() => setAnimation("tz")}>Translate Z</button>
        <button onClick={() => setAnimation("cube")}>Cube</button>
      </Controls>
      <input
        type="number"
        value={perspective}
        onChange={({ currentTarget }) => setPerspective(currentTarget.value)}
      />
      <input
        type="text"
        value={perspectiveOrigin}
        onChange={({ currentTarget }) =>
          setPerspectiveOrigin(currentTarget.value)
        }
      />
      <div
        className="threeDContainer"
        style={{
          perspective: `${perspective}px`,
          perspectiveOrigin: `${perspectiveOrigin}`
        }}
      >
        {[...Array(6)].map((_, id) => (
          <div key={id} className={cx("face", `face${id}`, animation)} />
        ))}
      </div>
    </div>
  );
};

export default ThreeDAnimations;
