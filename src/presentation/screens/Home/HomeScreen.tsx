import { View } from 'react-native'
import React from 'react'
import { Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/getPokemons';
import { useQuery } from '@tanstack/react-query';

const HomeScreen = () => {

  const { isLoading, data } = useQuery({ 
    queryKey: ['todos'], 
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60 * 60, // 60 minutes
  })

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  )
}

export default HomeScreen