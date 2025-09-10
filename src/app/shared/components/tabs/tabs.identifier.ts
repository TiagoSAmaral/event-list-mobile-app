export type PageConfig = {
  title?: string;
  image?: string;
  route?: string;
};

export type PageKey = "listEventPage" | "createEventPage" | "eventDetailPage";

const pageIdentifier: Record<PageKey, PageConfig> =  {

    listEventPage: {
        title: "Eventos",
        image: undefined,
        route: "tab1"
    },
    createEventPage: {
        title: "Criar Evento",
        image: undefined,
        route: "tab2"
      },
    eventDetailPage:  {
        title: "Criar Evento",
        image: undefined,
        route: undefined
    }
}

export default pageIdentifier;