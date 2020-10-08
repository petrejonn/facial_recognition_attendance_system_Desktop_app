<template>
  <q-page style="min-height: 500px; position:inherit;">
    <div class="row fit  wrap justify-end items-start content-start">

      <div class="col-md-6">
        <div class="row">
          <video
            ref="video"
            id="video"
            height="400"
            width="640"
            autoplay
            class="bg-black"
          ></video>
          <canvas
            ref="canvas"
            id="canvas"
            style="display:none;"
            height="400"
            width="640"
          ></canvas>

        </div>
        <q-btn
          class="bg-primary q-mt-sm"
          label="Start Attendance"
          @click="startAttendance()"
        />
        <q-btn
          class="bg-primary q-mt-sm q-ml-sm"
          label="Stop Attendance"
          @click="stopAttendance()"
        />
        <div class="row">
          <div class="col q-mt-md">
            <q-form
              @submit="submitLecture"
              class="q-gutter-md"
            >
              <q-input
                outlined
                square
                v-model="title"
                label="Lecture Title *"
                hint="Lecture Title"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                outlined
                square
                autogrow
                type="textarea"
                v-model="description"
                label="Lecture Description *"
                hint="Lecture Description"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <div>
                <q-btn
                  label="Submit"
                  type="submit"
                  color="primary"
                  text-color="black"
                />

              </div>
            </q-form>
          </div>
        </div>

      </div>
      <div class="col-4 q-pl-md">
        <div
          class="q-pa-md inline bg-green text-white  rounded-borders cursor-pointer"
          style="max-width: 300px"
          v-if="studentName"
        >
          {{studentName}} {{message}}
        </div>
        <q-list>
          <q-item-label header>Attendance List for {{lectureGetter(activeLectureGetter).title}} </q-item-label>

          <q-item
            clickable
            v-ripple
            v-for="a in attendanceGetter(activeLectureGetter)"
            :key="a.id"
          >

            <q-item-section>
              <q-item-label lines="1">{{a.student_reg_no}}</q-item-label>

            </q-item-section>

            <q-item-section
              side
              top
            >
              {{a.date_time}}
            </q-item-section>
          </q-item>

        </q-list>

      </div>
    </div>

  </q-page>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'IndexPage',
  data () {
    return {
      video: null,
      canvas: null,
      windowInterval: null,
      message: '',
      title: '',
      description: ''
    }
  },
  computed: {
    ...mapGetters('fras', ['nextLectureID', 'nextAttendanceID', 'activeLectureGetter', 'studentAttendanceGetter', 'attendanceGetter', 'lectureGetter']),
    studentName () {
      return this.response
    }
  },
  mounted () {
    this.video = this.$refs.video
    this.canvas = this.$refs.canvas
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.srcObject = stream
        this.video.play()
      })
    }
  },
  methods: {
    ...mapMutations('fras', ['setActiveLecture', 'addLecture', 'addAttendance']),
    startAttendance: function () {
      clearInterval(this.windowInterval)
      this.windowInterval = window.setInterval(this.recognize, 1000)
    },

    recognize: function () {
      var context = this.canvas.getContext('2d')
      context.drawImage(this.video, 0, 0, 640, 480)
      var dataURL = this.canvas.toDataURL('image/jpg')

      const today = new Date()
      const dateTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes()

      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/recognize',
        data: { img: dataURL }
      }).then((response) => {
        if (response.data !== 'unknown' && response.data !== 'processing...') {
          this.response = response.data
          if (this.studentAttendanceGetter(response.data, this.activeLectureGetter) == null) {
            this.addAttendance({ id: this.nextAttendanceID, lecture_id: this.activeLectureGetter, date_time: dateTime, student_reg_no: response.data })
          } else {
            this.message = 'your attendance has been recorded'
          }
        } else {
          console.log(response.data)
        }
      }, (response) => {
        //   console.log(error)
      })
    },
    submitLecture: function () {
      const today = new Date()
      const dateTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes()
      this.setActiveLecture(this.nextLectureID)
      this.addLecture({ id: this.nextLectureID, title: this.title, description: this.description, date_time: dateTime })
    },

    stopAttendance: function () {
      clearInterval(this.windowInterval)
    }

  },
  beforeDestroy () {
    clearInterval(this.windowInterval)
  }

}
</script>
