import {
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Menu from './screens/Menu';
import ProfileView from './screens/ProfileView';
import EditProfileView from './screens/EditProfileView';

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
},
{
    initialRouteName: 'Login',
    headerMode: 'none',
    defaultNavigationOptions: {
    
    }
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;