<template>
    <div class="post-container">
        <h1>Add A New Post</h1>
        <textarea
            name="newPost" 
            placeholder="New post..." 
            v-model="newPost" 
            maxlength="500"
            wrap="soft"
        />
        <div class="actions">
            <!-- Attachment -->
            <i class="fas fa-paperclip fa-3x"></i>
            <!-- Submit Button -->
            <button class="button">Submit</button>
        </div>
        <p class="character-count">Character Count: <span>{{ charCount }}</span>/500</p>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
    name: 'NewPost',
    setup() {
        const newPost = ref('')
        const charCount = ref(0)

        watch(newPost, () => {
            charCount.value = newPost.value.length
        })

        return { newPost, charCount }
    }
}
</script>

<style scoped>
    .post-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        font-family: 'Fira Sans', sans-serif;
        font-size: 60px;
        margin-bottom: 10px;
    }

    .actions {
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    textarea {
        width: 65%;
        height: 100px;
        resize: none;
        border-radius: 30px;
        text-indent: 15px;
        background-color: var(--white);
        font-size: 16px;
    }

    button {
        width: 200px;
        height: 50px;
    }

    i {
        margin-right: 10px;
    }

    .character-count {
        font-size: 24px;
    }

@media screen and (max-width: 960px) {
}

@media screen and (max-width: 768px) {

}

@media screen and (max-width: 600px) {
    h1 {
        font-size: 30px;
    }

    textarea {
        width: 85%;
    }

    button {
        width: 150px;
        height: 30px;
    }

    i {
        font-size: 2em;
    }

    .character-count {
        font-size: 20px;
    }
}
</style>