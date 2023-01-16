import { createStore } from "vuex";
import { IImage } from "@/model";

const BACKEND_URL = "https://test-task.trip.boutique/api/images";
const myHeaders = new Headers();
myHeaders.append("x-api-key", "98372379-84f1-4a52-b120-fe7623768fd4"); // for security it can be used process.env in the production

export default createStore<{ images: IImage[] }>({
  state: {
    images: [],
  },
  getters: {},
  mutations: {
    fetchImages(state, images) {
      state.images = images;
    },
    addImage(state, image) {
      state.images = [...state.images, image];
    },
    removeImage(state, imageId) {
      state.images = state.images.filter((image) => image.id !== imageId);
    },
    editImage(state, updatedImage) {
      state.images = state.images.map((image) =>
        image.id === updatedImage.id ? updatedImage : image
      );
    },
  },
  actions: {
    fetchImages({ commit }) {
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch(BACKEND_URL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          commit("fetchImages", result);
        })
        .catch((error) => {
          commit("fetchImages", []);
          console.log("error", error);
        });
    },
    addImage({ commit }, file) {
      const formData = new FormData();
      formData.append("image", file);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
      };
      fetch(BACKEND_URL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          commit("addImage", result);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    editImage({ commit }, payload) {
      const putHeaders = new Headers();
      putHeaders.append("x-api-key", "98372379-84f1-4a52-b120-fe7623768fd4"); // for security it can be used process.env in the production
      putHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "PUT",
        headers: {
          "x-api-key": "98372379-84f1-4a52-b120-fe7623768fd4",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.body),
      };

      fetch(`${BACKEND_URL}/${payload.id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          commit("editImage", result);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    removeImage({ commit }, imageId) {
      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
      };

      fetch(`${BACKEND_URL}/${imageId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          commit("removeImage", imageId);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    reorderImages({ commit }, newImages) {
      const putHeaders = new Headers();
      putHeaders.append("x-api-key", "98372379-84f1-4a52-b120-fe7623768fd4"); // for security it can be used process.env in the production
      putHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "PUT",
        headers: {
          "x-api-key": "98372379-84f1-4a52-b120-fe7623768fd4", // for security it can be used process.env in the production
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images: newImages.map((x: IImage) => x.id) }),
      };

      fetch(`${BACKEND_URL}/re-order`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          commit("fetchImages", newImages);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
  modules: {},
});
