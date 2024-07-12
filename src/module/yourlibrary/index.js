import React from 'react'
import styles from './yourlibrary.module.scss';
import YourlibraryDetails from './yourlibraryDetails';
export default function Yourlibrary() {
    return (
        <div>
            <div className="container">
                <div className={styles.yourlibrarybreadcumbalignment}>
                    <span>Writertools</span>
                    <span>/</span>
                    <span>Library</span>
                </div>
            </div>
            <YourlibraryDetails/>
        </div>
    )
}
