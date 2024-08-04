import { ComponentType } from '@angular/cdk/overlay';

type KeysOmitFunction<T> = {
  [K in keyof T]: T[K] extends ComponentType<T> ? never : K;
}[keyof T];

export type RlsPortalElementProps<T = any> = Partial<
  Record<KeysOmitFunction<T>, any>
>;

export type RlsPortalContainerProps<C = any> = Omit<
  RlsPortalElementProps<C>,
  'visible' | 'visibleChange'
>;

export type RlsPortalComponentProps<T = any> = Omit<
  RlsPortalElementProps<T>,
  'ngPortal'
>;

export interface RlsPortalProps<C = any, T = any> {
  component?: RlsPortalComponentProps<T>;
  container?: RlsPortalContainerProps<C>;
}

export type RlsPortalCallback<V = any> = (event?: V) => void;

interface BasePortal {
  close: (delayInMs?: number) => void;
  destroy: () => void;
  open: (delayInMs?: number) => void;
  visible: boolean;
}

export interface RlsPortalPublic<V = any> extends BasePortal {
  emit: (event?: V) => void;
  subscribe: (subscriber: RlsPortalCallback<V>) => Unsubscription;
  waiting: () => Promise<Undefined<V>>;
}

export interface RlsPortalPrivate<V = any> extends BasePortal {
  receive: (listener: RlsPortalCallback<V>) => Unsubscription;
  resolve: (value?: V) => void;
  send: (event?: V) => void;
}

export interface OnPortal<V = any> {
  ngPortal(portal: RlsPortalPrivate<V>): void;
}

export interface OnPortalContainer {
  append<E extends HTMLElement = HTMLElement>(component: E): void;
  close(delayInMs?: number): void;
  open(delayInMs?: number): void;
  visible: boolean;
}
