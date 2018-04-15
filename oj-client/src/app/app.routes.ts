import { Routes, RouterModule } from '@angular/router';
import {ProblemListComponent} from './component/problem-list/problem-list.component';
import {ProblemDetailComponent} from './component/problem-detail/problem-detail.component';
import {CallbackComponent} from "./component/callback/callback.component";
import {ProfileComponent} from "./component/profile/profile.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'problems',
    pathMatch: 'full'
  },
  {
    path: 'problems',
    component: ProblemListComponent
  },
  {
    path: 'problems/:id',
    component: ProblemDetailComponent
  },{
    path: 'callback',
    component: CallbackComponent
  },{
    path: 'profile',
    component: ProfileComponent,
    canActivate: ['authGuard']
  },
  {
    path: '**',
    redirectTo: 'problems',
  }
];
export const routing = RouterModule.forRoot(routes);
