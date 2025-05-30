"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventListener = addEventListener;
exports.clearConversationFields = clearConversationFields;
exports.clearConversationTags = clearConversationTags;
exports.closeMessagingView = closeMessagingView;
exports.getUnreadMessageCount = getUnreadMessageCount;
exports.handleNotification = handleNotification;
exports.initialize = initialize;
exports.login = login;
exports.logout = logout;
exports.openMessagingView = openMessagingView;
exports.removeAllListeners = removeAllListeners;
exports.removeSubscription = removeSubscription;
exports.reset = reset;
exports.sendPageViewEvent = sendPageViewEvent;
exports.setConversationFields = setConversationFields;
exports.setConversationTags = setConversationTags;
exports.updatePushNotificationToken = updatePushNotificationToken;
var _reactNative = require("react-native");
var _error = require("./error");
const LINKING_ERROR = `The package 'react-native-zendesk-messaging' doesn't seem to be linked. Make sure: \n\n${_reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
})}- You rebuilt the app after installing the package\n` + `- You are not using Expo Go\n`;
const ZendeskMessaging = _reactNative.NativeModules.ZendeskMessaging ? _reactNative.NativeModules.ZendeskMessaging : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
const eventEmitter = new _reactNative.NativeEventEmitter(ZendeskMessaging);

/**
 * Initializing Zendesk SDK.
 *
 * You should call this function first before using other features.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/getting_started/#initialize-the-sdk}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/getting_started/#initialize-the-sdk}
 */
function initialize(config) {
  if (typeof config.channelKey !== 'string') {
    return Promise.reject(new _error.ZendeskMessagingError('invalid channelKey'));
  }
  return ZendeskMessaging.initialize({
    skipOpenMessaging: false,
    ...config
  });
}

/**
 * Invalidates the current instance of Zendesk.
 *
 * After calling this method you will have to call `initialize` again if you would like to use Zendesk.
 */
function reset() {
  return ZendeskMessaging.reset();
}

/**
 * To authenticate a user call the `login` with your own JWT.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/advanced_integration/#loginuser}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/advanced_integration/#loginuser}
 */
function login(token) {
  if (typeof token !== 'string' || !token.length) {
    return Promise.reject(new _error.ZendeskMessagingError('invalid token'));
  }
  return ZendeskMessaging.login(token);
}

/**
 * Logout from Zendesk SDK.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/advanced_integration/#logoutuser}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/advanced_integration/#logoutuser}
 */
function logout() {
  return ZendeskMessaging.logout();
}

/**
 * Show the native based conversation screen.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/getting_started/#show-the-conversation}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/getting_started/#show-the-conversation}
 */
function openMessagingView() {
  return ZendeskMessaging.openMessagingView();
}

/**
 * **iOS Only** (no-op for other platform, always return empty promise)
 *
 * Closes the messaging view if it is open. Doesn't work on Android.
 * Returns a promise that resolves when the messaging view is closed.
 *
 * N.B. This is not a part of the official Zendesk SDK, but a custom implementation.
 */

function closeMessagingView() {
  if (_reactNative.Platform.OS !== 'ios') return Promise.resolve();
  return ZendeskMessaging.closeMessagingView();
}

/**
 * Send session-based page view event. event must have `pageTitle` and `url`.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/advanced_integration/#page-view-event}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/advanced_integration/#page-view-event}
 */
function sendPageViewEvent(event) {
  if (typeof event.pageTitle !== 'string' || typeof event.url !== 'string') {
    return Promise.reject(new _error.ZendeskMessagingError('invalid event data'));
  }
  return ZendeskMessaging.sendPageViewEvent(event);
}

/**
 * Allows values for conversation fields to be set in the SDK to add contextual data about the conversation.
 *
 * Conversation fields are not immediately associated with a conversation when the API is called.
 * Calling the API will store the conversation fields, but those fields will only be applied to
 * a conversation when end users either start a new conversation or send a new message in
 * an existing conversation.
 *
 * Required SDK version: `>= 2.13.0`
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/advanced_integration/#set-conversation-fields}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/advanced_integration/#set-conversation-fields}
 */
function setConversationFields(fields) {
  if (Object.values(fields).some(value => !(typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'))) {
    throw new _error.ZendeskMessagingError('invalid fields');
  }
  ZendeskMessaging.setConversationFields(fields);
}

/**
 * Clear conversation fields from the SDK storage.
 *
 * This API does not affect conversation fields
 * already applied to the conversation.
 *
 * Required SDK version: `>= 2.13.0`
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/advanced_integration/#clear-conversation-fields}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/advanced_integration/#clear-conversation-fields}
 */
function clearConversationFields() {
  ZendeskMessaging.clearConversationFields();
}

/**
 * Allows custom conversation tags to be set in the SDK to add contextual data about the conversation.
 *
 * Conversation tags are not immediately associated with a conversation
 * when the API is called. It will only be applied to a conversation
 * when end users either start a new conversation or send a new message
 * in an existing conversation.
 *
 * Required SDK version: `>= 2.13.0`
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/advanced_integration/#set-conversation-tags}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/advanced_integration/#set-conversation-tags}
 */
function setConversationTags(tags) {
  if (tags.some(value => typeof value !== 'string')) {
    throw new _error.ZendeskMessagingError('invalid tags');
  }
  ZendeskMessaging.setConversationTags(tags);
}

/**
 * Clear conversation tags from SDK storage.
 *
 * This API does not affect conversation tags
 * already applied to the conversation.
 *
 * Required SDK version: `>= 2.13.0`
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/advanced_integration/#set-conversation-tags}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/advanced_integration/#set-conversation-tags}
 */
function clearConversationTags() {
  ZendeskMessaging.clearConversationTags();
}

/**
 * **Android Only** (no-op for other platform)
 *
 * Set push notification token(FCM).
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/push_notifications/#updating-push-notification-tokens}
 */
function updatePushNotificationToken(token) {
  if (_reactNative.Platform.OS !== 'android') return;
  return ZendeskMessaging.updatePushNotificationToken(token);
}

/**
 * Get current total number of unread messages.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/getting_started/#unread-messages}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/getting_started/#unread-messages}
 */
function getUnreadMessageCount() {
  return ZendeskMessaging.getUnreadMessageCount();
}

/**
 * **Android Only** (no-op for other platform, always return `UNKNOWN`)
 *
 * Handle remote message that received from FCM(Firebase Cloud Messaging) and show notifications.
 * If remote message isn't Zendesk message, it does nothing.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/push_notifications/#using-a-custom-implementation-of-firebasemessagingservice}
 */
function handleNotification(remoteMessage) {
  return _reactNative.Platform.OS === 'android' ? ZendeskMessaging.handleNotification(remoteMessage) : Promise.resolve('UNKNOWN');
}

/**
 * Add a listener for listening emitted events by Zendesk SDK.
 */
function addEventListener(type, listener) {
  return eventEmitter.addListener(type, listener);
}

/**
 * Remove subscribed event listener.
 */
function removeSubscription(subscription) {
  eventEmitter.removeSubscription(subscription);
}

/**
 * Remove all of registered listener by event type.
 */
function removeAllListeners(type) {
  eventEmitter.removeAllListeners(type);
}
//# sourceMappingURL=index.js.map