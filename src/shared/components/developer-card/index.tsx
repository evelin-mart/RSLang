import React from 'react';
import styles from './styles.module.scss';

export const DeveloperCard = (props: {name: string, image: string, description: string}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.front}>
        </div>
        <div className={styles.back}>
          <div className={styles.imageWrapper}>
            <img src={require(`../../images/${props.image}`)} alt="avatar" className={styles.avatar} />
          </div>
          <div className={styles.content}>
            <h4>
              {props.name}
            </h4>
            <p>
              {props.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
