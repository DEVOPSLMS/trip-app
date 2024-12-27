import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { SearchComponent } from './component/search/search.component';
import { provideHttpClient ,HttpClient,HttpHeaders} from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { DetailsComponent } from './component/details/details.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    DetailsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    
  ],
  providers: [AuthService,provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
