import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-bar',
  templateUrl: './mobile-bar.component.html',
  styleUrls: ['./mobile-bar.component.css']
})
export class MobileBarComponent {

  @Output() toggleMobileSidebar = new EventEmitter<boolean>();
  toggleMobileSidebarOption: boolean = false;

  sendMobileNavbarOption(value: boolean){
    this.toggleMobileSidebar.emit(value);
    this.toggleMobileSidebarOption = value;
  }
  
}
