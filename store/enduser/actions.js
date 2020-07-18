import { auth } from "@/services/firebase";
import { createKeywords } from "@/helpers/methods";
import Cookie from "js-cookie";
import {
  setCollection,
  getCollectionwithid,
} from "@/services/firestore/methods.js";

export default {
  async login({ commit, dispatch }, account) {
    commit("partials/setLoading", true, { root: true });
    try {
      // Login the user
      let user = await auth.signInWithEmailAndPassword(
        account.email,
        account.password
      );
      // Get JWT from Firebase
      if (user.user.displayName) {
        const token = await auth.currentUser.getIdToken();
        const { email: email, uid: uid } = auth.currentUser;
        // Set JWT to the cookie
        Cookie.set("access_token", token);
        // Set the user locally
        commit("SET_USER", { email, uid, username: user.user.displayName });
        dispatch("redirectToUser");
        commit("partials/setLoading", false, { root: true });
      } else {
        commit("partials/setError", "Error in username", { root: true });
      }
    } catch (error) {
      commit("partials/setError", "Invalid Email or Password", { root: true });
      console.log("error");
    } finally {
      commit("partials/setLoading", false, { root: true });
    }
  },

  // async googleLogin({ commit, dispatch }) {
  //   const provider = new providerAuth.GoogleAuthProvider();
  //   provider.addScope("profile");
  //   provider.addScope("email");
  //   let address;
  //   await geo().then(res => {
  //     address = res;
  //   });
  //   // console.log(address)
  //   await auth
  //     .signInWithPopup(provider)
  //     .then(result => {
  //       // This gives you a Google Access Token.
  //       var email = result.user.email;
  //       var uid = result.user.uid;
  //       // The signed-in user info.
  //       var token = result.credential.idToken;
  //       // console.log(token);

  //       console.log(result);
  //       if (result.additionalUserInfo.isNewUser) {
  //         var name = result.user.displayName;
  //         var avatar = result.user.photoURL;
  //         const keywords = createKeywords(result.user.displayName);
  //         var randomNum = Math.floor(Math.random() * 125335050 + 100000000);
  //         var username = name.toLowerCase().replace(/\s/g, "") + randomNum;
  //         setCollection("users", username, {
  //           userId: uid,
  //           disName: username,
  //           email: email,
  //           gender: "male",
  //           name: name,
  //           keywords: keywords,
  //           birthday: "",
  //           avatarUrl: avatar,
  //           coverUrl: "avatardef.jpg",
  //           age: "",
  //           address: {
  //             country: address.country ? address.country : "",
  //             city: address.city ? address.city : "",
  //             continent: address.continent ? address.continent : "",
  //             countryCode: address.countryCode ? address.countryCode : "",
  //             ipName: address.ipName ? address.ipName : "",
  //             ipType: address.ipType ? address.ipType : "",
  //             isp: address.isp ? address.isp : "",
  //             lat: address.lat ? address.lat : "",
  //             lon: address.lon ? address.lon : "",
  //             org: address.org ? address.org : "",
  //             query: address.query ? address.query : "",
  //             region: address.region ? address.region : "",
  //             status: address.status ? address.status : ""
  //           },
  //           showBirthday: false
  //         }).then(ref => {
  //           setCollection("followers", username, {
  //             followersOf: username,
  //             followers: []
  //           });
  //           setCollection("following", username, {
  //             followingOf: username,
  //             followings: []
  //           });
  //           setCollection("crushs", username, {
  //             crushsOf: username,
  //             crushs: []
  //           });
  //           setCollection("crushers", username, {
  //             crushersOf: username,
  //             crushers: []
  //           });
  //           commit("SET_USER", { email, uid, username: username });
  //           Cookie.set("access_token", token);
  //           commit("partials/setLoading", false, { root: true });
  //           dispatch("redirectToUser");
  //         });
  //       } else {
  //         // commit("partials/setLoading", true, { root: true });
  //         // let selectedUsername = [];
  //         console.log(email);
  //         let thisUser = getCollection("reply")
  //           // .where("username", "==", "khaledeissa185059008")
  //           // .get()
  //           .then(res => {
  //             console.log(res)
  //             if (res.empty) {
  //               console.log("This is return empty value");
  //             } else {
  //               let selectedUsername = res.docs.map(doc =>
  //                 Object.assign({}, doc.data(), {
  //                   id: doc.id
  //                 })
  //               );
  //               console.log("ay 7aga", selectedUsername);
  //               commit("SET_USER", {
  //                 email,
  //                 uid,
  //                 username: selectedUsername[0].disName
  //               });
  //               Cookie.set("access_token", token);
  //               commit("partials/setLoading", false, { root: true });
  //               dispatch("redirectToUser");
  //             }
  //           });
  //       }
  //     })
  //     .catch(error => {
  //       console.log("Error ", error);
  //     });
  // },
  // async fbLogin() {
  //   var provider = new firebase.auth.FacebookAuthProvider();
  //   await auth
  //     .signInWithPopup(provider)
  //     .then(result => {
  //       // This gives you a Google Access Token.
  //       var token = result.credential.accessToken;
  //       // The signed-in user info.

  //       var user = result.user;
  //       console.log("in social login", user);
  //       this.$router.push(`/users/${user.uid}`);
  //     })
  //     .catch(error => {
  //       alert("Opss", error.message);
  //     });
  // },

  async signUp({ commit, state, dispatch }, account) {
    commit("partials/setLoading", true, { root: true });
    const keywords = createKeywords(account.name);
    try {
      let { user } = await auth.createUserWithEmailAndPassword(
        account.email,
        account.password
      );
      await setCollection(
        "users",
        account.username.replace(/\s/g, "").toLowerCase(),
        {
          userId: user.uid,
          disName: account.username.replace(/\s/g, "").toLowerCase(),
          gender: account.gender,
          email: account.email,
          name: account.name,
          keywords: keywords,
          birthday: account.date,
          avatarUrl: "avatardef.jpg",
          coverUrl: "avatardef.jpg",
          age: this.$moment().diff(account.date, "years"),
          address: {
            country: account.location.country,
            city: account.location.city,
            continent: account.location.continent,
            countryCode: account.location.countryCode,
            ipName: account.location.ipName,
            ipType: account.location.ipType,
            isp: account.location.isp,
            lat: account.location.lat,
            lon: account.location.lon,
            org: account.location.org,
            query: account.location.query,
            region: account.location.region,
            status: account.location.status
          },
          showBirthday: false
        }
      ).then(ref => {
        setCollection(
          "followers",
          account.username.replace(/\s/g, "").toLowerCase(),
          {
            followersOf: account.username.replace(/\s/g, "").toLowerCase(),
            followers: []
          }
        );
        setCollection(
          "following",
          account.username.replace(/\s/g, "").toLowerCase(),
          {
            followingOf: account.username.replace(/\s/g, "").toLowerCase(),
            followings: []
          }
        );
        setCollection(
          "crushs",
          account.username.replace(/\s/g, "").toLowerCase(),
          {
            crushsOf: account.username.replace(/\s/g, "").toLowerCase(),
            crushs: []
          }
        );
        setCollection(
          "crushers",
          account.username.replace(/\s/g, "").toLowerCase(),
          {
            crushersOf: account.username.replace(/\s/g, "").toLowerCase(),
            crushers: []
          }
        );
        user
          .updateProfile({
            displayName: account.username.replace(/\s/g, "").toLowerCase()
          })
          .then(
            function() {
              const username = user.displayName;
              const email = user.email;
              const uid = user.uid;
              commit("SET_USER", { email, uid, username });
              commit("partials/setLoading", false, { root: true });
              Cookie.set("username", username);
              dispatch("redirectToUser");
            },
            function(error) {
              console.log("Error");
            }
          );
      });
      const token = await auth.currentUser.getIdToken();
      Cookie.set("access_token", token);
      commit("partials/setLoading", false, { root: true });
    } catch (error) {
      auth.currentUser.delete();
      throw error;
    } finally {
      commit("partials/setLoading", false, { root: true });
    }
  },

  async redirectToUser({ state }) {
    if (state.user.username) {
      this.$router.push(`/users/${state.user.username}`);
    }
  },


  async getUserData({ commit, state }, username) {
    commit("partials/setLoading", true, { root: true });
    try {
      let users = getCollectionwithid("users");
      await users
        .where("disName", "==", String(username))
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
          } else {
            snapshot.forEach(doc => {
              commit("setUserData", doc.data());
            });
          }
        });
      commit("partials/setLoading", false, { root: true });
    } catch (error) {
      commit("partials/setError", error, { root: true });
      console.log(" Error!!");
    } finally {
      commit("partials/setLoading", false, { root: true });
    }
  },

  async getAuthUserData({ commit }, username) {
    commit("partials/setLoading", true, { root: true });
    try {
      let users = getCollectionwithid("users");
      await users
        .where("disName", "==", String(username))
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
          } else {
            snapshot.forEach(doc => {
              commit("setAuthUserData", doc.data());
            });
          }
        });
      commit("partials/setLoading", false, { root: true });
    } catch (error) {
      commit("partials/setError", error, { root: true });
    } finally {
      commit("partials/setLoading", false, { root: true });
    }
  }
};
