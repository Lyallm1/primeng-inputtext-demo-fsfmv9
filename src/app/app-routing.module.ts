import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ConfigResolverService } from './services/config-resolver.service';

const routes : Routes = [
  { path: 'home', component: HomeComponent, resolve: { config: ConfigResolverService } },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule( {
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
  ],
  exports: [
    RouterModule,
  ],
} )
export class AppRoutingModule { }
