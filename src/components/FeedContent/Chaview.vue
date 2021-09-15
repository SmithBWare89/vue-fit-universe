<template>
  <div id="chatView">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="comments" ref="commentRef">
      <div
        v-for="document in formattedDocuments"
        :ref="document.id"
        :key="document.id"
        class="comment"
      >
        <span class="chatTimestamp">{{ document.createdAt }} ago</span>
        <span class="chatUsername">{{ document.name }}</span>
        <span class="chatComment">{{ document.comment }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// Composable
import getCollection from "../../composables/getCollection";

// Vue Imports
import { formatDistanceToNow } from "date-fns";
import { computed, ref } from "@vue/reactivity";
import { onUpdated } from "@vue/runtime-core";

export default {
  name: "ChatView",
  setup() {
    // Variables
    const { error, documents } = getCollection('comments');
    // Take the comments collection, map over each comment
    // and return them with updated formatting
    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((document) => {
          let time = formatDistanceToNow(document.createdAt.toDate());
          return { ...document, createdAt: time };
        });
      }
    });
    
    // A reference to the commentsRef reference attribute
    const commentRef = ref(null);

    // Whenever the DOM is updated scroll to the bottom of the chat window
    onUpdated(() => {
      commentRef.value.scrollTop = commentRef.value.scrollHeight;
    });

    
    return { documents, error, formattedDocuments, commentRef };
  },
};
</script>

<style>
#chatView {
  padding: 5px 20px 5px 20px;
  background: #dbdbdb;
  text-align: left;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}

.comment {
  margin: 18px 0;
}

.chatTimestamp {
  display: block;
  font-size: 13px;
  color: #757780;
  font-family: 'Roboto', sans-serif;
}

.chatUsername {
  font-weight: 800;
  margin-right: 6px;
}

.comments {
    overflow: auto;
    max-height: 400px;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.comments::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.comments {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

@media screen and (max-width: 600px) {
  .comments {
    max-height: 400px;
  }
}
</style>