import { NavigationItem } from '@components/molecules/navigation-vertical/models/NavigationItem.class';
import { Component } from '@angular/core';
import { List } from 'immutable';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss'],
})
export class StartupComponent {
  private readonly _navigationItems: List<NavigationItem>;

  get navigationItems() {
    return this._navigationItems;
  }

  constructor() {
    this._navigationItems = List([
      new NavigationItem({
        routerLink: 'history-local',
        title: 'Workspaces',
      }),
      new NavigationItem({
        routerLink: 'history-git',
        title: 'Clone from Git',
      }),
    ]);
  }
}
