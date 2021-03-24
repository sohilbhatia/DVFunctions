const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase = require("firebase");
admin.initializeApp();
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
};
firebase.initializeApp(firebaseConfig);

exports.newNodeDetected = functions.database.ref(
    "codes/{userCode}/messages/message")
    .onCreate((snapshot, context) => {
      const name = snapshot.val();
      const userCode = context.params.userCode;
      console.log(userCode + " received a message: " + name);
      const box = snapshot.val();
      const newCode = context.params.userCode;
      console.log(newCode + " updated a message: " + box);
      return admin.database().ref("codes/" + newCode).then((snap) => {
        const token = snap.child("parentToken").val();
        console.log("token: ", token);
        console.log("Constructing the notification message.");
        const payload = {
          data: {
            data_type: "direct_message",
            title: "Message from your Teenage Driver",
            message: "Just Testing!!!",
            message_id: "ASTROWORLD",
          },
        };
        return admin.messaging().sendToDevice(token, payload)
            .then(function(response) {
              console.log("Successfully sent message:", response);
            })
            .catch(function(error) {
              console.log("Error sending message:", error);
            });
      });
    });
/*
exports.newNodeUpdated = functions.database.ref(
    "codes/{userCode}/messages/message")
    .onUpdate((change, context) => {
      const box = change.after;
      const updatedVal = box.val();
      const newCode = context.params.userCode;
      console.log(newCode + " updated a message: " + updatedVal);
      return admin.database().ref("codes/" + newCode).then((snap) => {
        const token = snap.child("parentToken").val();
        console.log("token: ", token);
        console.log("Constructing the notification message.");
        const payload = {
          data: {
            data_type: "direct_message",
            title: "Message from your Teenage Driver",
            message: "Just Testing!!!",
            message_id: "ASTROWORLD",
          },
        };
        return admin.messaging().sendToDevice(token, payload)
            .then(function(response) {
              console.log("Successfully sent message:", response);
            })
            .catch(function(error) {
              console.log("Error sending message:", error);
            });
      });
    });
 */
