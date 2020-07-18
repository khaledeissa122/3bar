import {
  UpdateCollection,
  getCollectionwithid
} from "@/services/firestore/methods.js";
import firebase from "firebase/app";

export default {
  async getUserFollowings({ commit }, username) {
    commit("partials/setLoading", true, { root: true });
    const dataObj = [];
    const snap = await getCollectionwithid("following")
      .where("followingOf", "==", String(username))
      .get()
      .then(res => {
        let following = res.docs.map(doc => {
          Object.assign(dataObj, doc.data(), { id: doc.id });
        });
        commit("setUserfollowings", dataObj);
      });
    commit("partials/setLoading", false, { root: true });
  },

  async getSpecificUser({ commit }, data) {
    const dataObj = {};
    let users = getCollectionwithid("users");
    return await users
      .where("disName", "==", String(data.username))
      .get()
      .then(res => {
        if (res.empty) {
        } else {
          let users = res.docs.map(doc => {
            Object.assign(dataObj, doc.data());
          });
          return dataObj;
        }
      });
  },
  async getIfFollow({ commit }, data) {
    const dataObj = {};
    let isFollow = getCollectionwithid("following");
    return await isFollow
      .where("followingOf", "==", String(data.username))
      .where("followings", "array-contains", String(data.followUsername))
      .get()
      .then(res => {
        if (res.empty) {
          return false;
        } else {
          return true;
        }
      });
  },
  async getIfFollowProfile({ commit }, data) {
    const dataObj = {};
    let isFollow = getCollectionwithid("following");
    return await isFollow
      .where("followingOf", "==", String(data.followUsername))
      .where("followings", "array-contains", String(data.username))
      .get()
      .then(res => {
        if (res.empty) {
          return false;
        } else {
          return true;
        }
      });
  },
  async getIfCrush({}, data) {
    const dataObj = {};
    let isCrush = getCollectionwithid("crushs");
    return await isCrush
      .where("crushsOf", "==", String(data.username))
      .where("crushs", "array-contains", String(data.followUsername))
      .get()
      .then(res => {
        if (res.empty) {
          return false;
        } else {
          return true;
        }
      });
  },
  async getIfCrushProfile({}, data) {
    const dataObj = {};
    let isCrush = getCollectionwithid("crushs");
    return await isCrush
      .where("crushsOf", "==", String(data.followUsername))
      .where("crushs", "array-contains", String(data.username))
      .get()
      .then(res => {
        if (res.empty) {
          return false;
        } else {
          return true;
        }
      });
  },
  async addFollowing({}, data) {
    try {
      return await UpdateCollection("following", data.myUsername, {
        followings: firebase.firestore.FieldValue.arrayUnion(
          String(data.usernameToFollow)
        )
      }).then(snapshot => {
        UpdateCollection("followers", data.usernameToFollow, {
        followers: firebase.firestore.FieldValue.arrayUnion(
            String(data.myUsername)
          )
        })
      });
      // commit("partials/setLoading", false, { root: true });
    } catch (error) {
      // commit("partials/setError", error, { root: true });
      console.log(" Error!!!!!!!", error);
    } finally {
      // commit("partials/setLoading", false, { root: true });
    }
  },
  async removeFollowing({}, data) {
    // console.log("Follow data =>", data);
    try {
      return await UpdateCollection("following", data.myUsername, {
        followings: firebase.firestore.FieldValue.arrayRemove(
          String(data.usernameToFollow)
        )
      }).then(snapshot => {
        UpdateCollection("followers", data.usernameToFollow, {
        followers: firebase.firestore.FieldValue.arrayRemove(
            String(data.myUsername)
          )
        })
      });
      // commit("partials/setLoading", false, { root: true });
    } catch (error) {
      // commit("partials/setError", error, { root: true });
      console.log(" Error!!!!!!!", error);
    } finally {
      // commit("partials/setLoading", false, { root: true });
    }
  },

  async addCrush({}, data) {
    // console.log("crush data =>", data);
    const checkArray = [];
    try {
      await getCollectionwithid("crushs")
        .where("crushsOf", "==", String(data.myUsername))
        .get()
        .then(snapshot => {
          let crushs = snapshot.docs.map(doc => {
            checkArray.push(doc.data());
          });
          const crushsCount = checkArray[0].crushs.length + 1;
          // console.log(crushsCount);
          if (crushsCount <= 10) {
            UpdateCollection("crushs", data.myUsername, {
              crushs: firebase.firestore.FieldValue.arrayUnion(
                String(data.usernameToFollow)
              )
            }).then(() => {
              UpdateCollection("crushers", data.usernameToFollow, {
                crushers: firebase.firestore.FieldValue.arrayUnion(
                  String(data.myUsername)
                )
              });
            });
          } else {
            this.$notifier.showMessage({
              content: "Your crushs list if full",
              color: "error"
            });
            return;
          }
        });
    } catch (error) {
      console.log(" Error!!!!!!!", error);
    }
  },

  async removeCrush({}, data) {
    try {
      return await UpdateCollection("crushs", data.myUsername, {
        crushs: firebase.firestore.FieldValue.arrayRemove(
          String(data.usernameToFollow)
        )
      }).then(snapshot => {
        UpdateCollection("crushers", data.usernameToFollow, {
          crushers: firebase.firestore.FieldValue.arrayRemove(
            String(data.myUsername)
          )
        }).then(() => {
          UpdateCollection("crushers", data.usernameToFollow, {
            crushers: firebase.firestore.FieldValue.arrayRemove(
              String(data.myUsername)
            )
          });
        });
      });
    } catch (error) {
      console.log(" Error!!!!!!!", error);
    }
  }
};
