import React from 'react';
import './AddStudySession.css';
import TimeSelector from './TimeSelector.js';
import 'rc-time-picker/assets/index.css';

const AddStudySession = (props) => {
  return(
    <div>
      <div className='AddStudySessionHeaderImage'></div>
      <div className='mainContainer'>
        <h1>Add Study Session</h1>
        <form onSubmit={props.addStudySessionSubmitBtnHandler}>
          <label>
            <select name="selectedClass" onChange={props.FormHandler}> 
            <option>Class Name:</option> 
              {props.entireState.classes.map((classes, idx) => (
                <option  key={classes.classTitle} value={idx}>
                  {classes.classTitle}
                </option>
              ))}
            </select>
          </label>
          <br></br>
          <label>
            <select name="selectedTest" onChange={props.FormHandler}> 
            <option>Test Name:</option> 
                {props.tests.map((test, idx) => (
                  <option key={test.testName} value={idx}>
                    {test.testName}
                  </option>
                ))}
            </select>
          </label>
          <br></br>
          
          <div className='timeSelector'>
            <label >
              Start:
              <TimeSelector
                TimeValue={props.startTimeValue}
                timeHandler={props.handleStudySessionStartTime}
              />
            </label>
            <label>
              End:
              <TimeSelector
                TimeValue={props.endTimeValue}
                timeHandler={props.handleStudySessionEndTime}
              />
            </label>
          </div>
          <br></br>
          <label>
            <div>
              Notes:
            </div>
              <textarea
                onChange={props.FormHandler}
                name="notes"
                type="text" 
                value= {props.entireState.notes}
              />
            </label>
          
          <br></br>
          <input className='button' type="submit" value="Submit" />
        </form>
      </div>
    </div>
    
  )
}

export default AddStudySession;