import { ThemeContext } from '../../Defaulayout/Defaulayout';
import { useContext } from 'react';
import PropTypes from 'prop-types';
function PageMusic({ children }) {
   const theme = useContext(ThemeContext);
   const styleObject = {
      backgroundImage: theme.dataBackgroud.background,
      position: 'fixed',
      backgroundSize:'cover',
      width: '100%',
      height: '100%',
      color: 'white',
      backgroundRepeat: 'no-repeat'
   };
   
   return (
      <div style={styleObject}>
         {children}
      </div>
   );
}
PageMusic.propTypes = {
   children: PropTypes.node.isRequired,
};
export default PageMusic;
