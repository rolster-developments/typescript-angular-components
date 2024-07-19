import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { RlsPortalService } from '../../../services';
import { OnPortal, RlsPortalProps, RlsPortalPublic } from '../../../types';
import { RlsBottomSheetComponent } from './bottom-sheet.component';

@Injectable({ providedIn: 'root' })
export class RlsBottomSheetService {
  constructor(private portalService: RlsPortalService) {}

  public create<T extends OnPortal>(
    component: ComponentType<T>,
    props?: RlsPortalProps<RlsBottomSheetComponent, T>
  ): RlsPortalPublic {
    return this.portalService.container({
      component,
      container: RlsBottomSheetComponent,
      props
    });
  }
}
