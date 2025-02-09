import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/Lobby.module.css';
import Combatiente, { Equipment } from '../interfaces/Combatiente';
import combatientesData from '../data/combatiente.json';

// Importa las imágenes de los héroes
import magoFuego from '../assets/MagoFuego.png';
import picaroMachete from '../assets/PícaroMachete.png';
import barbaroTanque from '../assets/BarbaroTanque.png';
import picaroVeneno from '../assets/PicaroVeneno.png';
import barbaroArmas from '../assets/Barbaro.png';
import magoHielo from '../assets/MagoHielo.png';
import { Router } from '../../Router/Router';

interface LobbyProps {
  onStartGame: (selectedHero: Combatiente) => void;
  onEquipHero: (selectedHero: Combatiente) => void;
  onHeroSelect: (heroId: string) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onStartGame, onEquipHero, onHeroSelect }) => {
  const [heroes, setHeroes] = useState<Combatiente[]>([]);
  const [selectedHero, setSelectedHero] = useState<Combatiente | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Inicializar héroes con equippedItems y estadísticas base
    const initialHeroes: Combatiente[] = combatientesData.map(hero => ({
      ...hero,
      equippedItems: {
        armor1: null,
        armor2: null,
        weapon: null
      },
      baseAttack: hero.attack,
      baseDefense: hero.defense,
      baseHealth: hero.health,
      baseMaxHealth: hero.maxHealth
    }));
    setHeroes(initialHeroes);

    // Verificar si hay un héroe seleccionado en el estado de la ubicación
    if (location.state?.selectedHero) {
      setSelectedHero(location.state.selectedHero);
    }
  }, [location.state]);

  const heroImages: { [key: string]: string } = {
    "Fuego": magoFuego,
    "Machete": picaroMachete,
    "Tanque": barbaroTanque,
    "Veneno": picaroVeneno,
    "Armas": barbaroArmas,
    "Hielo": magoHielo
  };

  const handleHeroSelect = (hero: Combatiente) => {
    const updatedHero = {
      ...hero,
      baseAttack: hero.attack,
      baseDefense: hero.defense,
      baseHealth: hero.health,
      baseMaxHealth: hero.maxHealth
    };
    setSelectedHero(prevHero => prevHero && prevHero._id === hero._id ? null : updatedHero);
    onHeroSelect(hero._id);
  };

  const handleStartGame = () => {
    if (selectedHero) {
      onStartGame(selectedHero);
    }
    navigate(Router.modosdejuego)
  };

  const handleEquipHero = () => {
    if (selectedHero) {
      onEquipHero(selectedHero);
      navigate(Router.bolsa, { 
        state: { 
          hero: selectedHero,
          heroesData: heroes // Pasar todos los héroes al inventario
        }
      });
    }
  };

  // Actualizar el héroe en la lista de héroes cuando regrese del inventario
  useEffect(() => {
    if (location.state?.selectedHero) {
      setHeroes(prevHeroes => 
        prevHeroes.map(hero => 
          hero._id === location.state.selectedHero._id ? location.state.selectedHero : hero
        )
      );
      setSelectedHero(location.state.selectedHero);
    }
  }, [location.state]);

  return (
    <div className={styles.lobbyContent}>
      <h1 className={styles.gameTitle}>The Nexus Battle III</h1>
      <p className={styles.selectHeroText}>Selecciona tu héroe</p>
      <div className={styles.heroesArena}>
        {heroes.map((hero) => (
          <div
            key={hero._id}
            className={`${styles.heroCard} ${selectedHero && selectedHero._id === hero._id ? styles.flipped : ''}`}
            onClick={() => handleHeroSelect(hero)}
          >
            <div className={styles.heroCardInner}>
              <div className={styles.heroCardFront}>
                <img className={styles.heroImage} src={heroImages[hero.type]} alt={hero.name} />
                <div className={styles.heroInfo}>
                  <h3 className={styles.heroName}>{hero.name}</h3>
                  <p className={styles.heroType}>{hero.type}</p>
                </div>
              </div>
              <div className={styles.heroCardBack}>
                <h3>{hero.name}</h3>
                <div className={styles.heroStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Lvl:</span>
                    <span className={styles.statValue}>{hero.level}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Atk:</span>
                    <span className={styles.statValue}>{hero.attack}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Def:</span>
                    <span className={styles.statValue}>{hero.defense}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Hp:</span>
                    <span className={styles.statValue}>{hero.health}/{hero.maxHealth}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Pws:</span>
                    <span className={styles.statValue}>{hero.powerPoints}</span>
                  </div>
                </div>
                <div className={styles.heroType}>{hero.type}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button 
          className={styles.equipButton}
          onClick={handleEquipHero}
          disabled={!selectedHero}
        >
          Equipar héroe
        </button>
        <button 
          className={styles.battleButton}
          onClick={handleStartGame}
          disabled={!selectedHero}
        >
          ¡A la batalla!
        </button>
      </div>
    </div>
  );
};

export default Lobby;