import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { SearchComponent } from './component/search/search.component';
import { provideHttpClient ,HttpClient,HttpHeaders} from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { DetailsComponent } from './component/details/details.component';
import { TestComponent } from './component/test/test.component';
import { SearchAllComponent } from './component/search-all/search-all.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    DetailsComponent,
    TestComponent,
    SearchAllComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  
    
  ],
  providers: [AuthService,provideHttpClient()],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
