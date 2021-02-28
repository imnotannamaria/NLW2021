import styles from '../style/components/ExperienceBar.module.css'
import { ChallengeContext } from '../contexts/ChallengeContext';
import { useContext } from 'react';

export function ExperienceBar() {

    const{ currentXp, experienceToNextLevel } = useContext(ChallengeContext);

    const percentToNextLevel = Math.round(currentXp * 100) / experienceToNextLevel;

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width:`${percentToNextLevel}%` }}>
                    <span className={styles.currentXP} style={{ left:`${percentToNextLevel}%` }}>
                        {currentXp} xp
                    </span>
                </div>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}