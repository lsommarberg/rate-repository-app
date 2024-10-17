import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../../theme';

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: theme.colors.mainBackground,
  },
});

const sortingOptions = [
  { label: 'Latest repositories', value: 'CREATED_AT-DESC' },
  { label: 'Highest rated repositories', value: 'RATING_AVERAGE-DESC' },
  { label: 'Lowest rated repositories', value: 'RATING_AVERAGE-ASC' },
];

const RepositoryListHeader = ({ orderBy, setOrderBy, orderDirection, setOrderDirection }) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');

  useEffect(() => {
    const initialOption = sortingOptions.find(
      option => option.value === `${orderBy}-${orderDirection}`
    );
    if (initialOption) {
      setSelectedLabel(initialOption.label);
    }
  }, [orderBy, orderDirection]);

  const handleValueChange = (itemValue, itemIndex) => {
    const [newOrderBy, newOrderDirection] = itemValue.split('-');
    setOrderBy(newOrderBy);
    setOrderDirection(newOrderDirection);
    setSelectedLabel(sortingOptions[itemIndex].label);
    setPickerVisible(false);
  };

  return (
    <View style={styles.header}>
      <Button title={selectedLabel || 'Latest repositories'} onPress={() => setPickerVisible(!pickerVisible)} />
      {pickerVisible && (
        <Picker
          selectedValue={`${orderBy}-${orderDirection}`}
          onValueChange={handleValueChange}
        >
          {sortingOptions.map(option => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      )}
    </View>
  );
};

export default RepositoryListHeader;