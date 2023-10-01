// sw.js - Service Worker code

// Listen for the 'push' event
self.addEventListener("push", function (event) {
  // Handle the push notification here
  const options = {
    body: event.data.text(), // Extract the notification message from the event data
    icon: "notification-icon.png", // Set the notification icon
    badge: "notification-badge.png" // Set the badge icon
  };

  event.waitUntil(
    self.registration.showNotification("Notification Title", options)
  );
});
