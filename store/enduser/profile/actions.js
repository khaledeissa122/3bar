import { auth } from "@/services/firebase";
import { storageByChange } from "@/services/firebase";
import firebase from "firebase/app";
import Cookie from "js-cookie";
import { createKeywords } from "@/helpers/methods";
import {
  addCollection,
  getCollectionwithid,
  UpdateCollection
} from "@/services/firestore/methods.js";
import { uplaodTostorage } from "@/services/firestore/storage.js";

export default {
  async updateCoverImg({ commit, dispatch }, file) {
    try {
      if (file.file) {
        const imgObj = {};
        commit("partials/setLoading", true, { root: true });
        await uplaodTostorage(file)
          .then(imgUrl => {
            if (imgUrl) {
              let coverUrl = imgUrl.includes("cover");
              if (coverUrl) {
                imgObj["coverUrl"] = imgUrl;
              }
              let avatarUrl = imgUrl.includes("avatar");
              if (avatarUrl) {
                imgObj["avatarUrl"] = imgUrl;
              }
            }
            UpdateCollection("users", file.username, imgObj);
            commit("enduser/setUserData", imgObj, { root: true });
            commit("partials/setLoading", false, { root: true });

          })
          .catch(error => {
            this.$notifier.showMessage({
              content: "Error when uploading photo please try agian later",
              color: "error"
            });
          });
      }
    } catch {
      this.$notifier.showMessage({
        content: "Error when uploading photo please try agian later",
        color: "error"
      });
    } finally {
      commit("partials/setLoading", false, { root: true });
    }
  },
  async updateUserData({ commit }, data) {
    commit("partials/setLoading", true, { root: true });
    try {
      // const imgObj = {};
      await UpdateCollection("users", data.username, data)
        .then(res => {
          if (data.name) {
            const keywords = createKeywords(data.name);
            UpdateCollection("users", data.username, { keywords: keywords });
          }
          commit("enduser/setUserData", data, { root: true });
        })
        .catch(error => {
          console.log("Error in update data ");
        });
    } catch {
      console.log(" Error in  update data ");
      commit("partials/setLoading", false, { root: true });
    } finally {
      commit("partials/setLoading", false, { root: true });
    }
  }

};
