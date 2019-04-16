import React, { useState } from "react";
import Cat from "./images/cat.jpg";

const Progressive = () => {
  const [image, setImage] = useState(false);
  return (
    <div>
      <button onClick={() => setImage(true)}>Load Image</button>
      {image && <img src={Cat} />}
    </div>
  );
};
export default Progressive;
