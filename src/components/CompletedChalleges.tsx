import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../style/components/CompletedChalleges.module.css'

export function CompletedChalleges(){

    const { challegCompleted } = useContext(ChallengeContext);

    return(
        <div className={styles.CompletedChallegesContainer}>
            <span>Desafios completos</span>
            <span>{challegCompleted}</span>
        </div>
    );
}