import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { RlsPortalService } from '../../../services';
import { OnPortal, RlsPortalProps, RlsPortalPublic } from '../../../types';
import { RlsModalComponent } from './modal.component';

@Injectable({ providedIn: 'root' })
export class RlsModalService {
  constructor(private portalService: RlsPortalService) {}

  public create<T extends OnPortal>(
    component: ComponentType<T>,
    props?: RlsPortalProps<RlsModalComponent, T>
  ): RlsPortalPublic {
    return this.portalService.container({
      component,
      container: RlsModalComponent,
      props
    });
  }
}
