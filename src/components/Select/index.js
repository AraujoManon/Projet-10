/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Ces lignes désactivent certaines règles ESLint liées à l'accessibilité.

import { useState } from "react"; // Importation du hook useState de React
import PropTypes from "prop-types"; // Importation de PropTypes pour la validation des props

import "./style.scss"; // Importation du fichier de style CSS

const Select = ({
  selection, // Tableau des options disponibles pour la sélection
  onChange, // Fonction à appeler lorsque la sélection change
  name, // Nom de l'input caché
  titleEmpty, // Booléen indiquant si le titre doit être vide
  label, // Label du composant
  type = "normal", // Type de sélecteur, par défaut "normal"
}) => {
  const [value, setValue] = useState(); // État pour la valeur sélectionnée
  const [collapsed, setCollapsed] = useState(true); // État pour déterminer si le menu est replié

  // Fonction pour changer la valeur sélectionnée
  const changeValue = (newValue) => {
    onChange(newValue); // Appelle la fonction onChange passée en prop
    setValue(newValue); // Met à jour l'état value avec la nouvelle valeur
    setCollapsed(newValue); // Met à jour l'état collapsed
  };

  return (
    <div className={`SelectContainer ${type}`} data-testid="select-testid">
      {label && <div className="label">{label}</div>}{" "}
      {/* Affiche le label si présent */}
      <div className="Select">
        <ul>
          <li className={collapsed ? "SelectTitle--show" : "SelectTitle--hide"}>
            {value || (!titleEmpty && "Toutes")}{" "}
            {/* Affiche la valeur sélectionnée ou "Toutes" si titleEmpty est faux */}
          </li>
          {!collapsed && (
            <>
              {" "}
              {/* Fragment React pour grouper les éléments */}
              {!titleEmpty && (
                <li onClick={() => changeValue(null)}>
                  <input defaultChecked={!value} name="selected" type="radio" />{" "}
                  Toutes {/* Option pour réinitialiser la sélection */}
                </li>
              )}
              {selection.map((s) => (
                <li key={s} onClick={() => changeValue(s)}>
                  <input
                    defaultChecked={value === s}
                    name="selected"
                    type="radio"
                  />{" "}
                  {s} {/* Affiche chaque option de sélection */}
                </li>
              ))}
            </>
          )}
        </ul>
        <input type="hidden" value={value || ""} name={name} />{" "}
        {/* Input caché contenant la valeur sélectionnée */}
        <button
          type="button"
          data-testid="collapse-button-testid"
          className={collapsed ? "open" : "close"}
          onClick={(e) => {
            e.preventDefault(); // Empêche le comportement par défaut du bouton
            setCollapsed(!collapsed); // Inverse l'état collapsed pour afficher ou cacher les options
          }}
        >
          <Arrow /> {/* Affiche le composant Arrow */}
        </button>
      </div>
    </div>
  );
};

// Composant Arrow qui dessine une flèche SVG
const Arrow = () => (
  <svg
    width="21"
    height="11"
    viewBox="0 0 21 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.2819 10.9843C10.213 10.9634 10.1408 10.9491 10.0741 10.9216C9.89304 10.8467 9.86193 10.8038 9.71304 10.6828L0.819902 1.87423C0.727682 1.76309 0.63435 1.64975 0.578794 1.5177C0.383244 1.05114 0.562128 0.462436 0.987675 0.180738C1.35211 -0.0602459 1.85877 -0.0602459 2.22321 0.180738C2.28432 0.220351 2.33542 0.272069 2.39209 0.317185L10.4997 8.34667L18.6062 0.317185L18.7751 0.180738C18.8395 0.146626 18.9006 0.107012 18.9673 0.0795026C19.4373 -0.114165 20.0284 0.057495 20.3173 0.484443C20.5606 0.845368 20.5606 1.34714 20.3173 1.70807C20.2761 1.76749 20.225 1.81921 20.1784 1.87423L11.2852 10.6828C11.2286 10.7279 11.1775 10.7796 11.1163 10.8192C10.9952 10.8996 10.8597 10.9557 10.7164 10.9843C10.5741 11.0118 10.4275 10.9975 10.2819 10.9843Z"
      fill="#5B32FF"
    />
  </svg>
);

// Définition des types attendus pour les props du composant Select
Select.propTypes = {
  selection: PropTypes.arrayOf(PropTypes.string).isRequired, // Tableau de chaînes de caractères (obligatoire)
  onChange: PropTypes.func, // Fonction appelée lors d'un changement de sélection
  name: PropTypes.string, // Nom de l'input caché
  titleEmpty: PropTypes.bool, // Booléen pour définir si le titre est vide ou non
  label: PropTypes.string, // Libellé du composant
  type: PropTypes.string, // Type du composant
};

// Valeurs par défaut pour les props du composant Select
Select.defaultProps = {
  onChange: () => null, // Fonction par défaut pour onChange
  titleEmpty: false, // Titre non vide par défaut
  label: "", // Libellé vide par défaut
  type: "normal", // Type "normal" par défaut
  name: "select", // Nom "select" par défaut
};

// Exportation du composant Select pour l'utiliser dans d'autres fichiers
export default Select;
