<template>
    <div class="feed-container">
        <NavBar />
        <Chatview />
        <NewChat />
    </div>
</template>

<script>
import Chatview from './FeedContent/Chaview.vue';
import NavBar from './FeedContent/NavBar.vue';
import NewChat from './FeedContent/NewChat.vue'

export default {
    name: 'Feed',
    components: { Chatview, NavBar, NewChat },
    setup() {
        
    }
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