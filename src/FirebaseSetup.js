// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { firebase } from "firebase/app";
import axios from "axios";
import { urlBase64ToUint8Array } from "./conversion";

function notification() {
  const firebaseConfig = {
    apiKey: "AIzaSyBJ_QsWS_1HFqdXhScbtDIHtMwEizkKwWU",
    authDomain: "push-notification-fa3d8.firebaseapp.com",
    projectId: "push-notification-fa3d8",
    storageBucket: "push-notification-fa3d8.appspot.com",
    messagingSenderId: "395154291262",
    appId: "1:395154291262:web:f3357657e69a292f012f6f",
    measurementId: "G-KENSGVL8KR"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //const messaging = firebase.messaging();

  // Register the service worker in your HTML

  const subscribeToPushNotifications = () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready
        .then(function (registration) {
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey:
              "BJNkd-h2cYtX5iohPx71cEn05z-uNDvOY5XWymxo5EaXMcNJ6C5aSQaE81AgoCO5YfG6GV9LqARgzNwn6lSJW7Q"
          });
        })
        .then(function (subscription) {
          console.log(subscription.endpoint);

          // Send the subscription data to your Ruby on Rails server
          sendSubscriptionToServer(subscription);
        })
        .catch(function (error) {
          console.error("Error subscribing to push notifications:", error);
        });
    }
  };

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch(function (error) {
        console.error("Service Worker registration failed:", error);
      });
  }

  const sendSubscriptionToServer = (subscription) => {
    const registrationToken =
      subscription && subscription.endpoint
        ? subscription.endpoint.split("/").slice(-1)[0]
        : null;
    // Define the URL endpoint where you want to send the POST request
    const endpoint = "http://localhost:3000/notification/send_notification";

    // Prepare the data to send in the request body (subscription object as JSON)
    const data = JSON.stringify({ token: registrationToken });

    // Define headers for the request
    const headers = {
      "Content-Type": "application/json"
    };

    // Send the POST request using Axios
    axios
      .post(endpoint, data, { headers })
      .then(function (response) {
        console.log(response);
        if (!response) {
          throw new Error("Failed to send subscription data to server.");
        }
        //return response;
      })
      .catch(function (error) {
        console.error("Error sending subscription data to server:", error);
      });
  };

  const sendNotification = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Push notification permission granted");
        subscribeToPushNotifications();
      } else if (permission === "denied") {
        console.log("Push notification permission denied");
      }
    });
  };

  return (
    <div className="App">
      <button onClick={sendNotification}> Send notification </button>
    </div>
  );
}
export default notification;
