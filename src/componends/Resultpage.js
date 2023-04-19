import React from 'react'

function Resultpage({score,correct, wrong}) {
  return (
    <div>
      <div>
          <div className="reset">
            <h1>Result</h1>
            <label>Total score = {score}% Out of 100%</label>
            <br />
            <label>Correct Answer={correct}</label>
            <br />
            <label>Incorrect Answer={wrong}</label>
            <br />
            <br />
            
          </div>
        </div>
    </div>
  )
}

export default Resultpage;
