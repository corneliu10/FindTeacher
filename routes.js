import {
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Calendar from './screens/Calendar';

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
    Calendar: {
        screen: Calendar
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
