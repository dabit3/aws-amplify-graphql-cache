# Experimental - Amplify API GraphQL Cache

An experimental attempt at client-side caching 

### Learn in Public

I'm keeping this repo open as I develop it in order learn this process in public.

### Usage

```js
// provider level
import { CacheProvider } from './cacheStore'

const AppWithProvider = () => (
  <CacheProvider>
    <App />
  </CacheProvider>
)

// consumer level, some component
import { withCache } from './cacheStore'
import { listTodos as ListTodos } from './graphql/queries'

// in the component
const { amplifyCache: { cacheState, fetchAndCache }} = props
const { listTodos: { items = [] } = {} } = cacheState

useEffect(() => {
  fetchAndCache(ListTodos)
}, [])

{
  items.map(t => t.name)
}

export default withCache(SomeComponent);
```

