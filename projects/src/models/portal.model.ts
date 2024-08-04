import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import {
  OnPortalContainer,
  RlsPortalCallback,
  RlsPortalComponentProps,
  RlsPortalContainerProps,
  RlsPortalPrivate,
  RlsPortalPublic
} from '../types';

interface AbstractPortal<T = any> {
  componentRef: ComponentRef<T>;
  destroy(): void;
  instance: T;
}

class Portal<T = any> implements AbstractPortal<T> {
  public readonly componentRef: ComponentRef<T>;

  constructor(
    public readonly overlayRef: OverlayRef,
    public readonly portal: ComponentPortal<T>,
    props?: object
  ) {
    this.componentRef = overlayRef.attach(portal);

    const ref = this.componentRef.instance as any;

    Object.entries(props || {}).forEach(([key, value]) => {
      ref[key] = value;
    });
  }

  public get instance(): T {
    return this.componentRef.instance;
  }

  public destroy(): void {
    this.componentRef.destroy();
  }
}

export class PortalContainer<C = any> extends Portal<C> {
  constructor(
    overlayRef: OverlayRef,
    portal: ComponentPortal<C>,
    props?: RlsPortalContainerProps<C>
  ) {
    super(overlayRef, portal, props);
  }

  public override destroy(): void {
    this.componentRef.destroy();
    this.overlayRef.dispose();
  }
}

export class PortalComponent<T = any> extends Portal<T> {
  constructor(
    overlayRef: OverlayRef,
    portal: ComponentPortal<T>,
    props?: RlsPortalComponentProps<T>
  ) {
    super(overlayRef, portal, props);
  }
}

export class RlsPortalContainer<C extends OnPortalContainer, V = any>
  implements RlsPortalPublic<V>, RlsPortalPrivate<V>
{
  private container: C;

  private subscriptions: Subject<Undefined<V>>;

  private listeners: Subject<Undefined<V>>;

  private promise$: Promise<Undefined<V>>;

  private resolver?: (value: Undefined<V>) => void;

  constructor(
    public readonly portalContainer: PortalContainer<C>,
    public readonly portalComponent: PortalComponent
  ) {
    this.subscriptions = new Subject();
    this.listeners = new Subject();

    this.container = portalContainer.componentRef.instance;

    this.promise$ = Promise.resolve(undefined);
  }

  public get visible(): boolean {
    return this.container.visible;
  }

  public open(delayInMs = 0): void {
    this.container.open(delayInMs);

    this.promise$ = new Promise<Undefined<V>>((resolver) => {
      this.resolver = resolver;
    });
  }

  public close(delayInMs = 0): void {
    this.container.close(delayInMs);
  }

  public waiting(): Promise<Undefined<V>> {
    return this.promise$;
  }

  public resolve(value?: V): void {
    if (this.resolver) {
      this.resolver(value);
    }
  }

  public subscribe(subscriber: RlsPortalCallback<V>): Unsubscription {
    const subscription = this.subscriptions.subscribe(subscriber);

    return () => {
      subscription.unsubscribe();
    };
  }

  public emit(event?: V): void {
    this.listeners.next(event);
  }

  public receive(listener: RlsPortalCallback<V>): Unsubscription {
    const subscription = this.listeners.subscribe(listener);

    return () => {
      subscription.unsubscribe();
    };
  }

  public send(event?: V): void {
    this.subscriptions.next(event);
  }

  public destroy(): void {
    this.subscriptions.complete();
    this.listeners.complete();

    this.portalContainer.destroy();
    this.portalComponent.destroy();
  }
}

export class RlsPortalComponent<T> {
  private componentRef: ComponentRef<T>;

  private overlayRef: OverlayRef;

  constructor(componentType: ComponentType<T>, overlay: Overlay) {
    const componentPortal = new ComponentPortal(componentType);

    this.overlayRef = overlay.create();

    this.componentRef = this.overlayRef.attach(componentPortal);
  }

  public get instance(): T {
    return this.componentRef.instance;
  }

  public destroy(): void {
    this.componentRef.destroy();
    this.overlayRef.dispose();
  }
}
