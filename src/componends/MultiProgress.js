import React from 'react'
import MultiProgress from "react-multi-progress";
  function MultiProgres({score,wrongscorbar}) {
  return (
    <div>
        <MultiProgress
              transitionTime={1.2}
              elements={[
                {
                  value: score,
                  color: "darkgreen",
                  isBold: true,
                  fontSize: 15,
                  showPercentage: true,
                  textColor: "white",
                },
                {
                  value: wrongscorbar,
                  color: "red",
                  showPercentage: true,
                  fontSize: 15,
                  isBold: false,
                  textColor: "white",
                  className: "my-custom-css-class",
                },
                {
                  value: 100,
                  color: "grey",
                  // showPercentage: true,
                  fontSize: 12,
                  textColor: "white",
                  isBold: true,
                },
              ]}
              height={30}
            />
      
    </div>
  )
}
export default MultiProgres
