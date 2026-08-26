import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { TaxpayerList } from './pages/taxpayer-list/taxpayer-list';
import { TaxpayerForm } from './pages/taxpayer-form/taxpayer-form';
import { Login } from './pages/login/login';
import { AdminProfile } from './pages/admin-profile/admin-profile';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Dashboard, canActivate: [authGuard] },
  { path: 'taxpayers', component: TaxpayerList, canActivate: [authGuard] },
  { path: 'taxpayers/new', component: TaxpayerForm, canActivate: [authGuard] },
  { path: 'taxpayers/:id/edit', component: TaxpayerForm, canActivate: [authGuard] },
  { path: 'admin/profile', component: AdminProfile, canActivate: [authGuard] },
];