<template>
  <h3>Add images</h3>
  <p>Choose from 3 options to add new images.</p>
  <hr class="my-5" />
  <ImageUpload />
  <EditImages />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EditImages from "./components/EditImages.vue";
import ImageUpload from "./components/ImageUpload.vue";
import store from "./store";

export default defineComponent({
  name: "App",
  components: {
    ImageUpload,
    EditImages,
  },
  mounted() {
    store.dispatch("fetchImages");
  },
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #111827;
  margin: 60px auto;
  max-width: 1400px;
  width: 100%;
  padding: 48px 10%;
}
</style>
