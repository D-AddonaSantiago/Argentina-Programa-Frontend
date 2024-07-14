import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LinksNavComponent } from './components/header/links-nav/links-nav.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './components/banner/banner.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProyectsComponent } from './components/proyects/proyects.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { interceptorProvider } from './service/interceptor-service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LinksNavComponent,
    LoginComponent,
    BannerComponent,
    AboutMeComponent,
    WorkExperienceComponent,
    EducationComponent,
    SkillsComponent,
    ProyectsComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
