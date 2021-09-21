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
            <n-avatar round="true" src="https://cdn-icons-png.flaticon.com/512/147/147144.png" :size="200" ></n-avatar>
              <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f">
                <n-upload-dragger>
                  <div style="margin-bottom: 12px;">
                    <n-icon size="48" :depth="3">
                      <archive-icon />
                    </n-icon>
                  </div>
                  <n-text style="font-size: 16px;"
                    >Click or drag file to this area to upload</n-text
                  >
                  <n-p depth="3" style="margin: 8px 0 0 0;"
                    >Strictly prohibit from uploading sensitive information. For example, your
                    deposit card's password or your credit card's expiration date and security
                    code.</n-p
                  >
                </n-upload-dragger>
              </n-upload>
          </n-space>
        </n-layout-sider>
        <n-layout content-style="padding: 24px;" :native-scrollbar="true">
          <n-h2>Pingshan Road</n-h2>
          <n-h2>Pingshan Road</n-h2>
          <n-h2>Pingshan Road</n-h2>
          <n-h2>Pingshan Road</n-h2>

        </n-layout>
      </n-layout>
      <n-layout-footer
        bordered
        position="absolute"
        style="height: 64px; padding: 24px;"
      >
        城府路
      </n-layout-footer>
    </n-layout>
  </div>
</div>
</template>

<script>
import useStorage from '@/composables/useStorage.js'
import {
  NAvatar,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NH2,
  NLayoutContent,
  NButton,
  NUploadDragger,
  NIcon,
  NText,
  NP,
  NUpload
} from 'naive-ui'
import profile from '../assets/profile.jpg'

export default {
  name: 'User',
  components: { 
  NLayout, 
  NAvatar,   
  NLayoutSider,
  NLayoutHeader,
  NH2,
  NLayoutContent,
  NLayoutContent,
  NButton,
  NUploadDragger,
  NIcon,
  NText,
  NP,
  NUpload  },
  setup() {
    const { filePath, error, url, uploadImage } = useStorage()

    return { profile }
  }
}
</script>

<style>

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


</style>