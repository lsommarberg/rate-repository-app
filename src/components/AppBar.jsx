import React from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { useNavigate } from 'react-router-native'; 
import theme from '../theme';
import { USER } from '../graphql/queries';
import { useQuery, useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const AppBar = () => {
  const { data } = useQuery(USER);
  const isAuthenticated = data?.me ? true : false;
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/signin');
  };
  

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Pressable onPress={() => navigate('/')}>
          <Text fontSize="subheading" fontWeight="bold" color="white" style={styles.menuItem}>
            Repositories
          </Text>
        </Pressable>
        {!isAuthenticated && (
          <>
            <Pressable onPress={() => navigate('/signin')}>
              <Text fontSize="subheading" fontWeight="bold" color="white" style={styles.menuItem}>
                Sign In
              </Text>
            </Pressable>
            <Pressable onPress={() => navigate('/signup')}>
              <Text fontSize="subheading" fontWeight="bold" color="white" style={styles.menuItem}>
                Sign Up
              </Text>
            </Pressable>
          </>
        )}
        {isAuthenticated && (
          <>
            <Pressable onPress={handleSignOut}>
              <Text fontSize="subheading" fontWeight="bold" color="white" style={styles.menuItem}>
                Sign Out
              </Text>
            </Pressable>
            <Pressable onPress={() => navigate('/createreview')}>
              <Text fontSize="subheading" fontWeight="bold" color="white" style={styles.menuItem}>
                Create a review
              </Text>
            </Pressable>
            <Pressable onPress={() => navigate('/myreviews')}>
              <Text fontSize="subheading" fontWeight="bold" color="white" style={styles.menuItem}>
                My reviews
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textPrimary,
    paddingTop: 40, 
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  menuItem: {
    marginRight: 20,
    paddingVertical: 15,
  },
});

export default AppBar;
