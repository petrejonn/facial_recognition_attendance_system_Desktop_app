export default function () {
  return {
    activeLecture: 1,
    lectures: [{
      id: 1,
      title: 'CSC 431 Lecturer',
      description: 'Algorithm and Design lecture for 400 Levels',
      date_time: '2020-07-30 00:00'
    },
    {
      id: 2,
      title: 'CSC 3 Lecturer',
      description: 'Database Design',
      date_time: '2020-07-30 12:00'
    }
    ],
    attendance: [
      {
        id: 1,
        student_reg_no: 'U16NASCSC199',
        lecture_id: 1,
        date_time: '2020-07-30 12:00'
      },
      {
        id: 2,
        student_reg_no: 'U16NASCSC122',
        lecture_id: 1,
        date_time: '2020-07-30 12:01'
      }
    ]

  }
}
