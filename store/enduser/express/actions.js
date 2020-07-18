import {
  addCollection,
  UpdateCollection,
  getCollectionwithid
} from "@/services/firestore/methods.js";
import { uplaodTostorage } from "@/services/firestore/storage.js";
import firebase from "firebase/app";

export default {
  async getUserBySearch({}, search) {
    const dataObj = [];
    const snap = await getCollectionwithid("users")
      .where("keywords", "array-contains", String(search))
      .get()
      .then(res => {
        let data = res.docs.map(doc => {
          dataObj.push(doc.data());
        });
      });
    return dataObj;
  },

  async sendMessage({ commit }, messageData) {
    try {
      commit("partials/setLoading", true, { root: true });
      if (messageData.image) {
        await uplaodTostorage(messageData.image)
          .then(imgUrl => {
            messageData.image = imgUrl;
            addCollection("message", messageData);
            commit("partials/setLoading", false, { root: true });
            this.$notifier.showMessage({
              content: "The message has been sent",
              color: "success"
            });
          })
          .catch(error => {
            this.$notifier.showMessage({
              content: "Error when uploading photo please try agian later",
              color: "error"
            });
          });
      }
      if (messageData.image == null) {
        addCollection("message", messageData);
        this.$notifier.showMessage({
          content: "The message has been sent",
          color: "success"
        });
      }
    } catch (err) {
      this.$notifier.showMessage({
        content: "Error when uploading photo please try agian later",
        color: "error"
      });
    } finally {
      commit("partials/setLoading", false, { root: true });
    }
  },
  async sendReply({ commit, state }, ReplyData) {
    try {
      commit("partials/setLoading", true, { root: true });
      if (ReplyData.messageId) {
        await UpdateCollection("message", ReplyData.messageId, {
          isReply: true
        }).then(doc => {
          let newMessages = [];
          state.userMessages.forEach((element, i) => {
            if (element.id != ReplyData.messageId) {
              newMessages.push(element);
            }
          });
          commit("setUserMessages", newMessages);
        });
        let reply = await addCollection("reply", ReplyData).then(function(
          docRef
        ) {
          addCollection("likes", {
            replyId: docRef.id,
            username: []
          });
        });
        this.$notifier.showMessage({
          content: "The reply has been sent",
          color: "success"
        });
      }
    } catch (err) {
      this.$notifier.showMessage({
        content: "Error when sending reply please try agian later",
        color: "error"
      });
    } finally {
      commit("partials/setLoading", false, { root: true });
    }
  },
  async getUserMessages({ commit, state }, username) {
    commit("partials/setLoading", true, { root: true });
    try {
      let messages = getCollectionwithid("message");
      return await messages
        .where("isReply", "==", username.reply)
        .where("receiversUsername", "array-contains", String(username.username))
        .orderBy("createdAt", "desc")
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            return false;
          } else {
            let messages = snapshot.docs.map(doc =>
              Object.assign({}, doc.data(), { id: doc.id })
            );
            commit("partials/setLoading", false, { root: true });
            return messages;
          }
        });
    } catch (error) {
      commit("partials/setError", error, { root: true });
      console.log(" Error!");
    } finally {
      commit("partials/setLoading", false, { root: true });
    }
  },

  async getPosts({ commit, state }, username) {
    commit("partials/setLoading", true, { root: true });
    try {
      return await getCollectionwithid("following")
        .where("followingOf", "==", String(username.username))
        .get()
        .then(res => {
          let following = res.docs.map(doc =>
            Object.assign({}, doc.data(), { id: doc.id })
          );
          let filteredFollowing = following[0].followings;
          let messages = getCollectionwithid("message");
          // return ;
          return messages
            .where("isReply", "==", username.reply)
            .where("receiversUsername", "array-contains-any", filteredFollowing)
            .orderBy("createdAt", "desc")
            .get()
            .then(snapshot => {
              if (snapshot.empty) {
                // console.log("this is return empty messages");
                return false;
              } else {
                let messages = snapshot.docs.map(doc =>
                  Object.assign({}, doc.data(), { id: doc.id })
                );
                commit("partials/setLoading", false, { root: true });
                return messages;
              }
            });
        });
    } catch (error) {
      commit("partials/setError", error, { root: true });
      console.log(" Error!");
    } finally {
      commit("partials/setLoading", false, { root: true });
    }
  },

  async getReplyData({ commit }, data) {
    try {
      let replys = getCollectionwithid("reply");
      return await replys
        .where("messageId", "==", data.messageId)
        .where("sender.username", "==", String(data.username))
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            return false;
          } else {
            let replys = snapshot.docs.map(doc =>
              Object.assign({}, doc.data(), { id: doc.id })
            );
            return replys;
          }
        });
    } catch (error) {
      console.log(" Error!!!!!!!", error);
    } finally {
    }
  },

  async getAllReplyData({ commit }, data) {
    try {
      let replys = getCollectionwithid("reply");
      return await replys
        .where("messageId", "==", data.messageId)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            return false;
          } else {
            let replys = snapshot.docs.map(doc =>
              Object.assign({}, doc.data(), { id: doc.id })
            );
            return replys;
          }
        });
    } catch (error) {
      console.log(" Error!!!!!!!", error);
    } finally {
    }
  },

  async getLikeData({ commit }, data) {
    try {
      let likes = getCollectionwithid("likes");
      return await likes
        .where("replyId", "==", data.replyId)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
          } else {
            let likes = snapshot.docs.map(doc =>
              Object.assign({}, doc.data(), { id: doc.id })
            );
            return likes;
          }
        });
    } catch (error) {
      // commit("partials/setError", error, { root: true });
      console.log(" Error!!!!");
    } finally {
      commit("partials/setLoading", false, { root: true });
    }
  },
  async getIfLike({}, data) {
    try {
      let ifLike = getCollectionwithid("likes");
      return await ifLike
        .where("replyId", "==", data.replyId)
        .where("username", "array-contains", String(data.username))
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            return false;
          } else {
            return true;
          }
        });
    } catch (error) {
      console.log(" Error!!!!!!!", error);
    } finally {
    }
  },
  async deleteLike({}, data) {
    try {
      return await UpdateCollection("likes", data.likeId, {
        username: firebase.firestore.FieldValue.arrayRemove(
          String(data.username)
        )
      }).then(snapshot => {});
      // commit("partials/setLoading", false, { root: true });
    } catch (error) {
      // commit("partials/setError", error, { root: true });
      console.log(" Error!!!!!!!", error);
    } finally {
      // commit("partials/setLoading", false, { root: true });
    }
  },
  async addLike({}, data) {
    try {
      return await UpdateCollection("likes", data.likeId, {
        username: firebase.firestore.FieldValue.arrayUnion(
          String(data.username)
        )
      }).then(snapshot => {});
      // commit("partials/setLoading", false, { root: true });
    } catch (error) {
      // commit("partials/setError", error, { root: true });
      console.log(" Error!!!!!!!", error);
    } finally {
      // commit("partials/setLoading", false, { root: true });
    }
  }

};
