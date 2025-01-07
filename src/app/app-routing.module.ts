import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SearchComponent } from './component/search/search.component';
import { DetailsComponent } from './component/details/details.component';
import { TestComponent } from './component/test/test.component';
import { SearchAllComponent } from './component/search-all/search-all.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect root to 'home'
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'search/:query/:category', component: SearchComponent },
  { path: 'details/:location_id', component: DetailsComponent },
  { path: 'test', component: TestComponent },
  { path: 'search-all/:query', component: SearchAllComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
