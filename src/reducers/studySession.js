const studySessionReducer = (state = {}, action) => {
  switch(action.type){
    case 'ADD_STUDY_SESSION_DETAILS':

     let updatedState = {};

     for(const key in state) {
        updatedState[key] = {...state[key]}
     }

      const testName = 'test' + action.testID      
      // if no class, add the class, test, and notes
      if(updatedState['class'+ action.classID] === undefined){
        updatedState['class'+ action.classID] = {[testName]: [{StudySession0: {
          notes: action.notes,
          SelectedStartTimeValue: action.SelectedStartTimeValue, 
          SelectedStartTimeValueToDisplay: action.SelectedStartTimeValueToDisplay,
          SelectedEndTimeValue: action.SelectedEndTimeValue,
          SelectedEndTimeValueToDisplay: action.SelectedEndTimeValueToDisplay
        }}] }
      } 
      // else if no test add the test
      else if (updatedState['class'+ action.classID][testName] === undefined) {
        updatedState['class'+ action.classID][testName] = [{StudySession0: {
          notes: action.notes,
          SelectedStartTimeValue: action.SelectedStartTimeValue, 
          SelectedStartTimeValueToDisplay: action.SelectedStartTimeValueToDisplay,
          SelectedEndTimeValue: action.SelectedEndTimeValue,
          SelectedEndTimeValueToDisplay: action.SelectedEndTimeValueToDisplay
        }}]
      } 
      // else add the study session to the test
      else {
        let selectedTestStudySessionArray = updatedState['class'+ action.classID][testName]
        selectedTestStudySessionArray.push({['studySession' + selectedTestStudySessionArray.length]: {
          notes: action.notes,
          SelectedStartTimeValue: action.SelectedStartTimeValue, 
          SelectedStartTimeValueToDisplay: action.SelectedStartTimeValueToDisplay,
          SelectedEndTimeValue: action.SelectedEndTimeValue,
          SelectedEndTimeValueToDisplay: action.SelectedEndTimeValueToDisplay
        }})
      }

      // console.log("LINE 21: updated state :", updatedState )
      return updatedState 
    
    default: 
      return state
  }
}

export default studySessionReducer