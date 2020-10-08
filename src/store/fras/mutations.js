/*
export function someMutation (state) {
}
*/

export function setActiveLecture (state, activeLecture) {
  state.activeLecture = activeLecture
}

export function addLecture (state, data) {
  state.lectures.push(data)
}

export function addAttendance (state, data) {
  state.attendance.push(data)
}
