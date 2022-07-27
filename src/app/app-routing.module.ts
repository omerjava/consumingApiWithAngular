import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { UsersComponent } from './component/users/users.component';
import { UserResolver } from './service/user.resolver';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'user/:uuid', component: UserDetailComponent, resolve: {resolvedResponse: UserResolver} },
  { path: '**', redirectTo: 'users'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
