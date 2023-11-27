import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-isEmpty',
  templateUrl: './isEmpty.component.html',
  styleUrls: ['./isEmpty.component.css']
})
export class EmptyChartComponent {
    @Input() cardID!: string;

    @Input() title: string = '';
    @Input() text: string = '';
}
