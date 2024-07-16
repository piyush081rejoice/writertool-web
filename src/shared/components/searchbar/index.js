import React from 'react'
import styles from './searchbar.module.scss';
import SearchIcon from '@/assets/icons/searchIcon';
import { handleSpaceKeyPress } from '@/hooks/usehandleSpaceKeyPress';
const Searchbar = ({searchKeyWord,setSearchKeyWord}) => {
  return (
    <div className={styles.searchbar}>
      <input type='text' placeholder='Search' value={searchKeyWord} onChange={(e)=>setSearchKeyWord(e.target.value)} onKeyDown={handleSpaceKeyPress}/>
      <div className={styles.searchIcon} >
        <SearchIcon/>
      </div>
    </div>
  )
}

export default Searchbar
