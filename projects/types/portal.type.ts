import { ComponentType } from '@angular/cdk/overlay';

type KeysOmitFunction<T> = {
  [K in keyof T]: T[K] extends ComponentType<T> ? never : K;
}[keyof T];

export type RlsPortalElementProps<T = any> = Partial<
  Record<KeysOmitFunction<T>, any>
>;

export type RlsPortalContainerProps<C = any> = Omit<
  RlsPortalElementProps<C>,
  'append' | 'close' | 'open' | 'visible' | 'visibleChange' | 'ngPortal'
>;

export type RlsPortalComponentProps<T = any> = Omit<
  RlsPortalElementProps<T>,
  'ngOnInit' | 'ngOnDestroy' | 'ngOnChanges' | 'ngPortal'
>;

export interface RlsPortalProps<C = any, T = any> {
  component?: RlsPortalComponentProps<T>;
  container?: RlsPortalContainerProps<C>;
}

export type RlsPortalCallback<V = any> = (value?: V) => void;

interface BasePortal {
  close: (delayInMs?: number) => void;
  destroy: () => void;
  open: (delayInMs?: number) => void;
  visible: boolean;
}

export interface RlsPortalPublic<V = any> extends BasePortal {
  emit: (value?: V) => void;
  subscribe: (subscriber: RlsPortalCallback<V>) => () => void;
  waiting: () => Promise<V | undefined>;
}

export interface RlsPortalPrivate<V = any> extends BasePortal {
  receive: (listener: RlsPortalCallback<V>) => () => void;
  reject: (reason?: any) => void;
  resolve: (value?: V) => void;
  send: (value?: V) => void;
}

export type RlsPortalContainerPrivate = Pick<RlsPortalPrivate, 'reject'>;

export interface OnPortal<V = any> {
  ngPortal(portal: RlsPortalPrivate<V>): void;
}

export interface OnPortalContainer {
  append<E extends HTMLElement = HTMLElement>(component: E): void;
  close(delayInMs?: number): void;
  ngPortal(portal: RlsPortalContainerPrivate): void;
  open(delayInMs?: number): void;
  visible: boolean;
}
