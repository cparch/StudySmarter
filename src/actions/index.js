export const formHandler = (event) => {
  return {
    type: 'FORM_HANDLER',
    payload: event
  }
}

export const studySessionStartTime = (startTimeValue) => {
  return {
    type: 'START_TIME',
    payload: startTimeValue
  }
}

export const sideDrawerToggle = () => {
  return {
    type: 'SIDE_DRAWER_TOGGLE'
  }
}

export const submitAcknowledged = () => {
  return {
    type: 'SUBMIT_ACKNOWLEDGED'
  }
}

export const showSubmitMessage = () => {
  return {
    type: 'SHOW_SUBMIT_MESSAGE'
  }
}