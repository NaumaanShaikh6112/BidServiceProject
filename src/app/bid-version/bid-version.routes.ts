import { Routes } from '@angular/router';
import { VersionListComponent } from './Components/version-list/version-list.component';
import { VersionFormComponent } from './Components/version-form/version-form.component';

export const BID_VERSION_ROUTES: Routes = [
  {
    path: '',
    component: VersionListComponent
  },
  {
    path: 'new',
    component: VersionFormComponent
  },
  {
    path: 'edit/:id',
    component: VersionFormComponent
  }
];
