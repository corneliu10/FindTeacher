import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator
} from 'react-navigation';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Chat from "./screens/Chat";

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