<template>
<div id="container">
      <div style="height: 88vh; position: relative;">
    <n-layout position="absolute">
      <n-layout-header bordered
        >User Information</n-layout-header
      >
      <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px;" >
        <n-layout-sider bordered content-style="padding: 24px;">
          <n-space :vertical="true" align="center" justify="center">
            <div v-if="profile.state.url">
              <n-avatar :round="true" :src="profile.state.url" :size="200"></n-avatar>
            </div>
            <div v-else>
              <n-avatar :round="true" src="https://cdn-icons-png.flaticon.com/512/147/147144.png" :size="200" ></n-avatar>
            </div>
                <!-- Upload New Image -->
                <form id="avatar-form">
                  <label>Upload A New Avatar Below</label>
                  <input type="file" name="avatar" id="avatar" accept="image/*" @change="handleAvatarUpload">
                  <!-- Error Handling -->
                  <div v-if="profile.state.error || fileError">
                    {{ profile.state.error }}
                    {{ fileError }}
                  </div>
                </form>
          </n-space>
        </n-layout-sider>
        <n-layout content-style="padding: 24px;" :native-scrollbar="true">
          <!-- Update Username -->
          <n-layout>
            <n-layout-header> 
              <button @click="profile.methods.editUserName">
                Update Profile Name
              </button>
            </n-layout-header>
            <n-layout-content v-if="profile.state.editUsername">
                <form class="profile-update" @submit.prevent="profile.methods.updateUsername(updateUsername)">
                  <input type="text" class="profile-update-input" v-model="updateUsername">
                  <button>Save</button>
                </form>
            </n-layout-content>
            <n-layout-content v-else>
              <n-h3> {{ user.displayName }} </n-h3>
            </n-layout-content>
          </n-layout>
          <!-- Update Email -->
          <n-layout>
            <n-layout-header>
              <button @click="profile.methods.editEmail">
                Update Email Address
              </button>
            </n-layout-header>
            <n-layout-content v-if="profile.state.editEmail">
                <form class="profile-update" @submit.prevent="profile.methods.updateEmail(updateEmail)">
                  <input type="email" class="profile-update-input" v-model="updateEmail">
                  <button>Save</button>
                </form>
            </n-layout-content>
            <n-layout-content v-else>
              <n-h3> {{ user.email }} </n-h3>
            </n-layout-content>
          </n-layout>
          <!-- Update Password -->
          <n-layout>
            <n-layout-header>
              <button @click="profile.methods.editPassword">
                Update Your Password
              </button>
            </n-layout-header>
            <n-layout-content v-if="profile.state.editPassword">
                <form class="profile-update" @submit.prevent="profile.methods.updatePassword(updatePassword)">
                  <input type="password" class="profile-update-input" v-model="updatePassword">
                  <button>Save</button>
                </form>
            </n-layout-content>
          </n-layout>
          <!-- Delete User -->
          <n-layout>
            <n-layout-header>
              <button @click="handleProfileDelete">
                Delete User Profile
              </button>
            </n-layout-header>
          </n-layout>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</div>
</template>

<script>
import {
  NAvatar,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NH2,
  NPageHeader,
  NH3,
  NH1,
  NLayoutContent,
  NButton,
  NUploadDragger,
  NIcon,
  NText,
  NP,
  NUpload,
  NSpace,
  NLayoutFooter,
  NInput,
  NInputGroup,
  NInputGroupLabel
} from 'naive-ui'

import {onBeforeMount, ref} from 'vue'
import { inject } from '@vue/runtime-core'
import getUser from '@/composables/getUser.js'
import { useRouter } from 'vue-router'
import useLogout from '@/composables/signout.js'

export default {
  name: 'User',
  components: { 
    NLayout, 
    NAvatar,   
    NLayoutSider,
    NLayoutHeader,
    NH2,
    NPageHeader,
    NH3,
    NH1,
    NLayoutContent,
    NLayoutContent,
    NButton,
    NUploadDragger,
    NIcon,
    NText,
    NP,
    NUpload,
    NSpace,
    NLayoutFooter,
    NInput,
    NInputGroup,
    NInputGroupLabel  
  },
  setup() {
    // References/Variables
    const file = ref(null)
    const fileError = ref(null)
    const updateUsername = ref('')
    const updateEmail = ref('')
    const updatePassword = ref('')
    const { profile } = inject('store')
    const { user } = getUser()
    const router = useRouter()
    const { logout } = useLogout()

    // Image Types Array
    const types = ['image/jpeg', 'image/png', 'image/jpg']

    onBeforeMount(async () => {
      await profile.methods.getUserImage()
    })

    // Event handlers
    const handleAvatarUpload = async (e) => {
      // Grab the first image selected
      const selected = e.target.files[0]

      // If there is a first file and its type matches
      if (selected && types.includes(selected.type)) {
        // Sell file ref to the image data
        file.value = selected
        fileError.value = null
        // Upload image
        await profile.methods.uploadImage(file.value)
      } else {
        file.value = null
        fileError.value = 'Please select an image file (.png or .jpeg)'
      }
    }

    const handleProfileDelete = async (e) => {
      const response = await logout()
      console.log(response)
      // await profile.methods.deleteUser()
      window.location = '/'
    }

    return { 
      profile, 
      handleAvatarUpload, 
      fileError, 
      profile, 
      user,
      updateUsername, 
      updateEmail, 
      updatePassword, 
      handleProfileDelete 
    }
  }
}
</script>

<style scoped>

#container {
  overflow: hidden;
}

.n-layout-header.n-layout-header--bordered {
  background-color: var(--munsell);
  color: var(--white);
  font-size: 30px;
  height: 64px; 
  padding-top: 5px;
  padding-left: 14px;
}

#avatar {
  width: 100% !important;
}

#avatar-form {
  font-family: 'Roboto', sans-serif;
}

#avatar-submit {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
}

#avatar-submit:hover {
  background-color: var(--white);
  color: var(--munsell);
  box-shadow: 5px 5px 5px var(--beau);
}

button {
  font-size: 18px;
}

button:hover {
  background-color: var(--white);
  color: var(--munsell);
}

.profile-update {
    display: inline;
    background-color: var(--white);
    height: 100%;
    width: 100%;
    padding: 20px 10px;
    opacity: .9;
    border-radius: 20px 20px;
}

.profile-update-input {
    display: inline;
    margin: 10px 10px 10px 0px;
    box-sizing: border-box;
    padding: 10px;
    border: 2px solid var(--pewter);
    border-radius: 6px 6px;
    box-shadow: 3px 3px rgba(117, 119, 128, 0.5);
    outline: none;
    width: 40%;
    font-family: 'Roboto', sans-serif;
}

.n-layout .n-layout--static-positioned {
  margin-bottom: 10px;
}

#save-button {

}
</style>