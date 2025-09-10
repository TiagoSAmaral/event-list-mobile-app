import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { listSharp, pencilSharp } from 'ionicons/icons';
import pageIdentifier, { PageKey, PageConfig } from '@shared/components/tabs/tabs.identifier';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  childrenIdentifiers: PageConfig[] = [];

  constructor() {
    addIcons({ listSharp, pencilSharp });
    this.setupTabIdentifiers();
  }

  setupTabIdentifiers = () => {
    pageIdentifier["listEventPage"].image = listSharp;
    pageIdentifier["createEventPage"].image = pencilSharp;
    this.childrenIdentifiers = [pageIdentifier["listEventPage"], pageIdentifier["createEventPage"]]
  }
}
