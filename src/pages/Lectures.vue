<template>
  <q-page style="min-height: 500px; position:inherit;">
    <div class="row fit  wrap justify-end items-start content-start">

      <div class="col-md-5">
        <q-list>
          <q-item-label header>Lectures</q-item-label>
          <div
            v-for="lecture in lectures"
            :key="lecture.id"
          >
            <q-item
              clickable
              @click="active_lecture=lecture.id"
            >

              <q-item-section>
                <q-item-label lines="1">{{lecture.title}}</q-item-label>
                <q-item-label
                  caption
                  lines="2"
                >
                  <span class="text-weight-bold">{{lecture.description}}</span>
                </q-item-label>
              </q-item-section>

              <q-item-section
                side
                top
              >
                {{lecture.date_time}}
              </q-item-section>
            </q-item>

            <q-separator inset="item" />
          </div>

        </q-list>

      </div>
      <div class="col-5 q-pl-md">
        <q-list>
          <q-item-label header>Students in Attendance</q-item-label>

          <div
            v-for="a in attendance(active_lecture)"
            :key="a.id"
          >
            <q-item>
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

            <q-separator inset="item" />
          </div>
        </q-list>

      </div>
    </div>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LecturesPage',
  data () {
    return {
      active_lecture: null
    }
  },
  computed: {
    ...mapGetters('fras', { lectures: 'lecturesGetter', attendance: 'attendanceGetter', lecture: 'lectureGetter' })

  }

}
</script>
