// Importation des hooks et composants nécessaires depuis React et d'autres fichiers de composants
import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

// Importation du fichier de styles CSS
import "./style.css";

// Constante définissant le nombre d'éléments par page
const PER_PAGE = 9;

const EventList = () => {
  // Récupération des données et de l'erreur (le cas échéant) depuis le contexte DataContext
  const { data, error } = useData();

  // Déclaration des états locaux pour le type d'événement et la page actuelle
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrage des événements en fonction du type sélectionné et de la page actuelle
  const filteredEvents = (
    (!type
      ? data?.events
      : // Permet de filtrer les événements en fonction de leur type
        data?.events.filter((event) => event.type === type)) || []
  ).filter((events, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });

  // Fonction pour changer le type d'événement, réinitialiser la page à 1
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  // Calcul du nombre de pages en fonction du nombre total d'événements filtrés
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;

  // Création d'une liste unique de types d'événements à partir des données
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          {/* Titre pour le sélecteur de catégories */}
          <h3 className="SelectTitle">Catégories</h3>

          {/* Composant Select pour choisir le type d'événement */}
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />

          {/* Conteneur pour la liste des événements */}
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              // Composant Modal pour afficher les détails de l'événement lorsqu'on clique dessus
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  // Composant EventCard pour afficher un aperçu de l'événement
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>

          {/* Pagination pour naviguer entre les pages d'événements */}
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
