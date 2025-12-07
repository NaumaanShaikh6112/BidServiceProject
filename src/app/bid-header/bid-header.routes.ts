import { Routes } from '@angular/router';
import { BidListComponent } from './components/bid-list/bid-list.component';
import { BidHeaderFormComponent } from './components/bid-header-form/bid-header-form.component';

export const BID_HEADER_ROUTES: Routes = [
  {
    path: '',
    component: BidListComponent
  },
  {
    path: 'new',
    component: BidHeaderFormComponent
  },
  {
    path: 'edit/:id',
    component: BidHeaderFormComponent
  }
];
