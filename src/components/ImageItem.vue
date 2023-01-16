<template>
  <div class="w-full flex flex-col relative group">
    <img
      :src="url"
      class="aspect-ratio object-cover w-full h-48 mb-2 rounded-lg"
    />
    <h4>{{ copyright }}</h4>
    <p>{{ license ?? "-" }}</p>
    <div class="absolute top-3 right-4 hidden group-hover:flex">
      <div
        class="w-6 h-6 rounded-md bg-white flex justify-center items-center cursor-pointer mr-2"
        @click="show = true"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5858 0.585786C11.3668 -0.195262 12.6332 -0.195262 13.4142 0.585786C14.1953 1.36683 14.1953 2.63316 13.4142 3.41421L12.6213 4.20711L9.79289 1.37868L10.5858 0.585786Z"
            fill="#F59737"
          />
          <path
            d="M8.37868 2.79289L0 11.1716V14H2.82842L11.2071 5.62132L8.37868 2.79289Z"
            fill="#F59737"
          />
        </svg>
      </div>
      <div
        class="w-6 h-6 rounded-md bg-white flex justify-center items-center cursor-pointer"
        @click="handleRemove"
      >
        <svg
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6 0C5.62123 0 5.27497 0.214002 5.10557 0.552786L4.38197 2H1C0.447715 2 0 2.44772 0 3C0 3.55228 0.447716 4 1 4L1 14C1 15.1046 1.89543 16 3 16H11C12.1046 16 13 15.1046 13 14V4C13.5523 4 14 3.55228 14 3C14 2.44772 13.5523 2 13 2H9.61804L8.89443 0.552786C8.72504 0.214002 8.37877 0 8 0H6ZM4 6C4 5.44772 4.44772 5 5 5C5.55228 5 6 5.44772 6 6V12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12V6ZM9 5C8.44771 5 8 5.44772 8 6V12C8 12.5523 8.44771 13 9 13C9.55229 13 10 12.5523 10 12V6C10 5.44772 9.55229 5 9 5Z"
            fill="#6B7280"
          />
        </svg>
      </div>
    </div>
    <div
      v-show="show"
      id="edit-image-modal"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex justify-center items-center bg-gray-500 bg-opacity-75"
      @click="show = false"
    >
      <div class="relative w-full h-full max-w-md md:h-auto">
        <!-- Modal content -->
        <div
          class="relative bg-white rounded-lg shadow dark:bg-gray-700"
          @click="
            (e) => {
              e.stopPropagation();
            }
          "
        >
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            @click="show = false"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Edit image data
            </h3>
            <form class="space-y-6" action="#">
              <div>
                <label
                  for="copyright"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Author</label
                >
                <input
                  type="text"
                  name="copyright"
                  id="copyright"
                  v-model="newCopyright"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Type the author"
                  required
                />
              </div>
              <div>
                <label
                  for="license"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >License</label
                >
                <input
                  type="text"
                  name="license"
                  id="license"
                  v-model="newLicense"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Type the license"
                  required
                />
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="handleEdit"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ImageItem",
  props: {
    url: String,
    id: Number,
    license: String,
    copyright: String,
  },
  data() {
    return {
      show: false,
      newLicense: this.license,
      newCopyright: this.copyright,
    };
  },
  methods: {
    handleEdit(e: Event) {
      e.preventDefault();
      store.dispatch("editImage", {
        id: this.id,
        body: { license: this.newLicense, copyright: this.newCopyright },
      });
      this.show = false;
    },
    handleRemove() {
      store.dispatch("removeImage", this.id);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
