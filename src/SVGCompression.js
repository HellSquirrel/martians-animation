import React from "react";
import unicorn from "./images/unicorns/unicorn-svgo.svg";
import unicornRastr from "./images/unicorns/unicorn-svgo.webp";
import unicornRastrSmall from "./images/unicorns/unicorn-svgo-small.webp";
import unicornRastrIdeal from "./images/unicorns/unicorn-ideal.webp";

const SVGCompression = () => {
  return (
    <div>
      <img src={unicorn} />
      <img src={unicornRastr} />
      <img src={unicornRastrSmall} />
      <img src={unicornRastrIdeal} />
    </div>
  );
};

export default SVGCompression;
