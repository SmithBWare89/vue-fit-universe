<template>
  <div id="chatInput">
    <textarea v-if="isPending" disabled/>
    <textarea
      required
      autofocus="true"
      maxlength="180"
      v-model="message"
      wrap="soft"
      placeholder="Enter new comments here and press enter to submit!"
      @keypress.enter="sendToCollection"
    />
    <div class="error" v-if="error">{{ error }}</div>
    <div class="charCount">Character Count: <span>{{ charCount }}</span>/180</div>
  </div>
</template>

<script>
// Composables
import useCollection from "../../composables/useCollection";
import getUser from "../../composables/getUser";

// Vue Imports
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

// Firebase Config Export
import { timestamp } from "../../firebase/config";

export default {
  name: "NewChat",
  setup() {
    // Variables
    const charCount = ref(0);
    const message = ref("");
    const { user } = getUser();
    const { error, addDoc, isPending } = useCollection();

    // Watches for change in comment length and updates character count
    // At the bottom of the input
    watchEffect(() => {
      charCount.value = message.value.length;
    }, message.value.length);


    // Async function to send data to server
    const sendToCollection = async () => {
      // Create context object of comment data and user infor
      const comment = {
        name: user.value.displayName,
        comment: message.value,
        createdAt: timestamp(),
      };

      // Send data to be added
      await addDoc('comments', comment);

      // If there is no error then reset the chat input to blank
      if (!error.value) {
        message.value = "";
      }
    };

    return { charCount, message, sendToCollection, error, isPending };
  },
};
</script>

<style scoped>
#chatInput {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #ffffff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: 2px solid var(--beau);
}

textarea {
  width: 95%;
  margin: 10px auto 0px auto;
  border-radius: 10px 10px;
  outline: none;
  border: none;
  font-size: 12px;
  padding: 10px 10px 0px 10px;
  resize: none;
  color: #22181c;
  font-family: 'Roboto', sans-serif;
}

textarea::placeholder {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: left;
  color: #22181c;
  font-family: 'Roboto', sans-serif;
}

.charCount {
  text-align: left;
  margin: 0px auto;
  padding-left: 15px;
  padding-bottom: 5px;
  font-size: 12px;
  color: #22181c;
  font-family: 'Fira Sans', sans-serif;
}

@media screen and (max-width: 600px) {
  textarea {
    width: 90%;
  }
  .charCount {
    font-size: 10px;
  }
}
</style>