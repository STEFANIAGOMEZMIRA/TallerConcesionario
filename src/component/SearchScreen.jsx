import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Busca por marca, año, modelo o precio"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default SearchScreen;