import { Component } from '@angular/core';
import { AvailableIcons, IconsEnum } from '@ithinkicon/ithinkicon';

@Component({
  selector: 'iti-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'web';

  availableIcons: AvailableIcons[] = Object.keys(IconsEnum).filter(
    (i) => !Number(i) && i !== '0'
  ) as AvailableIcons[];
}
