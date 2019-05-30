import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator
} from 'react-navigation';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import ProfileView from './screens/ProfileView';
import EditProfileView from './screens/EditProfileView';
import Chat from "./screens/Chat";
import ChatInbox from "./screens/ChatInbox";
import Menu from './screens/Menu';

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
},
{
    initialRouteName: 'Login',
    headerMode: 'none',
    defaultNavigationOptions: {
    
    }
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;