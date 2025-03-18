import { create } from 'zustand'

export const useEducatorStore = create((set) =>({
    isEducator: true,
    error: null,

}))