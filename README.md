# Experimental - Amplify API GraphQL Cache

An experimental attempt at client-side caching 

### Learn in Public

I'm keeping this repo open as I develop it in order learn this process in public.

### Usage

```js
import { CacheProvider } from './cacheStore'

const AppWithProvider = () => (
  <CacheProvider>
    <App />
  </CacheProvider>
)

import { withCache } from './cacheStore'

export default withCache(SomeComponent);

// SomeComponent
import { getTodo as GetTodo, listTodos as ListTodos } from './graphql/queries'

// in the component
const { amplifyCache: { cacheState, fetchAndCache }} = props
const { listTodos: { items = [] } = {} } = cacheState

useEffect(() => {
  fetchAndCache(ListTodos)
}, [])

{
  items.map(t => t.name)
}
```

