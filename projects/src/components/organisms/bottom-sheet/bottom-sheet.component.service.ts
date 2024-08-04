import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { RlsPortalService } from '../../../services';
import { OnPortal, RlsPortalProps, RlsPortalPublic } from '../../../types';
import { RlsBottomSheetComponent } from './bottom-sheet.component';

@Injectable({ providedIn: 'root' })
export class RlsBottomSheetService {
  constructor(private portalService: RlsPortalService) {}

  public create<V = any>(
    component: ComponentType<OnPortal<V>>,
    props?: RlsPortalProps<RlsBottomSheetComponent, OnPortal<V>>
  ): RlsPortalPublic<V> {
    return this.portalService.container<V>({
      component,
      container: RlsBottomSheetComponent,
      props
    });
  }
}
