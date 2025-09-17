import { createRoot } from 'react-dom/client'
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import { VideoLibraryIndex } from './componant/videolibraryIndex.tsx'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import  store from "./store/store.tsx"
createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
      <Provider store={store}>
          <VideoLibraryIndex />
      </Provider>
  </CookiesProvider>
)
