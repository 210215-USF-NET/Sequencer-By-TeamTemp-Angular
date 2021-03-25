import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HubComponent } from './Components/pages/hub/hub.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { ProfileComponent } from './Components/pages/profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '', component: InstrumentComponent, data: { title: 'Home' }
  },
  {path: 'hub', component: HubComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
