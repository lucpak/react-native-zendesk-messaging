import type { EmitterSubscription } from 'react-native';
import type { ZendeskInitializeConfig, ZendeskUser, ZendeskPageViewEvent, ZendeskNotificationResponsibility, ZendeskEventType, ZendeskEvent } from './types';
/**
 * Initializing Zendesk SDK.
 *
 * You should call this function first before using other features.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/getting_started/#initialize-the-sdk}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/getting_started/#initialize-the-sdk}
 */
export declare function initialize(config: ZendeskInitializeConfig): Promise<void>;
/**
 * Invalidates the current instance of Zendesk.
 *
 * After calling this method you will have to call `initialize` again if you would like to use Zendesk.
 */
export declare function reset(): void;
/**
 * To authenticate a user call the `login` with your own JWT.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/advanced_integration/#loginuser}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/advanced_integration/#loginuser}
 */
export declare function login(token: string): Promise<ZendeskUser>;
/**
 * Logout from Zendesk SDK.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/advanced_integration/#logoutuser}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/advanced_integration/#logoutuser}
 */
export declare function logout(): Promise<void>;
/**
 * Show the native based conversation screen.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/getting_started/#show-the-conversation}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/getting_started/#show-the-conversation}
 */
export declare function openMessagingView(): Promise<void>;
/**
 * **iOS Only** (no-op for other platform, always return empty promise)
 *
 * Closes the messaging view if it is open. Doesn't work on Android.
 * Returns a promise that resolves when the messaging view is closed.
 *
 * N.B. This is not a part of the official Zendesk SDK, but a custom implementation.
 */
export declare function closeMessagingView(): Promise<void>;
/**
 * Send session-based page view event. event must have `pageTitle` and `url`.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/advanced_integration/#page-view-event}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/advanced_integration/#page-view-event}
 */
export declare function sendPageViewEvent(event: ZendeskPageViewEvent): Promise<void>;
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
export declare function setConversationFields(fields: Record<string, string | number | boolean>): void;
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
export declare function clearConversationFields(): void;
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
export declare function setConversationTags(tags: string[]): void;
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
export declare function clearConversationTags(): void;
/**
 * **Android Only** (no-op for other platform)
 *
 * Set push notification token(FCM).
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/push_notifications/#updating-push-notification-tokens}
 */
export declare function updatePushNotificationToken(token: string): void;
/**
 * Get current total number of unread messages.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/getting_started/#unread-messages}
 * @see iOS {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/ios/getting_started/#unread-messages}
 */
export declare function getUnreadMessageCount(): Promise<number>;
/**
 * **Android Only** (no-op for other platform, always return `UNKNOWN`)
 *
 * Handle remote message that received from FCM(Firebase Cloud Messaging) and show notifications.
 * If remote message isn't Zendesk message, it does nothing.
 *
 * @see Android {@link https://developer.zendesk.com/documentation/zendesk-web-widget-sdks/sdks/android/push_notifications/#using-a-custom-implementation-of-firebasemessagingservice}
 */
export declare function handleNotification(remoteMessage: Record<string, string>): Promise<ZendeskNotificationResponsibility>;
/**
 * Add a listener for listening emitted events by Zendesk SDK.
 */
export declare function addEventListener<EventType extends ZendeskEventType>(type: EventType, listener: (event: ZendeskEvent<EventType>) => void): EmitterSubscription;
/**
 * Remove subscribed event listener.
 */
export declare function removeSubscription(subscription: EmitterSubscription): void;
/**
 * Remove all of registered listener by event type.
 */
export declare function removeAllListeners(type: ZendeskEventType): void;
//# sourceMappingURL=index.d.ts.map