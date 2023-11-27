import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectChartComponent } from './components/select-chart/select-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { FavoriteComponent } from './page/favorite/favorite.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { EmptyChartComponent } from './components/empty-chart/isEmpty.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ChartsComponent } from './components/charts/charts.component';
import { MobileBarComponent } from './components/mobile-bar/mobile-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    SelectChartComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    FavoriteComponent,
    EmptyChartComponent,
    LoadingComponent,
    ChartsComponent,
    MobileBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
