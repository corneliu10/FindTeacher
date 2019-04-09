import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import Login from './screens/Login';
import Register from './screens/Register';

const MainNavigator = createStackNavigator(
{
    Login: {
        screen: Login,
    },
    Register: {
        screen: Register,
    },
},
{
    initialRouteName: 'Register',
    headerMode: 'none',
    defaultNavigationOptions: {
    
    }
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;