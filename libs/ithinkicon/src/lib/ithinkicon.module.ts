import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  HostBinding,
  Inject,
  Injectable,
  Injector,
  Input,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';

export enum IconsEnum {
  'edit',
  'triangle',
  'add',
  'search',
  'close',
  'moon',
  'upload',
  'image',
}
export type AvailableIcons = keyof typeof IconsEnum;

const ID_PREFIX = 'dmIcon-';

@Component({
  selector: 'iti-icon',
  template: `
    <svg class="h-full w-full">
      <use [attr.xlink:href]="href"></use>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() set icon(val: AvailableIcons) {
    this.href = `#${ID_PREFIX}${IconsEnum[val]}`;
  }
  @Input() set noFlex(val: boolean) {
    if (val) {
      this.useFlex = false;
    }
  }
  @HostBinding('class.flex') useFlex = true;

  href = '';
}

@Component({
  selector: 'iti-icons',
  templateUrl: './icons.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent {
  Icons: Record<AvailableIcons, string> = Object.entries(IconsEnum).reduce(
    (all, [key, value]) => {
      const icon = key as AvailableIcons;
      all[icon] = `${ID_PREFIX}${value}`;
      return all;
    },
    {} as Record<AvailableIcons, string>
  );
}

@Injectable({ providedIn: 'root' })
export class IconsPortalService {
  iconsRef: ComponentRef<IconsComponent> | null = null;
  iconsPortal: ComponentPortal<IconsComponent> = new ComponentPortal(
    IconsComponent
  );
  bodyPortalOutlet: DomPortalOutlet = new DomPortalOutlet(
    this.document.body,
    this.componentFactoryResolver,
    this.appRef,
    this.injector
  );

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  createRootSvg() {
    if (!this.iconsRef) {
      this.iconsRef = this.bodyPortalOutlet.attach(this.iconsPortal);
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class IThinkIconModule {
  constructor(private sm: IconsPortalService) {
    this.sm.createRootSvg();
  }
  static forRoot(): ModuleWithProviders<IThinkIconModule> {
    return {
      ngModule: IThinkIconModule,
      providers: [IconsPortalService],
    };
  }
}
