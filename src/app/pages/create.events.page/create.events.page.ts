import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import pageIdentifier from '@shared/components/tabs/tabs.identifier';

@Component({
  selector: 'app-create.events.page',
  templateUrl: 'create.events.page.html',
  styleUrls: ['create.events.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})
export class CreateEventsPage {

  title = pageIdentifier["listEventPage"].title;
  constructor() {}
}import { shapes } from 'ionicons/icons';

