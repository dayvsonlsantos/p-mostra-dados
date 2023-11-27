import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // (en) Receives the necessary data for the navbar.
  @Input() profile_picture!:string;
  @Input() profileType!:string;
  @Input() username!:string;

}
