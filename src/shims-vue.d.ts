/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  import { Store } from 'vuex'

  const component: DefineComponent<{}, {}, any>
  export default component
}
