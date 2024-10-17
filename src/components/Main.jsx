import { StyleSheet, View } from 'react-native';

import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './repositories/RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SingleRepository from './repositories/RepositoryInfo';
import CreateReview from './ReviewForm';
import SignUp from './SignUp'
import UserReviews from './UserReviews';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />

      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/createreview" element={<CreateReview />} />
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/myreviews' element={<UserReviews />}/>
      </Routes>
    </View>
  );
};

export default Main;

