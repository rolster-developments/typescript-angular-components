import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import {
  OnPortalContainer,
  RlsPortalCallback,
  RlsPortalComponentProps,
  RlsPortalContainerProps,
  RlsPortalEvent,
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

export class RlsPortalContainer<T extends OnPortalContainer>
  implements RlsPortalPublic, RlsPortalPrivate
{
  private component: T;

  private subscriptions: Subject<RlsPortalEvent<any>>;

  private listeners: Subject<RlsPortalEvent<any>>;

  constructor(
    public readonly portalContainer: PortalContainer<T>,
    public readonly portalComponent: PortalComponent
  ) {
    this.subscriptions = new Subject();
    this.listeners = new Subject();

    this.component = portalContainer.componentRef.instance;
  }

  public get visible(): boolean {
    return this.component.visible;
  }

  public open(delayInMs = 0): void {
    this.component.open(delayInMs);
  }

  public close(delayInMs = 0): void {
    this.component.close(delayInMs);
  }

  public subscribe<T = any>(subscriber: RlsPortalCallback<T>): Unsubscription {
    const subscription = this.subscriptions.subscribe(subscriber);

    return () => subscription.unsubscribe();
  }

  public emit<T = any>(event: RlsPortalEvent<T>): void {
    this.listeners.next(event);
  }

  public receive<T = any>(subscriber: RlsPortalCallback<T>): Unsubscription {
    const subscription = this.listeners.subscribe(subscriber);

    return () => subscription.unsubscribe();
  }

  public send<T = any>(event: RlsPortalEvent<T>): void {
    this.subscriptions.next(event);
  }

  public destroy(): void {
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
