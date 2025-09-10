import { Component, Inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonRefresher, RefresherCustomEvent, IonRefresherContent } from '@ionic/angular/standalone';
import pageIdentifier from '@shared/components/tabs/tabs.identifier';
import { CardTitleDescriptionView } from '@shared/components/cards/card/card.title.description.view';
import INetworkRequest, { NETWORK_REQUEST } from '@shared/interfaces/network.request.interface';
import EventModel from '@shared/components/models/event.model';
import ApiRequiriments from '@shared/services/network/api.requiriments';
import IResponseDefault from '@shared/interfaces/response.default';


@Component({
  selector: 'app-list.events',
  templateUrl: 'list.events.page.html',
  styleUrls: ['list.events.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonList, IonHeader, IonToolbar, IonTitle, IonContent, CardTitleDescriptionView],
})
export class ListEventsScenePage {

  title = pageIdentifier["listEventPage"].title;
  content: any[] = [];

  constructor(@Inject(NETWORK_REQUEST) private networkRequest: INetworkRequest) {}

  ionViewDidEnter() {
    this.requestPageContent();
  }

  openDescription = (identifier: string | undefined) => {
    console.log(identifier);
  }

  requestPageContent = (event: RefresherCustomEvent | undefined = undefined) => {
    this.networkRequest.request<IResponseDefault<EventModel[]>>(ApiRequiriments.listEvent()).subscribe(response => {      

      if (response.data == undefined)
        return;

      this.content = [];

      response.data?.forEach( event => {
          const humanDate = new Date(event.date);          
          this.content.push({identifier: event.id,  title: event.title, description: humanDate.toLocaleDateString('pt-BR')});
      });
    });

    event?.target.complete();
  }
}
