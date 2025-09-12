import { CardTitleDescriptionViewComponent } from "@shared/components/cards/card/card.title.description.view";

// Inversão de dependencia com o component de card para preservar sua implementacao e tornar o modelo vindo do app (cliente) aceitavel.
export default interface EventPartialModel extends CardTitleDescriptionViewComponent {
  id: string;
  title: string;
  date: string;
}
