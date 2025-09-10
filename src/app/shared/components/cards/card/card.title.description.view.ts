import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

export interface ICardTitleDescription {
  identifier: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-card-title-description-view',
  templateUrl: 'card.title.description.view.html',
  styleUrls: ['card.title.description.view.scss'],
  standalone: true,
  imports: [IonIcon, IonItemOption, IonItemOptions, IonItemSliding, IonItem, IonLabel],

})
export class CardTitleDescriptionView {

  @Output() action =  new EventEmitter<string | undefined>();
  @Input() content?: ICardTitleDescription;

  constructor() {
    addIcons({ trash });
  }
}
