import React, { useState } from "react";
import Cat from "./images/cat.jpg";
import Controls from "./Controls";

const Progressive = () => {
  const [image, setImage] = useState(false);
  return (
    <div>
      <Controls>
        <button onClick={() => setImage(true)}>Load Image</button>
      </Controls>
      {image && <img src={Cat} />}
    </div>
  );
};
export default Progressive;
