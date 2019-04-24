import React, {
  useReducer
} from 'react'
import { API, graphqlOperation } from 'aws-amplify'

const Store = React.createContext()

const cache = {}

function reducer(state, action) {
  switch(action.type) {
    case 'set':
      return {
        ...state,
        [action.cacheKey]: action.data
      }
    default:
      return state
    }
}

async function fetchAndCache(operation, dispatch, args, id) {
  try {
    if (args) {
      const data = await API.graphql(graphqlOperation(operation, args))
      const key = Object.keys(data.data)[0]

      dispatch({
        type: 'set', cacheKey: key, data: data.data[key]
      })
    } else {
      const data = await API.graphql(graphqlOperation(operation))
      const key = Object.keys(data.data)[0]
      dispatch({
        type: 'set', cacheKey: key, data: data.data[key]
      })
    }
  } catch (err) {
    console.log('error: ', err)
  }
}

function CacheProvider ({ children }) {
  const [cacheState, dispatch] = useReducer(reducer, cache)

  function passToCache(operation, args, id) {
    fetchAndCache(operation, dispatch, args, id)
  }

  return (
    <Store.Provider value={{
      cacheState,
      fetchAndCache: passToCache
    }}>
      {children}
    </Store.Provider>
  )
}

function withCache(Component) {
  return class extends React.Component {
    render() {
      return (
        <Store.Consumer>
          {
            context => (
              <Component
                amplifyCache={context}
              />
            )
          }
        </Store.Consumer>
      )
    }
  }
}

export {
  CacheProvider,
  withCache
}
