import { INavigationItem } from '../interfaces/INavigationItem.interface';
import { Record } from 'immutable';

const defaultValues: INavigationItem = {
  routerLink: '',
  title: '',
  classNames: undefined,
  activeClassNames: undefined,
};

export class NavigationItem extends Record<INavigationItem>(defaultValues) {}
