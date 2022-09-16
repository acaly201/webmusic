import { useState, useRef, createContext, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slide from './slide';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import dataColors from './DataCoLor';
import dataImg from './DataImg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../Defaulayout/Defaulayout.module.scss';
import imgMacDinh from './imgmacdinh.jpg';
import MenuMusicPlay from './MenuMusicPlay';
import DataAudio from '../Audio/dataAudio';
import {
   faMusic,
   faShuffle,
   faBackwardFast,
   faCirclePlay,
   faCirclePause,
   faForwardFast,
   faRepeat,
   fa1,
   faHeart,
   faCircleDown,
   faCircleUp,
   faCircleXmark,
   faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

library.add(
   faMusic,
   faChevronDown,
   faCircleXmark,
   faShuffle,
   faBackwardFast,
   faCirclePlay,
   faCirclePause,
   faForwardFast,
   faRepeat,
   fa1,
   faHeart,
   faCircleDown,
   faCircleUp,
);
const cx = classNames.bind(styles);
export const ThemeContext = createContext();

function Defaulayout({ children, nameApi, title, audioCustom }) {
   const audioRef = useRef();
   const divRef = useRef();
   const [dataAudio, setDataAudio] = useState([1]);
   const [indexAudio, setIndexAudio] = useState(0);
   const [audioPlay, setAudioPlay] = useState({
      id: 1,
      src: '',
      name: 'Tên bài hát',
      user: 'Tên ca sĩ',
      img: imgMacDinh,
      lyrics: 'Chưa có lời bài hát',
   });
   /*const [songCurrrentTime, setSongCurrentTime] = useState(0);*/
   const [audioRanDom, setAudioRanDom] = useState(false);
   const [audioPause, setAudioPause] = useState(false);
   const [audioRePeat, setAudioRePeat] = useState(false);
   const [audioLoop, setAudioLoop] = useState(false);
   const [dataColor, setDataColor] = useState(dataColors[0]);
   const [dataBackgroud, setDataBackgroud] = useState(dataImg[0]);
   const [hidePlay, setHidePlay] = useState(true);
   const [fakeRender, setFakeRender] = useState(false);
   const [exit, setExit] = useState(false);
   const [activeLyric, setActiveLyric] = useState(false);
   const [showLyric, setShowLyric] = useState(false);
   useEffect(() => {
      nameApi === 'yeuthich' ? setDataAudio(audioCustom) : setDataAudio(DataAudio[nameApi]);
   }, [nameApi, audioCustom]);

   /*const onTimeUpdate = () => {
      setSongCurrentTime(audioRef.current.currentTime);
   };*/
   const handleStartPlay = () => {
      if (audioRanDom === true) {
         const randomMusic = Math.floor(Math.random() * dataAudio.length);
         setIndexAudio(randomMusic);
         audioRef.current.play();
         setAudioPause(true);
         setHidePlay(false);
         setAudioPlay(dataAudio[randomMusic]);
      } else {
         audioRef.current.play();
         setIndexAudio(0);
         setAudioPause(true);
         setAudioPlay(dataAudio[0]);
         setHidePlay(false);
      }
   };
   const onEndAudio = () => {
      if (audioRanDom === true) {
         if (dataAudio.length === 1) {
            setIndexAudio(0);
            setAudioPlay(dataAudio[0]);
            audioRef.current.play();
         } else {
            const randomMusic = Math.floor(Math.random() * dataAudio.length);
            setIndexAudio(randomMusic);
            setAudioPlay(dataAudio[randomMusic]);
         }
      }
      if (audioRePeat === true) {
         if (indexAudio === dataAudio.length - 1) {
            setIndexAudio(0);
            setAudioPlay(dataAudio[0]);
            audioRef.current.play();
         } else {
            setIndexAudio(indexAudio + 1);
            setAudioPlay(dataAudio[indexAudio + 1]);
         }
      }
      if (indexAudio > dataAudio.length - 1) {
         setIndexAudio(0);
         setAudioPlay(dataAudio[0]);
      }
   };
   const handleAudioRanDom = () => {
      setAudioRanDom(!audioRanDom);
      setAudioRePeat(false);
      setAudioLoop(false);
   };
   const handleAudioRepeat = () => {
      setAudioRanDom(false);
      setAudioRePeat(!audioRePeat);
      setAudioLoop(false);
   };
   const handleAudioLoop = () => {
      setAudioRanDom(false);
      setAudioRePeat(false);
      setAudioLoop(!audioLoop);
   };
   const handleBefore = () => {
      if (indexAudio === 0) {
         setIndexAudio(dataAudio.length - 1);
         setAudioPlay(dataAudio[dataAudio.length - 1]);
      } else {
         setIndexAudio(indexAudio - 1);
         setAudioPlay(dataAudio[indexAudio - 1]);
      }
   };
   const handleAfter = () => {
      if (indexAudio === dataAudio.length - 1) {
         setIndexAudio(0);
         setAudioPlay(dataAudio[0]);
      } else {
         setIndexAudio(indexAudio + 1);
         setAudioPlay(dataAudio[indexAudio + 1]);
      }
   };
   const handleAudioPauseAndPlay = () => {
      setAudioPause(!audioPause);
      setHidePlay(false);
      if (audioPlay.name === 'Tên bài hát' && audioPause === false) {
         audioRef.current.play();
         setIndexAudio(0);
         setAudioPause(true);
         setAudioPlay(dataAudio[0]);
      }
      if (audioPause === false) {
         audioRef.current.play();
      } else {
         audioRef.current.pause();
      }
   };
   const handleDataAudio = (audio, index) => {
      if(index!==indexAudio) {
         setAudioPause(true)
      } else {
         setAudioPause(!audioPause);
         if (audioPause === false) {
            audioRef.current.play();
         } else {
            audioRef.current.pause();
         }
      }
      
      setHidePlay(false)
      setIndexAudio(index);
      setAudioPlay(dataAudio[index]);
   };
   const handleClickButton = useCallback((value) => {
      setDataColor(value);
   }, []);
   const handleClickBackground = useCallback((value) => {
      setDataBackgroud(value);
   }, []);
   const handleHidePlay = useCallback(() => {
      setHidePlay(!hidePlay);
   }, [hidePlay]);
   const handleClickExit = useCallback(() => {
      setExit(!exit);
   }, [exit]);
   const handleAddHeart = (audio) => {
      setFakeRender(!fakeRender);
      if (audioCustom.some((value) => value.name === audio.name) === false) {
         if (audioCustom[0].user === 'Chưa có bài hát yêu thích') {
            audioCustom.shift();
         }
         audioCustom.push({
            id: audio.id,
            src: audio.src,
            name: audio.name,
            user: audio.user,
            img: audio.img,
         });
         const toast = document.createElement('button');
         divRef.current.appendChild(toast);
         setTimeout(() => {
            divRef.current.removeChild(toast);
         }, 3000);
         toast.innerHTML = 'Đã thêm vào yêu thích';
      } else {
         if (audioCustom.length === 1) {
            audioCustom.push({
               id: 1,
               src: '',
               name: 'Tên bài hát',
               user: 'Chưa có bài hát yêu thích',
               img: imgMacDinh,
            });
         }
         for (var i = 0; i < audioCustom.length - 1; i++) {
            if (audioCustom[i].name === audio.name) {
               audioCustom.splice(i, 1);
            }
         }

         const toast = document.createElement('button');
         divRef.current.appendChild(toast);
         setTimeout(() => {
            divRef.current.removeChild(toast);
         }, 3000);
         toast.innerHTML = 'Đã xóa khỏi yêu thích';
      }
   };
   return (
      <ThemeContext.Provider
         value={{
            audioPlay,
            handleStartPlay,
            dataAudio,
            handleDataAudio,
            title,
            indexAudio,
            audioPause,
            handleAudioPauseAndPlay,
            dataColor,
            dataBackgroud,
            handleClickButton,
            hidePlay,
            handleHidePlay,
            audioCustom,
            handleAddHeart,
            handleClickExit, 
         }}
      >
         <div className={cx('web-music')}>
            <div className={cx('options-audio', hidePlay === false ? 'active-options-audio' : '' ,showLyric===true && 'show-full-options-audio')} style={dataColor}>
               {showLyric===true && <div className={cx('box-top-options-audio' )}>
                  <div className={cx('top-box-top-options-audio')}>
                     <ul>
                        <li onClick={() => setActiveLyric(true)} className={cx(activeLyric === true && 'active-lyric')}>
                           Danh sách phát
                        </li>
                        <li
                           onClick={() => setActiveLyric(false)}
                           className={cx(activeLyric === false && 'active-lyric')}
                        >
                           Lời bài hát
                        </li>
                     </ul>
                     <Tippy content="Thoát">
                        <FontAwesomeIcon onClick={()=>setShowLyric(false)} className={cx('icon-top-box-top-options-audio')} icon="chevron-down" />
                     </Tippy>
                  </div>
                  {activeLyric === false ? (
                     <div className={cx('bot-box-top-options-audio')}>
                        <div className={cx('left-bot-box-top-options-audio')}>
                           <img src={audioPlay.img} alt="true" />
                           <h2>{audioPlay.name}</h2>
                           <span>{audioPlay.user}</span>
                        </div>
                        {/*<Lrc
                    style={{ height: "500px" }}
                    lrc={audioPlay.lyrics}
                    autoScroll={true}
                    topBlank={false}
                    bottomBlank={true}
                    currentMillisecond={songCurrrentTime * 1000}
                    lineRenderer={({ index, active, line }) => (
                      <div
                        className="lyric-line"
                        style={{
                          color: active ? "yellow" : "#fff",
                        }}
                      >
                        
                        {line.content}
                      </div>
                     )} /> */}
                        <div className={cx('right-bot-box-top-options-audio')}>{audioPlay.lyrics}</div>
                     </div>
                  ) : (
                     <div className={cx('bot-box-top-options-audio1')}>
                        <Slide />
                     </div>
                  )}
               </div>}
               
               <div className={cx('box-end-options-audio')}>
                  {showLyric===false && <div className={cx('left-options-audio')}>
                     <img src={audioPlay.img} alt="true" />
                     <h3>
                        {audioPlay.name}
                        <span>{audioPlay.user}</span>
                     </h3>
                  </div>}
                  
                  <div className={cx('right-options-audio')}>
                     <div className={cx('icon-audio-play')}>
                        <Tippy content={audioRanDom ? 'Tắt phát ngẫu nhiên' : 'Bật phát ngẫu nhiên'}>
                           <FontAwesomeIcon
                              className={cx('icon-icon-audio-play', audioRanDom && 'active-icon-audio')}
                              onClick={handleAudioRanDom}
                              icon="shuffle"
                           />
                        </Tippy>
                        <Tippy
                           content={
                              <div className={cx('layout-audio-hover')}>
                                 <h4>Bài trước</h4>
                                 <div>
                                    <img
                                       src={
                                          indexAudio <= dataAudio.length - 1 && indexAudio !== 0
                                             ? dataAudio[indexAudio - 1].img
                                             : dataAudio[dataAudio.length - 1].img
                                       }
                                       alt="true"
                                    />
                                    <div>
                                       <span>
                                          {indexAudio <= dataAudio.length - 1 && indexAudio !== 0
                                             ? dataAudio[indexAudio - 1].name
                                             : dataAudio[dataAudio.length - 1].name}
                                       </span>
                                       <h5>
                                          {indexAudio <= dataAudio.length - 1 && indexAudio !== 0
                                             ? dataAudio[indexAudio - 1].user
                                             : dataAudio[dataAudio.length - 1].user}
                                       </h5>
                                    </div>
                                 </div>
                              </div>
                           }
                        >
                           <FontAwesomeIcon
                              className={cx('icon-icon-audio-play')}
                              onClick={handleBefore}
                              icon="backward-fast"
                           />
                        </Tippy>
                        <Tippy content={audioPause ? 'Pause' : 'Play'}>
                           {audioPause ? (
                              <FontAwesomeIcon
                                 className={cx('icon-icon-audio-play', 'active-icon-audio')}
                                 onClick={handleAudioPauseAndPlay}
                                 icon="circle-pause"
                              />
                           ) : (
                              <FontAwesomeIcon
                                 className={cx('icon-icon-audio-play')}
                                 onClick={handleAudioPauseAndPlay}
                                 icon="circle-play"
                              />
                           )}
                        </Tippy>

                        <Tippy
                           content={
                              <div className={cx('layout-audio-hover')}>
                                 <h4>Bài tiếp theo</h4>
                                 <div>
                                    <img
                                       src={
                                          indexAudio >= dataAudio.length - 1
                                             ? dataAudio[0].img
                                             : dataAudio[indexAudio + 1].img
                                       }
                                       alt="true"
                                    />
                                    <div>
                                       <span>
                                          {indexAudio >= dataAudio.length - 1
                                             ? dataAudio[0].name
                                             : dataAudio[indexAudio + 1].name}
                                       </span>
                                       <h5>
                                          {indexAudio >= dataAudio.length - 1
                                             ? dataAudio[0].user
                                             : dataAudio[indexAudio + 1].user}
                                       </h5>
                                    </div>
                                 </div>
                              </div>
                           }
                        >
                           <FontAwesomeIcon
                              className={cx('icon-icon-audio-play')}
                              onClick={handleAfter}
                              icon="forward-fast"
                           />
                        </Tippy>
                        <Tippy content={audioRePeat ? 'Tắt lặp lại tất cả' : 'Bật lặp lại tất cả'}>
                           <FontAwesomeIcon
                              className={cx('icon-icon-audio-play', audioRePeat && 'active-icon-audio')}
                              onClick={handleAudioRepeat}
                              icon="repeat"
                           />
                        </Tippy>

                        {audioLoop ? (
                           <Tippy content="Tắt lặp lại 1 bài">
                              <FontAwesomeIcon
                                 className={cx('icon-icon-audio-play', 'active-icon-audio')}
                                 onClick={handleAudioLoop}
                                 icon="1"
                              />
                           </Tippy>
                        ) : (
                           <Tippy content="Bật lặp lại 1 bài">
                              <FontAwesomeIcon
                                 className={cx('icon-icon-audio-play')}
                                 onClick={handleAudioLoop}
                                 icon="1"
                              />
                           </Tippy>
                        )}
                     </div>

                     

                     <audio
                        className={cx('audio')}
                        ref={audioRef}
                        controls
                        onPlay={() => setAudioPause(true)}
                        onPause={() => setAudioPause(false)}
                        onEnded={onEndAudio}
                        src={audioPlay.src}
                        autoPlay={true}
                        loop={audioLoop && true}
                        preload="true"
   
                        />
                  </div>
                  {showLyric===false && <Tippy content='Lời bài hát'><FontAwesomeIcon onClick={()=>setShowLyric(true)} className={cx('active-lyric1')} icon="music" /></Tippy>}
                  
                  {showLyric===false && <Tippy
                     placement="top-start"
                     content={nameApi === 'yeuthich' ? 'List nhạc yêu thích' : audioPlay.title}
                  >
                     <button className={cx('category')}>Thể Loại</button>
                  </Tippy>}
                  
               
               </div>
            </div>
            <div>{children}</div>
            <div ref={divRef} className={cx('notification')}></div>
            { showLyric===false && (!hidePlay ? (
               <div className={cx('button-hide')} onClick={handleHidePlay}>
                  Ẩn
                  <FontAwesomeIcon icon="circle-down" />
               </div>
            ) : (
               <div className={cx('button-show')} onClick={handleHidePlay}>
                  Hiện
                  <FontAwesomeIcon icon="circle-up" />
               </div>
            ))}
            <MenuMusicPlay />
            <div className={cx('display', exit && 'visible-display')}>
               <div className={cx('backgroud-display')}></div>
               <div className={cx('content-display')}>
                  <div className={cx('top-content-display')}>
                     <ul>
                        <li>
                           <h3>Màu nền Web</h3>
                        </li>
                        <Tippy content="Thoát">
                           <li>
                              {' '}
                              <FontAwesomeIcon onClick={handleClickExit} className={cx('exit')} icon="circle-xmark" />
                           </li>
                        </Tippy>
                     </ul>
                     <div className={cx('menu-color')}>
                        {dataColors.map((value, index) => (
                           <button
                              key={index}
                              className={cx(value.background === dataColor.background && 'activecolor')}
                              style={value}
                              onClick={() => handleClickButton(value)}
                           ></button>
                        ))}
                     </div>
                  </div>
                  <div className={cx('bot-content-display')}>
                     <h3>Hình nền Web</h3>
                     <div className={cx('menu-color1')}>
                        {dataImg.map((value, index) => (
                           <div
                              key={index}
                              className={cx(
                                 'box-menu-color1',
                                 value.background === dataBackgroud.background && 'activecolor',
                              )}
                              style={value}
                              onClick={() => handleClickBackground(value)}
                           ></div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </ThemeContext.Provider>
   );
}
Defaulayout.propTypes = {
   children: PropTypes.node.isRequired,
   title: PropTypes.string,
   audioCustom: PropTypes.array,
};
export default Defaulayout;
