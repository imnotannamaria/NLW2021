import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountContext } from '../contexts/CountContext';
import styles from '../style/components/ChallengeBox.module.css'

export function ChallengeBox(){

    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext);
    const { resetCount } = useContext(CountContext);

    function handleChallengeSucceded(){
        completeChallenge();
        resetCount();
    }

    function handleChallengeFail(){
        resetChallenge();
        resetCount();
    }

    return(
        <div className={styles.ChallengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.cbActive}>
                    <header>Ganhe {activeChallenge.amount} XP</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button type="button" onClick={handleChallengeFail} className={styles.CFailButton}>Falhei</button>
                        <button type="button" onClick={handleChallengeSucceded} className={styles.CSuccededButton}>Completei</button>
                    </footer>
                </div>
            ) : (
                <div className={styles.cbNotActive}>
                    <strong>Inicie um ciclo para receber desafios a serem completados</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios.
                    </p>
                </div>
            )}
        </div>
    );
}