/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(authenticated)` | `/(authenticated)/(modals)/account` | `/(authenticated)/(tabs)` | `/(authenticated)/(tabs)/home` | `/(authenticated)/account` | `/(authenticated)/home` | `/(modals)/account` | `/(tabs)` | `/(tabs)/home` | `/_sitemap` | `/access` | `/account` | `/home`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
