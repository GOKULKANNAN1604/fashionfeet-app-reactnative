import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={styles.search}
    />
  );
};
const styles = StyleSheet.create({
  search: {
   marginTop:-70,
   backgroundColor:'lightgrey',
   marginHorizontal:1,
   borderRadius:20
  }
});

export default MyComponent;