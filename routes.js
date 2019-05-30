import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator
} from 'react-navigation';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Chat from "./screens/Chat";
import Settings from "./screens/Settings";

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
    Chat: {
        screen: Chat
    },
    Settings: {
        screen: Settings
    }
},
{
    initialRouteName: 'Login',
    headerMode: 'none',
    defaultNavigationOptions: {

    }
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
