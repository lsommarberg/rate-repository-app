import React from 'react';
import { View, Image, StyleSheet, Linking, Pressable } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

export const RepositoryLink = ({ url }) => {
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <View>
      <Pressable style={styles.button} onPress={handlePress}>
      <Text color="white" fontWeight="bold" textAlign="center" onPress={handlePress}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

export const RepositoryHeader = ({ fullName, description, ownerAvatarUrl, language }) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
      <Image
        source={{ uri: ownerAvatarUrl }}
        style={styles.avatar}
      />
      <View >
        <Text fontWeight="bold" fontSize="subheading">{fullName}</Text>
        <Text color="textSecondary">{description}</Text>
        <LanguageTag language={language} />
      </View>
    </View>
  );
};

export const LanguageTag = ({ language }) => {
  return (
    <View style={styles.languageTag}>
      <Text color="white"> {language}</Text>
    </View>
  );
};

export const RepositoryStats = ({ stars, forks, reviews, rating }) => {
  const formatThousands = value => {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value);
  };

  return (
    <View style={styles.statsContainer}>
      <StatItem label="Stars" count={formatThousands(stars)} />
      <StatItem label="Forks" count={formatThousands(forks)} />
      <StatItem label="Reviews" count={reviews} />
      <StatItem label="Rating" count={rating} />
    </View>
  );
};

export const StatItem = ({ label, count }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text fontWeight="bold">{count}</Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};


export const styles = StyleSheet.create({
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 5,
      marginRight: 10,
    },
    languageTag: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.primary,
      borderRadius: 4,
      padding: 5,
      marginTop: 5,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
  });