import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() menuOption = new EventEmitter<string>();
  menuOptionValue:string = 'dashboard'

  sendMenuOption(value: string){
    this.menuOption.emit(value);
    this.menuOptionValue = value;
  }

  @Input() toggleMobileSidebarOption: boolean = false;
  @Input() profile_picture!:string;
  @Input() profileType!:string;
  @Input() username!:string;

}
