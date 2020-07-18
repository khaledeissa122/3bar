import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";
import { getCollectionwithid } from "@/services/firestore/methods.js";
// import { auth } from "@/services/firebase";

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    if (process.server && process.static) return;
    if (!req.headers.cookie) return;
    const parsed = cookieparser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.access_token;
    if (!accessTokenCookie) return;

    const decoded = JWTDecode(accessTokenCookie);
    // console.log("Decoded", decoded);
    // if (decoded.iss) {
    //   // console.log(uid);
    //   let thisUser = getCollectionwithid("users")
    //     .where("email", "==", String(decoded.email))
    //     .get()
    //     .then(res => {
    //       if (res.empty) {
    //         console.log("this is return empty value");
    //       } else {
    //         let selectedUsername = res.docs.map(doc =>
    //           Object.assign({}, doc.data(), {
    //             id: doc.id
    //           })
    //         );
    //         commit("enduser/SET_USER", {
    //           uid: decoded.user_id,
    //           email: decoded.email,
    //           username: selectedUsername[0].disName
    //         });
    //       }
    //     });
    // } else {
      if (decoded) {
        commit("enduser/SET_USER", {
          uid: decoded.user_id,
          email: decoded.email,
          username: decoded.name
        });
        // dispatch("enduser/redirectToUser");
      }
    // }
  }
};
