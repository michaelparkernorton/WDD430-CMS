import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loadedFeature = 'contact';

  
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
