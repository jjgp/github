import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { graphql, QueryRenderer } from 'react-relay';
import environment from '../api/v4/environment';
import Colors from '../common/colors';
import RepositoryList from '../components/Search/RepositoryList';

const COUNT = 50;

const Search = () => {
  let [search, setSearch] = useState('react');
  const renderActivityIndicator = () => (
    <View style={styles.indicatorView}>
      <ActivityIndicator />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {search ? (
        <View style={styles.searchView}>
          <QueryRenderer
            environment={environment}
            query={query}
            render={({ error, props }) => {
              if (!props) return renderActivityIndicator();
              if (error) return <Text>{error}</Text>;
              return <RepositoryList count={COUNT} repositories={props} />;
            }}
            variables={{ count: COUNT, query: search, type: 'REPOSITORY' }}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

Search.navigationOptions = {
  header: null,
};

const query = graphql`
  query SearchQuery($count: Int!, $query: String!, $type: SearchType!) {
    ...RepositoryList_repositories
      @arguments(count: $count, query: $query, type: $type)
  }
`;

const styles = StyleSheet.create({
  indicatorView: {
    flex: 1,
    justifyContent: 'center',
  },
  searchView: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 2,
  },
});

export default Search;
