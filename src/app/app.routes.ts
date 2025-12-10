import { Routes } from '@angular/router';
import { BID_HEADER_ROUTES } from './bid-header/bid-header.routes';
import { BID_VERSION_ROUTES } from './bid-version/bid-version.routes';

export const routes: Routes = [
  {
    path: 'bid-header',
    children: BID_HEADER_ROUTES
  },

  {
    path: 'bid-version',
    children: BID_VERSION_ROUTES
  },

  { path: '', redirectTo: 'bid-version', pathMatch: 'full' },
  { path: '**', redirectTo: 'bid-version' },

  { path: '', redirectTo: 'bid-header', pathMatch: 'full' },
  { path: '**', redirectTo: 'bid-header' }
];
