<template>
    <div class="feed-container">
        <NewPost />
    </div>
</template>

<script>
import NewPost from './FeedContent/NewPost.vue'

export default {
    name: 'Feed',
    components: { NewPost }
}
</script>

<style>
    .feed-container {
        width: 85%;
        background: var(--beau);
        margin: 0 auto;
        border-radius: 30px;
        padding: 10px;
        margin-top: 10px;
    }
</style>