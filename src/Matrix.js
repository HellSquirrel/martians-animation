import React, { useState } from "react";
import classNames from "classnames/bind";
import cs from "./Matrix.modules.css";
import MartiansPNG from "./images/martians.png";
import math from "mathjs";
import { assocPath } from "ramda";

const cx = classNames.bind(cs);

const E = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

const getMatrixStyle = matrixArray => {
  const product = matrixArray.reduce(
    (result, m) => math.multiply(result, math.matrix(m).map(Number)),
    math.matrix(E)
  );
  const resized = math.flatten(product);
  return `matrix3d(${String(resized).replace(/[\[\]]/gi, "")})`;
};

const MatrixInput = ({ matrices, onChange, onAdd }) => (
  <div className={cx("matrices")}>
    {matrices.map((m, mIndex) => (
      <div className={cx("matrixInput")} key={`m${mIndex}`}>
        {[...Array(4)].map((e, i) => (
          <div key={i}>
            {[...Array(4)].map((v, j) => (
              <input
                className={cx("input")}
                value={matrices[mIndex][i][j]}
                key={`${i}${j}`}
                onChange={({ currentTarget: { value } }) => {
                  onChange(mIndex, i, j, value);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    ))}
    <button onClick={() => onAdd()}>One more</button>
  </div>
);

const Matrix = () => {
  const [matrices, setMatrices] = useState([E]);
  return (
    <div className={cx("matrix")}>
      <div className={cx("lab")}>
        <img src={MartiansPNG} className={cx("original")} />
        <img
          src={MartiansPNG}
          className={cx("transformed")}
          style={{ transform: getMatrixStyle(matrices) }}
        />
      </div>
      <MatrixInput
        matrices={matrices}
        onChange={(mIndex, i, j, value) =>
          setMatrices(assocPath([mIndex, i, j], value, matrices))
        }
        onAdd={() => setMatrices([...matrices, E])}
      />
    </div>
  );
};

export default Matrix;
