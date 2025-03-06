// /src/stores/localeStore.ts
import {create} from 'zustand'

const useLocaleStore = create(set => ({
  locale: 'en', // ค่าเริ่มต้น
  setLocale: (newLocale: any) => set({ locale: newLocale })
}))

export default useLocaleStore;
