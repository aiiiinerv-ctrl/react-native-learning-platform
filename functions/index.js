const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");

admin.initializeApp();
const db = getFirestore();

// Use v1 syntax, deploying to the region closest to asia-southeast3 that supports functions
exports.processPushNotificationQueue = functions
    .region("asia-southeast1")
    .runWith({
        timeoutSeconds: 60,
        memory: "256MB",
        maxInstances: 1
    })
    .firestore.document("notification_queue/{docId}")
    .onCreate(async (snap, context) => {
        if (!snap) return;

        const data = snap.data();
        if (data.status !== "pending") return;

        try {
            // 1. Get all FCM tokens from users collection
            const usersSnapshot = await db.collection("users").get();
            const tokens = [];

            usersSnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.fcmToken) {
                    tokens.push(userData.fcmToken);
                }
            });

            if (tokens.length === 0) {
                console.log("No users with FCM tokens found.");
                await snap.ref.update({ status: "no_tokens_found" });
                return;
            }

            // 2. Prepare the multicast message payload
            const message = {
                tokens,
                notification: {
                    title: data.title,
                    body: data.body,
                },
                data: {
                    link: data.link || "/",
                    docId: context.params.docId,
                },
                android: {
                    notification: {
                        icon: "ic_notification",
                        color: "#3b82f6",
                    },
                },
                apns: {
                    payload: {
                        aps: {
                            sound: "default",
                        },
                    },
                },
            };

            // 3. Send the notifications
            const response = await getMessaging().sendEachForMulticast(message);

            console.log(`Successfully sent ${response.successCount} messages. Failed: ${response.failureCount}`);

            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    failedTokens.push(tokens[idx]);
                }
            });

            if (failedTokens.length > 0) {
                console.log("Tokens failed:", failedTokens.length);
            }

            // 4. Update the queue document status
            await snap.ref.update({
                status: "sent",
                successCount: response.successCount,
                failureCount: response.failureCount,
                sentAt: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Error sending push notifications:", error);
            await snap.ref.update({
                status: "error",
                error: error.message,
            });
        }
    });
