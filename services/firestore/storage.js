import { storage } from "../firebase";

export const uplaodTostorage = async file => {
  console.log("this is log in storage.js", file);
  const filref = storage.ref();
  if (file.imgName == "avatar") {
    console.log("avatar");
    const res = await filref
      .child(`${file.username}/${file.imgName}`)
      .putString(file.file, "data_url");
    return await res.ref.getDownloadURL();
  }

  if (file.imgName == "cover") {
    console.log("cover");
    const res = await filref
      .child(`${file.username}/${file.imgName}`)
      .put(file.file);
    return await res.ref.getDownloadURL();
  }

  if (file.imgName === "post") {
    console.log("file data =>",file);
    const res = await filref
      .child(`${file.username}/messages/${file.imgName}-${file.file.lastModified}`)
      .put(file.file);
    return await res.ref.getDownloadURL();
  }

  // var st = storage
  //   .ref()
  //   .child(`${username}/${file.imgName}`)
  //   .put(file.file);
  //   console.log("sssst",st)
  //   return st
  // uploadTask.on(
  //   storageByChange.TaskEvent.STATE_CHANGED, // or 'state_changed'
  //   function(snapshot) {
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log("Upload is " + progress + "% done");
  //     switch (snapshot.state) {
  //       case storageByChange.TaskState.PAUSED: // or 'paused'
  //         console.log("Upload is paused");
  //         break;
  //       case storageByChange.TaskState.RUNNING: // or 'running'
  //         console.log("Upload is running");
  //         break;
  //     }
  //   },
  //   function(error) {
  //     // A full list of error codes is available at
  //     // https://firebase.google.com/docs/storage/web/handle-errors
  //     switch (error.code) {
  //       case "storage/unauthorized":
  //         // User doesn't have permission to access the object
  //         break;

  //       case "storage/canceled":
  //         // User canceled the upload
  //         break;

  //       case "storage/unknown":
  //         // Unknown error occurred, inspect error.serverResponse
  //         break;
  //     }
  //   },
  //   function() {
  //     // Upload completed successfully, now we can get the download URL
  //     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  //       console.log("File available at", downloadURL);
  //     });
  //   }
  // );
  // const filref = storage.ref(`${username}/${file.imgName}`);
  // const res = await filref.put(file);
  // return await res.ref.getDownloadURL();
};
