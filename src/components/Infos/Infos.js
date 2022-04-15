import React from "react";
import infos from "../../MockData/infos";
import InfoCard from "../InfoCard/InfoCard";
import "./Infos.css";
const Infos = () => {
  return (
    <div className="infos">
      <div className="container">
        <div className="row mt-5">
          {infos.map((info, i) => (
            <InfoCard key={i} info={info} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Infos;
