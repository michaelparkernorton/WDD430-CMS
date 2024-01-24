import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrl: './app.component.css'
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();
  
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

}
