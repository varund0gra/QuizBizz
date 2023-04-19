import qData from '../data.json'
//  ADDING STARS
export function stars(ques) {
    if (qData[ques].difficulty == "hard") {
      return "⭐⭐⭐⚝⚝";
    } else if (qData[ques].difficulty == "easy") {
      return "⭐⚝⚝⚝⚝";
    } else if (qData[ques].difficulty == "medium") {
      return "⭐⭐⚝⚝⚝";
    }
  }

  
  export function handleResult(setres) {
    setres(true);
  }
  
  
  