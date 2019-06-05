import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator
} from 'react-navigation';
import { fromLeft, fromRight } from 'react-navigation-transitions';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import ProfileView from './screens/ProfileView';
import EditProfileView from './screens/EditProfileView';
import Chat from "./screens/Chat";
import ChatInbox from "./screens/ChatInbox";
import Menu from './screens/Menu';
import Settings from './screens/Settings';

const MainNavigator = createStackNavigator(
{
    Login: {
        screen: Login,
    },
    Register: {
        screen: Register,
    },
    Home: {
        screen: Home
    },
    Menu: {
        screen: Menu
    },
    ProfileView: {
        screen: ProfileView,
    },
    EditProfileView: {
        screen: EditProfileView,
    },
    Chat: {
        screen: Chat
    },
    ChatInbox: {
        screen: ChatInbox
    },
    Menu: {
        screen: Menu
    },
    ProfileView: {
        screen: ProfileView,
    },
    EditProfileView: {
        screen: EditProfileView,
    },
    Settings: {
        screen: Settings
    }
},
{
    initialRouteName: 'Login',
    headerMode: 'none',
    transparentCard: true,
    cardStyle: { opacity: 1 },
    defaultNavigationOptions: { },
    transitionConfig: () => fromRight(),
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;