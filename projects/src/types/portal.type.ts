import { ComponentType } from '@angular/cdk/overlay';

export interface RlsPortalEvent<T = any> {
  action?: string;
  value?: T;
}

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
  'ngBoccPortal'
>;

export interface RlsPortalProps<C = any, T = any> {
  component?: RlsPortalComponentProps<T>;
  container?: RlsPortalContainerProps<C>;
}

export type RlsPortalCallback<T = any> = (event: RlsPortalEvent<T>) => void;

interface BasePortal {
  close: (delayInMs?: number) => void;
  destroy: () => void;
  open: (delayInMs?: number) => void;
  visible: boolean;
}

export interface RlsPortalPublic extends BasePortal {
  emit: <T = any>(event: RlsPortalEvent<T>) => void;
  subscribe: <T = any>(subscriber: RlsPortalCallback<T>) => Unsubscription;
}

export interface RlsPortalPrivate extends BasePortal {
  receive: <T = any>(subscriber: RlsPortalCallback<T>) => Unsubscription;
  send: <T = any>(event: RlsPortalEvent<T>) => void;
}

export interface OnPortal {
  ngPortal(portal: RlsPortalPrivate): void;
}

export interface OnPortalContainer {
  append<T extends HTMLElement = HTMLElement>(component: T): void;
  close(delayInMs?: number): void;
  open(delayInMs?: number): void;
  visible: boolean;
}
