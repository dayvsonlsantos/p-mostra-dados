import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_04_echarts';

  menuOptionValue: string = 'dashboard';

  receivesMenuOption(value: string){
    this.menuOptionValue = value;
  }

  toggleMobileSidebarOption: boolean = false;

  receivesToggleMobileNavbar(value: boolean){
    this.toggleMobileSidebarOption = value;
  }

  profile_picture = '../assets/profilePicture.png';
  username = 'Fulano';
  profileType = 'Admin';

}
