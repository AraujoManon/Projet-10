import React from "react"; // Importation du module React pour créer des composants React
import Button from "../../components/Button"; // Importation du composant Button depuis le dossier des composants
import Logo from "../../components/Logo"; // Importation du composant Logo depuis le dossier des composants
import "./style.scss"; // Importation du fichier de style local (SCSS)

const Menu = () => {
  // Définition de la fonction handleClick qui sera appelée lors du clic sur le bouton "Contact"
  const handleClick = () => {
    window.location.assign("#contact"); // Redirection de la page vers l'ancre "#contact"
  };

  return (
    <nav>
      {" "}
      {/* Balise de navigation principale */}
      <Logo /> {/* Affichage du composant Logo dans la navigation */}
      <ul>
        {" "}
        {/* Liste non ordonnée des éléments de navigation */}
        <li>
          <a href="#nos-services">Nos services</a>{" "}
          {/* Lien vers la section "Nos services" */}
        </li>
        <li>
          <a href="#nos-realisations">Nos réalisations</a>{" "}
          {/* Lien vers la section "Nos réalisations" */}
        </li>
        <li>
          <a href="#notre-equipe">Notre équipe</a>{" "}
          {/* Lien vers la section "Notre équipe" */}
        </li>
      </ul>
      {/* Utilisation du composant Button pour afficher un bouton "Contact" */}
      <Button title="contact" onClick={handleClick}>
        Contact
      </Button>
    </nav>
  );
};

export default Menu; // Exportation du composant Menu par défaut
