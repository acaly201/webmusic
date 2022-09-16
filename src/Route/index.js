import Home from '../Page/Home'
import PageMusic from '../Page/PageMusic'
import LayoutPage from '../Defaulayout/LayoutPage'
import LayoutHome from '../Defaulayout/LayoutHome'
import AudioYeuThich from '../Audio/YeuThich/audio/audio'



const dataRoute = [
    {path:'/',component:Home,audio:"audiorap",layoutPage:LayoutHome},
    {path:'/musicrap',component:PageMusic ,audio:"audiorap",layoutPage:LayoutPage, title:'List nhạc cho người thích Rap Việt',audioCustom:AudioYeuThich},
    {path:'/musicchill',component:PageMusic,audio:"audiochill",layoutPage:LayoutPage,  title:'List nhạc chill chill',audioCustom:AudioYeuThich},
    {path:'/musiclol',component:PageMusic,audio:"audiogame",layoutPage:LayoutPage,  title: 'List nhạc giải trí chơi Game',audioCustom:AudioYeuThich},
    {path:'/musicus',component:PageMusic,audio:"audious",layoutPage:LayoutPage,  title: 'List nhạc nước ngoài US/UK',audioCustom:AudioYeuThich},
    {path:'/yeuthich',component:PageMusic,audio:"yeuthich",layoutPage:LayoutPage,  title: 'List nhạc yêu thích',audioCustom:AudioYeuThich}
]
export  {dataRoute} 