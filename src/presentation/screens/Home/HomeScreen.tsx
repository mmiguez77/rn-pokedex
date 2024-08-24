import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/getPokemons';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import PokeballBg from '../../components/ui/PokeballBg';
import { globalTheme } from '../../../config/theme/globalTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonCard from '../../components/pokemon/PokemonCard';

const HomeScreen = () => {

  const { top } = useSafeAreaInsets();

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({ 
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0, 
    queryFn: ( params ) => getPokemons(params.pageParam),
    getNextPageParam: ( lastPage, pages ) => pages.length,
    staleTime: 1000 * 60 * 60, // 60 minutes
  })

  return (
    <View style={ globalTheme.globalMargin } >
      <PokeballBg style={ styles.imgPosition }/>
      <FlatList 
        data={ data?.pages.flat() ?? [] }
        keyExtractor={ (pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={ 2 }
        ListHeaderComponent={ () => (
          <Text variant='displayMedium' >Pokedex</Text>
        )}
        style = { { paddingTop: top + 20 } }
        renderItem={ ({ item }) => <PokemonCard pokemon={ item } />}
        onEndReached={ () => fetchNextPage() }
        onEndReachedThreshold={ 0.6 }
        showsVerticalScrollIndicator={ false }
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100
  }
})