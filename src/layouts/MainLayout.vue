<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <q-page-sticky position="top-left">
        <div
          class="bg-primary window-height shadow-1"
          style="max-width: 300px;"
        >
          <q-list>
            <q-item>
              <q-item-section>
                <h6>Attendance System</h6>
              </q-item-section>

            </q-item>

            <q-item
              clickable
              v-ripple
              :active="link === 'report'"
              @click="link = 'report'"
              class="text-black"
              to="/attendance"
            >
              <q-item-section avatar>
                <q-icon name="camera" />
              </q-item-section>
              <q-item-section>
                Take Attendance
              </q-item-section>

            </q-item>

            <q-item
              clickable
              v-ripple
              :active="link === 'report'"
              @click="link = 'report'"
              class="text-black"
              to="/lectures"
            >
              <q-item-section avatar>
                <q-icon name="book" />
              </q-item-section>
              <q-item-section>
                Lectures
              </q-item-section>

            </q-item>
            <q-item
              clickable
              v-ripple
              :active="link === 'report'"
              @click="link = 'report'"
              class="text-black"
              to="/students"
            >
              <q-item-section avatar>
                <q-icon name="people" />
              </q-item-section>
              <q-item-section>
                Students
              </q-item-section>

            </q-item>

          </q-list>
        </div>
      </q-page-sticky>
      <div class="row justify-end">
        <q-space />
        <q-btn
          dense
          flat
          icon="minimize"
          @click="minimize"
        />
        <q-btn
          dense
          flat
          icon="crop_square"
          @click="maximize"
        />
        <q-btn
          dense
          flat
          icon="close"
          @click="closeApp"
        />
      </div>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  methods: {
    minimize () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximize () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    },

    closeApp () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    }
  }
}
</script>
