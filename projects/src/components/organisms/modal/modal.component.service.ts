import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { RlsPortalService } from '../../../services';
import { OnPortal, RlsPortalProps, RlsPortalPublic } from '../../../types';
import { RlsModalComponent } from './modal.component';

@Injectable({ providedIn: 'root' })
export class RlsModalService {
  constructor(private portalService: RlsPortalService) {}

  public create<V = any>(
    component: ComponentType<OnPortal<V>>,
    props?: RlsPortalProps<RlsModalComponent, OnPortal<V>>
  ): RlsPortalPublic<V> {
    return this.portalService.container<V>({
      component,
      container: RlsModalComponent,
      props
    });
  }
}
