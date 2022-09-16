import { useContext, memo } from 'react';
import { ThemeContext } from '../Defaulayout';
import styles from '../MenuMusicPlay/MusicPlay.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);
function MenuMusicPlay() {
   const dataColor = useContext(ThemeContext).dataColor;
   const handleClickExit = useContext(ThemeContext).handleClickExit;
   return (
      <div className={cx('menu')} style={dataColor}>
         <div className={cx('color-web')}>
            <button>
               <span>Web Nhạc Free</span>
               <h3>Đặng Đình Tuân 2001</h3>
            </button>
            <button className={cx('button-set-color')} onClick={handleClickExit}>
               Giao diện
            </button>
         </div>
         <ul className={cx('list-menu')}>
            <li>
               <NavLink to="/" className={(nav) => cx('item-menu', { active: nav.isActive })}>
                  HOME
               </NavLink>
            </li>
            <li>
               <NavLink className={(nav) => cx('item-menu', { active: nav.isActive })} to="/musicrap">
                  MUSIC RAP
               </NavLink>
            </li>
            <li>
               <NavLink className={(nav) => cx('item-menu', { active: nav.isActive })} to="/musicchill">
                  MUSIC CHILL
               </NavLink>
            </li>
            <li>
               <NavLink className={(nav) => cx('item-menu', { active: nav.isActive })} to="/musiclol">
                  MUSIC GAME
               </NavLink>
            </li>
            <li>
               <NavLink className={(nav) => cx('item-menu', { active: nav.isActive })} to="/musicus">
                  MUSIC US/UK
               </NavLink>
            </li>
            <li>
               <NavLink className={(nav) => cx('item-menu', { active: nav.isActive })} to="/yeuthich">
                  Yêu thích
               </NavLink>
            </li>
         </ul>
      </div>
   );
}
export default memo(MenuMusicPlay);
