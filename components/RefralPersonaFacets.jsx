import React from "react";
import { RefinementList } from "react-instantsearch";

const RefralPersonaFacets = ({ data, children }) => {
  return (
    <div>
      <div className="mt-5 panel">
        <h5 className="font-semibold ">Referral Person</h5>
        {data?.map((item, index) => (
          <div key={index}>
            <h5>{item?.title}</h5>
            {React.Children.map(children, (child) =>
              React.cloneElement(child, { data: item })
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RefralPersonaFacets;
