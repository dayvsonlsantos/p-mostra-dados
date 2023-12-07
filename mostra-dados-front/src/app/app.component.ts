import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mostradados - Di2win';

  menuOptionValue: string = 'dashboard';

  receivesMenuOption(value: string) {
    this.menuOptionValue = value;
  }

  toggleMobileSidebarOption: boolean = false;

  receivesToggleMobileNavbar(value: boolean) {
    this.toggleMobileSidebarOption = value;
  }

  profile_picture = '../assets/profilePicture.png';
  username = 'Di2win';
  profileType = 'Admin';
  userID = 1;

  constructor(
    //(en) Retrieves data from the database.
    private dataService: DataService,
  ) { }

  favoriteOptions = {};

  ngOnInit(): void {

    this.dataService.getFavorite(this.userID)
      .subscribe(
        response => {
          this.favoriteOptions = response;
        },
        error => {
          console.error('Erro ao enviar para o servidor:', error);
        }
      );
  }
}
