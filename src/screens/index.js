import { createStackNavigator } from 'react-navigation';
import Authorization from './Authorization';
import Launch from './Launch';
import Repository from './Repository';
import Search from './Search';

export default (screens = () => ({
  Authorization,
  Landing: createStackNavigator(
    { Search, Repository },
    { initialRouteName: 'Search' }
  ),
  Launch,
}));
