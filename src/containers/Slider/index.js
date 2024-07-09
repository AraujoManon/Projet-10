// Importation des hooks useEffect et useState depuis React
import { useEffect, useState } from "react";

// Importation du contexte de données personnalisé
import { useData } from "../../contexts/DataContext";

// Importation de la fonction getMonth depuis les helpers de date
import { getMonth } from "../../helpers/Date";

// Importation des styles CSS spécifiques à ce composant
import "./style.scss";

// Définition du composant Slider
const Slider = () => {
  // Utilisation du hook useData pour obtenir les données du contexte
  const { data } = useData();

  // Déclaration d'un état local pour gérer l'index du slide actuellement affiché
  const [index, setIndex] = useState(0);

  // Tri des événements par date décroissante
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  // Fonction pour passer à la carte suivante après 5 secondes
  const nextCard = () => {
    // Utilisation de setTimeout pour changer l'index après 5 secondes
    setTimeout(
      () => setIndex(index + 1 < byDateDesc.length ? index + 1 : 0),
      5000
    );
  };

  // Utilisation du hook useEffect pour déclencher nextCard à chaque rendu
  useEffect(() => {
    nextCard();
  });

  // Rendu du composant Slider
  return (
    <div className="SlideCardList">
      {/* Itération sur les événements triés pour afficher chaque carte */}
      {byDateDesc?.map((event, idx) => (
        // Utilisation d'un fragment React pour grouper les éléments sans ajouter de nœud supplémentaire dans le DOM
        <>
          {/* Affichage de chaque carte */}
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          {/* Affichage des boutons de pagination */}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // Ajout d'un identifiant unique pour chaque input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  checked={idx === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

// Exportation du composant pour pouvoir l'utiliser dans d'autres parties de l'application
export default Slider;
