import React from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { useNavigate } from 'react-router-native'; 
import theme from '../theme';

const AppBar = () => {
  const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Pressable  onPress={() => navigate('/')}>
          <Text fontSize="subheading" fontWeight="bold" color="white" style={styles.menuItem}>
            Repositories
          </Text>
        </Pressable>
        <Pressable onPress={() => navigate('/signin')}>
          <Text fontSize="subheading" fontWeight="bold" color="white" style={styles.menuItem}>
            Sign in
          </Text>
        </Pressable>
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
