import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Duration from 'duration';

import './App.css';
import Nav from './Components/Nav.js';
import Home from './Components/Home/Home.js';
import AddClass from './Components/AddClass.js';
import AddStudySession from './Components/StudySession/AddStudySession.js';
import AddTest from './Components/AddTest.js';
import AddGrade from './Components/AddGrade';
import moment from 'moment';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      classes:[
        {
          classTitle: "Psychology101",
          test:[
            {
              testName: 'psychT1',
              homePageShowStudySessions: false,
              studySession: [
                {
                  endTime: "17:50",
                  notes: "test",
                  startTime: "13:50",
                  studySessionNum: 'psychT1 - study session 0',
                  studyDuration: "4:00"
                }
              ],
            },
            {
              testName: 'psychT2',
              homePageShowStudySessions: false,
              studySession: [
                {
                  endTime: "13:00",
                  notes: "test",
                  startTime: "13:50",
                  studySessionNum: 'psychT2 - study session 0',
                  studyDuration: "0:50"
                }
              ],
            }
          ]
        },
        {
          classTitle: "History101",
          test:[
            {
              testName: 'histT1',
              homePageShowStudySessions: false,
              studySession: [
                {
                  endTime: "6:46",
                  notes: "test",
                  startTime: "6:10",
                  studySessionNum: 'histT1 - study session 0',
                  studyDuration: "0:36"
                }
              ],
            },
            {
              testName: 'HistT2',
              homePageShowStudySessions: false,
              studySession: [
                {
                  endTime: "17:46",
                  notes: "test",
                  startTime: "15:00",
                  studySessionNum: 'histT2 - study session 0',
                  studyDuration: "2:46"
                }
              ],
            }
          ]
        },
      ],
      selectedClass: 0,
      selectedTest: 0,
      startTimeValue: moment(),
      SelectedStartTimeValue: '',
      endTimeValue: moment(),
      SelectedEndTimeValue: '',
      notes: '',
      classNameToAdd: '',
      testNameToAdd: '',
    }

    this.FormHandler = this.FormHandler.bind(this);
    this.handleStudySessionStartTime = this.handleStudySessionStartTime.bind(this);
    this.handleStudySessionEndTime = this.handleStudySessionEndTime.bind(this);
    this.addStudySessionSubmitBtnHandler = this.addStudySessionSubmitBtnHandler.bind(this);
    this.AddClassSubitBtnHandler = this.AddClassSubitBtnHandler.bind(this);
    this.AddTestSubmitBtnHandler = this.AddTestSubmitBtnHandler.bind(this);
    this.homePageShowClassInfo = this.homePageShowClassInfo.bind(this);
    this.homePageShowTestStudySessions = this.homePageShowTestStudySessions.bind(this);
    this.Duration = this.Duration.bind(this);
  }

  Duration(startArr, endArr){
    // console.log("times given to Duration", startArr, endArr)
    let duration = new Duration(new Date(0, 0, 0, startArr[0], startArr[1]), new Date(0, 0, 0, endArr[0], endArr[1]));
    return duration.toString("%Hs:%M")
  }

  addStudySessionSubmitBtnHandler = (event) => {
    event.preventDefault();

    let startTimeSplit = this.state.SelectedStartTimeValue.split(':');
    let endTimeSplit = this.state.SelectedEndTimeValue.split(':')

    const updateClasses = [...this.state.classes];
    debugger
    updateClasses[this.state.selectedClass].test[this.state.selectedTest].studySession.push({
      studySessionNum: updateClasses[this.state.selectedClass].test[this.state.selectedTest].studySession.length,
      startTime: this.state.SelectedStartTimeValue,
      endTime: this.state.SelectedEndTimeValue,
      notes: this.state.notes,
      studyDuration: this.Duration(startTimeSplit, endTimeSplit)

    })

    this.setState({
      classes: updateClasses
    })
  }

  handleStudySessionEndTime(value) {
    this.setState({ 
      endTimeValue: value,
      // [value.target.name]: value,
      SelectedEndTimeValue: value && value.format('HH:mm')
    });
  }

  handleStudySessionStartTime(value) {
    this.setState({ 
      startTimeValue: value,
      // [event.target.name]: value && value.format('HH:mm')
      SelectedStartTimeValue: value && value.format('HH:mm')
    });
  }

  homePageShowTestStudySessions(classIdx, testIdx){
    let updateClasses = [...this.state.classes]
    updateClasses[classIdx].test[testIdx].homePageShowStudySessions = !updateClasses[classIdx].test[testIdx].homePageShowStudySessions

    this.setState({
      classes: updateClasses
    })
  }

  homePageShowClassInfo(idx){
    let updateClasses = [...this.state.classes]
    updateClasses[idx].homePageShowClassInfo = !updateClasses[idx].homePageShowClassInfo

    this.setState({
      classes: updateClasses
    })
  }

  AddTestSubmitBtnHandler(event) {
    event.preventDefault();
    let updateClasses = this.state.classes;

    updateClasses[this.state.selectedClass].test.push({
      testName: this.state.testNameToAdd,
      studySession: [], 
    })

    this.setState({
      classes: updateClasses,
      testNameToAdd: '',
    })
  };

  AddClassSubitBtnHandler(event) {
    event.preventDefault();
    const updateClasses = [...this.state.classes];
    updateClasses.push({
      classTitle: this.state.classNameToAdd,
      test:[],
      homePageShowClassInfo: false,
    })

    this.setState({
      classes: updateClasses,
      classNameToAdd: ''
    })
  }

  FormHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render(){
    return (
      <BrowserRouter>
        <div>
          <Nav/>
          <Switch>
            <Route 
              exact
              path='/' 
              render={(props) => 
              <Home
                classList={this.state.classes}
                homePageShowClassInfo={this.homePageShowClassInfo}
                homePageShowTestStudySessions={this.homePageShowTestStudySessions}
              />}
            />
            <Route 
              path='/addstudysession' 
              render={(props) => 
              <AddStudySession 
              classes={this.state.classes}
              tests={this.state.classes[this.state.selectedClass].test}
              startTimeValue={this.state.startTimeValue}
              endTimeValue={this.state.endTimeValue}
              handleStudySessionStartTime={this.handleStudySessionStartTime}
              handleStudySessionEndTime={this.handleStudySessionEndTime}
              FormHandler={this.FormHandler}
              addStudySessionSubmitBtnHandler={this.addStudySessionSubmitBtnHandler}
              // EndTimeValue ={this.state.SelectedEndTimeValue}
              />}
            />
            <Route
              path='/addclass'
              render={(props) => 
              <AddClass 
                FormHandler={this.FormHandler}
                AddClassSubitBtnHandler={this.AddClassSubitBtnHandler}
              />}
            />
            <Route
              path='/addtest'
              render={(props) => 
              <AddTest
                classes={this.state.classes}
                FormHandler={this.FormHandler}
                AddTestSubmitBtnHandler={this.AddTestSubmitBtnHandler}
              />}
            />

            <Route
              path='/AddGrade'
              render={(props) => 
              <AddGrade/>}
            />  
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
