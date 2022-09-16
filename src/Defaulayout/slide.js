import { useRef ,useEffect} from 'react';
import { useContext } from 'react';
import { ThemeContext } from './Defaulayout';
import styles from './slide.module.scss';
import classNames from 'classnames/bind';
import { SmoothScroll } from './utils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
library.add(faAnglesLeft, faAnglesRight, faCirclePlay, faCirclePause);
const cx = classNames.bind(styles);

function Slide() {
   const sliderRef = useRef();
   const contentRef = useRef();
   const theme = useContext(ThemeContext);
   const handleScrollLeft = () => {
      if (sliderRef.current.scrollLeft > 0) {
         SmoothScroll(sliderRef.current, 300, -contentRef.current.clientWidth * 2, sliderRef.current.scrollLeft);
      }
   };
   const handleScrollRight =()=>{
      const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      if (sliderRef.current.scrollLeft < maxScroll) {     
            SmoothScroll(sliderRef.current, 300, contentRef.current.clientWidth * 2, sliderRef.current.scrollLeft);
      }
   }
   useEffect(()=>{
      sliderRef.current.scrollLeft =  350* theme.indexAudio
   },[theme.indexAudio])

   return (
      <div className={cx('slide')}>
         <FontAwesomeIcon onClick={handleScrollLeft} icon="angles-left" className={cx('slide-icon')} />
         <div className={cx('content-slide')} ref={sliderRef}>
            {theme.dataAudio.map((audio, index) => (
               <div
                  ref={contentRef}
                  key={audio.id}
                  className={cx('box-content-slide', audio.name === theme.audioPlay.name && 'active-box-content-slide')}
               >
                  <div className={cx('img-slide', audio.name === theme.audioPlay.name && 'active-img-slide')}>
                     <img src={audio.img} alt="true" />
                  </div>
                  {audio.name !== theme.audioPlay.name && (
                     <div className={cx('title-box-content-slide')}>
                        <h3>{audio.name}</h3>
                        <span>{audio.user}</span>
                     </div>
                  )}

                  <div
                  onClick={() => theme.handleDataAudio(audio, index)}
                     className={cx(
                        'icon-box-content-slide',
                        audio.name === theme.audioPlay.name && 'active-icon-box-content-slide',
                     )}
                  >
                     {theme.audioPause && index === theme.indexAudio && audio.name === theme.audioPlay.name ? (
                        <FontAwesomeIcon onClick={theme.handleAudioPauseAndPlay} icon="circle-pause" />
                     ) : (
                        <FontAwesomeIcon onClick={theme.handleAudioPauseAndPlay} icon="circle-play" />
                     )}
                  </div>
                  {index === theme.indexAudio && audio.name === theme.audioPlay.name && (
                     <div className={cx('title-box-content-slide1')}>
                        <h3>{audio.name}</h3>
                        <span>{audio.user}</span>
                     </div>
                  )}
               </div>
            ))}
         </div>
         <FontAwesomeIcon onClick={handleScrollRight} icon="angles-right" className={cx('slide-icon')} />
      </div>
   );
}

export default Slide;
