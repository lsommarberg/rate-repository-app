import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from '../Text';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import RepositoryListHeader from './RepositoryListHeader';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchInput: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: props.searchQuery,
    };
    this.navigate = props.navigate;
  }

  handlePress = (id) => {
    this.navigate(`/${id}`);
  };

  renderHeader = () => {
    const { orderBy, setOrderBy, orderDirection, setOrderDirection, setSearchQuery, searchQuery } = this.props;

    return (
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search repositories"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          autoCapitalize='none'
        />
        <RepositoryListHeader
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
        />
      </View>
    );
  };

  render() {
    const { repositories } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <Pressable onPress={() => this.handlePress(item.id)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

const RepositoryList = () => {
  const navigate = useNavigate();
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { repositories, loading, error } = useRepositories(orderDirection, orderBy, debouncedSearchQuery);

  if (error) {
    return <Text fontWeight="bold" fontSize="subheading">Error: {error.message}</Text>;
  }

  if (loading) {
    return <Text fontWeight="bold" fontSize="subheading">Loading...</Text>;
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
      navigate={navigate}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;