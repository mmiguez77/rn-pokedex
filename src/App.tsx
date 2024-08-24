import React from 'react'
import StackNavigator from './presentation/navigator/Navigator'
import { ThemeContextProvider } from './presentation/context/ThemeContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
          <StackNavigator />
      </ThemeContextProvider>
    </QueryClientProvider>
  )
}

export default App