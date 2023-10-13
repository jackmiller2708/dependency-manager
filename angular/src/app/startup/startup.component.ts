import { Component, HostBinding } from '@angular/core';
import { NavigationItem } from '@components/molecules/navigation-vertical/models/NavigationItem.class';
import { List } from 'immutable';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss'],
})
export class StartupComponent {
  private readonly _navigationItems: List<NavigationItem>;

  @HostBinding('class')
  private get _classes(): string[] {
    return [
      'max-w-[900px]',
      'max-h-[750px]',
      'flex',
      'justify-center',
      'w-full',
      'h-full',
      'px-8',
      'pt-10',
      'gap-5',
      'select-none',
    ];
  }

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
