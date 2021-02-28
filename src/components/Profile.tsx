import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../style/components/Profile.module.css'

export function Profile(){

    const{ level } = useContext(ChallengeContext);

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/imnotannamaria.png" alt="Anna Maria"/>
            <div>
                <strong>Anna Maria</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    {level}
                </p>
            </div>
        </div>
    );
}