import { Component } from '@angular/core';

import { PoMenuItem, PoMenuPanelItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Primeiro';

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/', icon: 'po-icon-home'},
    { label: 'Clientes', link: 'clientes/novo/',  icon: 'po-icon-user' },
  ];
}
