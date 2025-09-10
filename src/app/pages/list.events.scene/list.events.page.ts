import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import pageIdentifier from '@shared/components/tabs/tabs.identifier';

@Component({
  selector: 'app-list.events',
  templateUrl: 'list.events.page.html',
  styleUrls: ['list.events.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class ListEventsScenePage {

  title = pageIdentifier["listEventPage"].title;;
  constructor() {}
}
