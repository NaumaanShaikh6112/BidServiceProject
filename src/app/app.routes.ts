import { Routes } from '@angular/router';

import { BID_HEADER_ROUTES } from './bid-header/bid-header.routes';

export const routes: Routes = [
  {
    path: 'bid-header',
    children: BID_HEADER_ROUTES
  },

  { path: '', redirectTo: 'bid-header', pathMatch: 'full' },
  { path: '**', redirectTo: 'bid-header' }
];
