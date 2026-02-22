importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBhn3MvxHmasOPDt4yobx5n2ldQPVa9BB0",
    authDomain: "rn-learning-platform-4a0a9.firebaseapp.com",
    projectId: "rn-learning-platform-4a0a9",
    storageBucket: "rn-learning-platform-4a0a9.firebasestorage.app",
    messagingSenderId: "922885288030",
    appId: "1:922885288030:web:e046917e7d9abc94f704cf"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title || 'React Native Learning Platform';
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon512_rounded.png', // Fallback to an existing icon or you can add one later
        data: payload.data
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
