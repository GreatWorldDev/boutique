<template>
  <div class="flex mb-10 lg:flex-row flex-col">
    <h4 class="flex-shrink-0 mb-12">Select Image File</h4>
    <div class="flex justify-center w-full">
      <div class="flex items-center justify-center w-full max-w-xl">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full py-6 border-4 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div
            class="flex flex-col items-center justify-center pt-5 pb-6"
            @dragover.prevent="onUploadDragoverEvent($event)"
            @drop.prevent="onUploadDropEvent($event)"
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02"
                stroke="#9CA3AF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p class="mt-3 mb-2 text-md text-gray-500 dark:text-gray-400">
              <span class="font-semibold text-[#F59737]">Upload a file</span>
              or drag and drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            @change="handleUpload"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export default defineComponent({
  name: "ImageUpload",
  data() {
    return {
      pageX: 0,
      pageY: 0,
      uploadDragoverTracking: false,
      uploadDragoverEvent: false,
    };
  },
  methods: {
    handleUpload: function (event: Event) {
      let files =
        (event as HTMLInputEvent).target.files ||
        (event as DragEvent).dataTransfer?.files;
      if (!files?.length) return;
      store.dispatch("addImage", files[0]);
    },
    onUploadDragoverEvent(e: DragEvent) {
      this.uploadDragoverEvent = true;
      this.uploadDragoverTracking = true;
      this.pageX = e.pageX;
      this.pageY = e.pageY;
    },
    onUploadDropEvent(e: DragEvent) {
      this.uploadDragoverEvent = false;
      this.uploadDragoverTracking = false;
      this.pageX = 0;
      this.pageY = 0;
      this.droppedFiles(e);
    },
    droppedFiles(e: DragEvent) {
      let droppedFiles = e.dataTransfer?.files;

      if (!droppedFiles) return;

      store.dispatch("addImage", droppedFiles[0]);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
