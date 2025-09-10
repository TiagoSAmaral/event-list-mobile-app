import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import pageIdentifier from '@shared/components/tabs/tabs.identifier';

@Component({
  selector: 'app-detail.event.page',
  templateUrl: 'detail.event.page.html',
  styleUrls: ['detail.event.page.scss'],
    standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class DetailEventPage {

  title = pageIdentifier["eventDetailPage"].title;;
  constructor() {}
}
