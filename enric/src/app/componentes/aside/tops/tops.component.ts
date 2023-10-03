import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tops',
  templateUrl: './tops.component.html',
  styleUrls: ['./tops.component.css']
})
export class TopsComponent {
  @Input() titulo: string | undefined;
  @Input() query: string |undefined;
}
