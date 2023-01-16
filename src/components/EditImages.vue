<template>
  <div>
    <h3>Edit images</h3>
    <p>See and edit all POI images.</p>
    <hr class="my-5" />
    <div class="flex flex-wrap -mx-4" id="image-list">
      <div
        v-for="image in images"
        :key="image.id"
        draggable="true"
        :id="image.id.toString()"
        @drag="handleDrag"
        @dragend="handleDrop"
        class="draggable-item lg:w-1/4 md:w-1/3 sm:w-1/2 w-full px-4 mb-8 cursor-move"
      >
        <ImageItem
          :id="image.id"
          :copyright="image.copyright"
          :license="image.license"
          :url="image.url"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IImage } from "@/model";
import store from "@/store";
import { defineComponent } from "vue";
import ImageItem from "./ImageItem.vue";

export default defineComponent({
  components: { ImageItem },
  name: "EditImages",
  data() {
    return {
      swapIndex: -1,
      selectedIndex: -1,
    };
  },
  computed: {
    images() {
      return store.state.images;
    },
  },
  methods: {
    handleDrag: function (event: MouseEvent) {
      const selectedItem = (event.target as HTMLElement).parentNode?.parentNode;
      if (!selectedItem) return;
      const list = document.getElementById("image-list"),
        x = event.clientX,
        y = event.clientY;

      let swapItem = (
        document.elementFromPoint(x, y) === null
          ? selectedItem
          : document.elementFromPoint(x, y)
      )?.parentNode?.parentNode as Node;

      (selectedItem as HTMLDivElement).classList.add("drag-sort-active");

      if (list && list === swapItem?.parentNode) {
        this.swapIndex = this.images
          .map((x) => x.id)
          .indexOf(Number((swapItem as HTMLDivElement).id));
        this.selectedIndex = this.images
          .map((x) => x.id)
          .indexOf(Number((selectedItem as HTMLDivElement).id));
      }
    },
    handleDrop: function (event: DragEvent) {
      (
        (event.target as HTMLElement).parentNode?.parentNode as HTMLDivElement
      ).classList.remove("drag-sort-active");
      if (this.selectedIndex > -1 && this.swapIndex > -1) {
        const newList: IImage[] =
          this.swapIndex < this.selectedIndex
            ? [
                ...this.images.slice(0, this.swapIndex),
                this.images[this.selectedIndex],
                ...this.images.slice(this.swapIndex, this.selectedIndex),
                ...this.images.slice(this.selectedIndex + 1),
              ]
            : this.swapIndex === this.selectedIndex + 1
            ? [
                ...this.images.slice(0, this.selectedIndex),
                this.images[this.swapIndex],
                this.images[this.selectedIndex],
                ...this.images.slice(this.swapIndex + 1),
              ]
            : [
                ...this.images.slice(0, this.selectedIndex),
                ...this.images.slice(
                  this.selectedIndex + 1,
                  this.swapIndex + 1
                ),
                this.images[this.selectedIndex],
                ...this.images.slice(this.swapIndex + 1),
              ];
        store.dispatch("reorderImages", newList);
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.drag-sort-active {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    backdrop-filter: blur(3px);
    z-index: 1;
  }
}
</style>
