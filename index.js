const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const myToken = ();
exports.newNodeUpdated = functions.database.ref("parties/users")
    .onWrite((event) => {
      const payload = {
        notification: {
          body: "Check test",
          title: "Postman just worked",
          content_available: "true",
        },
        data: {
          body: "Body of Your Notification in Data",
          title: "Title of Your Notification in Title",
          content_available: "true",
        },
      };
      /*
      const pay = {
        notification: {
          title: "Message from your Teenage Driver",
          body: "check it out",
          badge: "1",
          sound: "default",
          content_available: "true",
        },
      };
      */
      const op = {
        priority: "high",
      };
      // const so = "parties/users/status/myToken";
      const l = Object.keys(myToken);
      if (l != null) {
        console.log("Token is good");
      }
      return admin.messaging().sendToDevice(myToken, payload, op)
          .then(function(response) {
            console.log("Success!");
          })
          .catch(function(error) {
            console.log("Error: " + error);
          });
      // console.log(updated);
      /*
      return admin.database().ref(so).once("value").then((snap) => {
        if (snap.val() != null) {
          console.log("WORKING");
        }
      });
      */
      /*
      return admin.database().ref("parties" + so).once("value").then((snap) => {
        admin.messaging().sendToDevice(myToken, payload)
            .then(function(response) {
              console.log("Successfully sent message:", response);
            })
            .catch(function(error) {
              console.log("Error sending message:", error);
            });
      });
      */
    });
/*
exports.newNodeDetected = functions.database.ref(
    "codes/{userCode}/messages/message")
    .onCreate((snapshot, context) => {
      const name = snapshot.val();
      const userCode = context.params.userCode;
      console.log(userCode + " received a message: " + name);
      const box = snapshot.val();
      const ne = context.params.userCode;
      console.log(ne + " updated a message: " + box);
      return admin.database().ref("codes/" + ne).once("value").then((snap) => {
        const token = snap.child("parentToken").val();
        console.log("token: ", token);
        console.log("Constructing the notification message.");
        const payload = {
          data: {
            title: "Message from your Teenage Driver",
            body: "IT WORKED!",
          },
        };
        const options = {
          priority: "high",
          timeToLive: 1,
        };
        admin.messaging().sendToDevice(token, payload, options)
            .then(function(response) {
              console.log("Successfully sent message:", response);
            })
            .catch(function(error) {
              console.log("Error sending message:", error);
            });
      });
    });
*/
