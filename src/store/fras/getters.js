/*
export function someGetter (state) {
}
*/
export function nextLectureID (state) {
  return Math.max(...state.lectures.map(lecture => lecture.id)) + 1
}
export function nextAttendanceID (state) {
  return Math.max(...state.attendance.map(att => att.id)) + 1
}

export function lecturesGetter (state) {
  return state.lectures
}

export function lectureGetter (state) {
  return (lectureID) => state.lectures.find(lecture => lecture.id === lectureID)
}

export function attendanceGetter (state) {
  return (lectureID) => state.attendance.filter(attendance => attendance.lecture_id === lectureID)
}

export function studentAttendanceGetter (state) {
  return (studentRegNo, lectureID) => state.attendance.find(att => att.student_reg_no === studentRegNo && att.lecture_id === lectureID)
}

export function activeLectureGetter (state) {
  return state.activeLecture
}
