import Menu from "../../containers/Menu"; // Import du composant Menu depuis le dossier des containers
import ServiceCard from "../../components/ServiceCard"; // Import du composant ServiceCard depuis le dossier des composants
import EventCard from "../../components/EventCard"; // Import du composant EventCard depuis le dossier des composants
import PeopleCard from "../../components/PeopleCard"; // Import du composant PeopleCard depuis le dossier des composants
import "./style.scss"; // Import du fichier de style local (SCSS)
import EventList from "../../containers/Events"; // Import du composant EventList depuis le dossier des containers
import Slider from "../../containers/Slider"; // Import du composant Slider depuis le dossier des containers
import Logo from "../../components/Logo"; // Import du composant Logo depuis le dossier des composants
import Icon from "../../components/Icon"; // Import du composant Icon depuis le dossier des composants
import Form from "../../containers/Form"; // Import du composant Form depuis le dossier des containers
import Modal from "../../containers/Modal"; // Import du composant Modal depuis le dossier des containers
import { useData } from "../../contexts/DataContext"; // Import du hook useData depuis le contexte DataContext

const Page = () => {
  const { data } = useData();
  // Classification des évènements par date afin de récupérer la dernière prestation
  const last = data?.events.sort(
    (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
  )[0];
  return (
    <>
      {/* En-tête de la page */}
      <header>
        <Menu /> {/* Affichage du menu à l'en-tête de la page */}
      </header>

      {/* Contenu principal de la page */}
      <main>
        {/* Section du Slider pour les événements en vedette */}
        <section className="SliderContainer">
          <Slider />
        </section>

        {/* Section pour présenter les services offerts */}
        <section className="ServicesContainer">
          <h2 className="Title" id="nos-services">
            Nos services
          </h2>
          <p>Nous organisons des événements sur mesure partout dans le monde</p>
          <div className="ListContainer">
            {/* Première ServiceCard : Soirée d'entreprise */}
            <ServiceCard imageSrc="/images/priscilla-du-preez-Q7wGvnbuwj0-unsplash1.png">
              <h3>Soirée d’entreprise</h3>
              Une soirée d’entreprise vous permet de réunir vos équipes pour un
              moment convivial afin de valoriser votre société en projetant une
              image dynamique. Nous vous proposons d’organiser pour vous vos
              diners et soirée d’entreprise
            </ServiceCard>

            {/* Deuxième ServiceCard : Conférences */}
            <ServiceCard imageSrc="/images/hall-expo.png">
              <h3>Conférences</h3>
              724 events vous propose d’organiser votre évènement, quelle que
              soit sa taille, en s’adaptant à votre demande et à vos demandes.
              En tant que spécialistes de l’évènementiel, nous saurons trouver
              le lieu parfait ainsi que des solutions inédites pour capter votre
              audience et faire de cet évènement un succès
            </ServiceCard>

            {/* Troisième ServiceCard : Experience digitale */}
            <ServiceCard imageSrc="/images/sophia-sideri-LFXMtUuAKK8-unsplash1.png">
              <h3>Experience digitale</h3>
              Notre agence experte en contenus immersifs offre des services de
              conseil aux entreprises, pour l’utilisation de la réalité
              virtuelle, de la réalité augmentée et de la réalité mixte de
              l’animation événementielle, à la veille technologique jusqu’au
              développement de module de formation innovant
            </ServiceCard>
          </div>
        </section>

        {/* Section pour présenter les réalisations passées */}
        <section className="EventsContainer">
          <h2 className="Title" id="nos-realisations">
            Nos réalisations
          </h2>
          {/* Utilisation du composant EventList pour afficher la liste des réalisations */}
          <EventList />
        </section>

        {/* Section pour présenter l'équipe */}
        <section className="PeoplesContainer">
          <h2 className="Title" id="notre-equipe">
            Notre équipe
          </h2>
          <p>Une équipe d’experts dédiés à l’organisation de vos événements</p>
          <div className="ListContainer">
            {/* Chaque PeopleCard représente un membre de l'équipe */}
            <PeopleCard
              imageSrc="/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png"
              name="Samira"
              position="CEO"
            />
            <PeopleCard
              imageSrc="/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png"
              name="Jean-baptiste"
              position="Directeur marketing"
            />
            <PeopleCard
              imageSrc="/images/christina-wocintechchat-com-SJvDxw0azqw-unsplash.png"
              name="Alice"
              position="CXO"
            />
            <PeopleCard
              imageSrc="/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.png"
              name="Luís"
              position="Animateur"
            />
            <PeopleCard
              imageSrc="/images/amy-hirschi-b3AYk8HKCl0-unsplash1.png"
              name="Christine"
              position="VP animation"
            />
            <PeopleCard
              imageSrc="/images/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.png"
              name="Isabelle"
              position="VP communication"
            />
          </div>
        </section>

        {/* Section pour le formulaire de contact */}
        <div className="FormContainer" id="contact">
          <h2 className="Title">Contact</h2>
          {/* Utilisation du composant Modal pour afficher un message de succès après soumission du formulaire */}
          <Modal
            Content={
              <div className="ModalMessage--success">
                <div>Message envoyé !</div>
                <p>
                  Merci pour votre message nous tâcherons de vous répondre dans
                  les plus brefs délais
                </p>
              </div>
            }
          >
            {/* Utilisation du composant Form dans le composant Modal */}
            {({ setIsOpened }) => (
              <Form onSuccess={() => setIsOpened(true)} onError={() => null} />
            )}
          </Modal>
        </div>
      </main>

      {/* Pied de page avec des informations supplémentaires */}
      <footer className="row">
        {/* Colonne pour présenter la dernière prestation */}
        <div className="col presta">
          <h3>Notre dernière prestation</h3>
          {/* Utilisation du composant EventCard pour afficher les détails de la dernière prestation */}
          {last && (
            <EventCard
              imageSrc={last?.cover}
              title={last?.title}
              date={new Date(last?.date)}
              small
              label={last?.type}
              data-testid="lastEvent"
            />
          )}
        </div>

        {/* Colonne pour les informations de contact */}
        <div className="col contact">
          <h3>Contactez-nous</h3>
          <address>45 avenue de la République, 75000 Paris</address>{" "}
          {/* Adresse de l'agence */}
          <div>01 23 45 67 89</div> {/* Numéro de téléphone de l'agence */}
          <div>contact@724events.com</div> {/* Adresse e-mail de l'agence */}
          <div>
            {/* Liens vers les réseaux sociaux avec utilisation du composant Icon */}
            <a href="#twitch">
              <Icon name="twitch" /> {/* Icône Twitch */}
            </a>
            <a href="#facebook">
              <Icon name="facebook" /> {/* Icône Facebook */}
            </a>
            <a href="#twitter">
              <Icon name="twitter" /> {/* Icône Twitter */}
            </a>
            <a href="#youtube">
              <Icon name="youtube" /> {/* Icône YouTube */}
            </a>
          </div>
        </div>

        {/* Colonne pour la description de l'agence */}
        <div className="col description">
          <Logo size="large" />{" "}
          {/* Affichage du logo de l'agence en taille large */}
          <p>
            Une agence événementielle proposant des prestations de service
            spécialisées dans la conception et l&apos;organisation de divers
            événements tels que des événements festifs, des manifestations
            sportives et culturelles, des événements professionnels
          </p>
        </div>
      </footer>
    </>
  );
};

export default Page;
