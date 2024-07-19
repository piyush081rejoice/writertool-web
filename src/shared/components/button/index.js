import React from 'react'
import styles from './button.module.scss';
import classNames from 'classnames';
export default function Button({ text, icon , fill , }) {
    return (
        <div className={ classNames(styles.buttonDesign , fill ? styles.fill : "") }>
            <button aria-label='text'>{text}
                {icon &&
                    <img src={icon} alt='' />
                }
            </button>
        </div>
    )
}
