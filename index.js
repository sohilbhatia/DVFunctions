const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const finder = "codes/{userCode}/messages/message";
exports.newNodeUpdated = functions.database.ref(finder)
    .onWrite((change, context) => {
      const tMessage = change.after.val();
      console.log(tMessage);
      const payload = {
        notification: {
          body: "Your " + tMessage,
          title: "Teenage Driver Update",
          content_available: "true",
        },
        data: {
          body: "Body of Your Notification in Data",
          title: "Title of Your Notification in Title",
          content_available: "true",
        },
      };
      const op = {
        priority: "high",
      };
      const location = ("codes/" + context.params.userCode);
      return admin.database().ref(location).once("value").then((snap) => {
        const token = snap.child("parentToken").val();
        admin.messaging().sendToDevice(token, payload, op)
            .then(function(response) {
              console.log("Success!");
            })
            .catch(function(error) {
              console.log("Error: " + error);
            });
      });
    });

