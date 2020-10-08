<template>
  <q-page style="min-height: 500px; position:inherit;">
    <div class="row fit  wrap justify-end items-start content-start">

      <div class="col-md-5">
        <q-list>
          <q-item-label header>My Students</q-item-label>

          <q-item
            clickable
            v-ripple
          >

            <q-item-section>
              <q-item-label lines="1">U16NASCSC199</q-item-label>

            </q-item-section>

          </q-item>

          <q-item
            clickable
            v-ripple
          >

            <q-item-section>
              <q-item-label lines="1">U16NASCSC122</q-item-label>

            </q-item-section>

          </q-item>
        </q-list>

      </div>
      <div class="col-5 q-pa-md">
        <q-form
          @submit="submitForm"
          class="q-gutter-md"
        >
          <q-input
            square
            outlined
            v-model="fullName"
            label="Full name *"
            hint="Name and surname"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            square
            outlined
            v-model="regNo"
            label="Reg No *"
            hint="Registration Number"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-file
            square
            outlined
            bottom-slots
            v-model="photos"
            label="Photographs"
            counter
            style="width:inherit;"
          >
            <template v-slot:prepend>
              <q-icon
                name="cloud_upload"
                @click.stop
              />
            </template>
            <template v-slot:append>
              <q-icon
                name="create_new_folder"
                @click.stop="photos = null"
                class="cursor-pointer"
              />
            </template>

            <template v-slot:hint>
              File Must be a zip file
            </template>
          </q-file>

          <div>
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
              text-color="black"
              :loading="trainning"
            />

          </div>
        </q-form>
      </div>
    </div>

  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StudentsPage',
  data () {
    return {
      photos: null,
      regNo: '',
      fullName: '',
      trainning: false

    }
  },
  methods: {
    submitForm: function () {
      var bodyFormData = new FormData()
      bodyFormData.set('full_name', this.fullName)
      bodyFormData.set('reg_no', this.regNo)
      bodyFormData.append('photos', this.photos)
      this.trainning = true
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/student/create',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((response) => {
          // handle success
          this.trainning = false
          console.log(response)
        })
        .catch((response) => {
          // handle error
          this.trainning = false
          console.log(response)
        })
    }
  }

}
</script>
