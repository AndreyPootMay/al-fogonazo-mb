import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  profile: null,
  loading: true,

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      set({ session, user: session.user })
      get().fetchProfile()
    }
    set({ loading: false })

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null })
      if (session?.user) {
        get().fetchProfile()
      } else {
        set({ profile: null })
      }
    })
  },

  fetchProfile: async () => {
    const user = get().user
    if (!user) return
    const { data } = await supabase
      .from('profiles')
      .select('*, rewards_tiers(*)')
      .eq('id', user.id)
      .single()
    if (data) set({ profile: data })
  },

  signInWithEmail: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },

  signUpWithEmail: async (email, password, fullName, phone) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone },
      },
    })
    if (error) throw error

    // Update profile directly to guarantee phone/name are saved
    // (the trigger may not extract metadata reliably)
    if (data.user) {
      await supabase
        .from('profiles')
        .update({ full_name: fullName, phone, email })
        .eq('id', data.user.id)
    }

    return data
  },

  signInWithPhone: async (phone) => {
    const { data, error } = await supabase.auth.signInWithOtp({ phone })
    if (error) throw error
    return data
  },

  verifyPhoneOtp: async (phone, token) => {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    })
    if (error) throw error
    return data
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null, profile: null })
  },

  get isAuthenticated() {
    return !!get().user
  },
}))
