import { supabase } from '@/supabase'
import type { Tables, TablesInsert, TablesUpdate } from './database.types'

export async function getBoards() {
  const { data, error } = await supabase
    .from(`boards`)

    .select('*, cards(*)')
    .order('order_index', { ascending: true })
  if (error) console.error(error)
  return data
}

export async function createCard(cardData: TablesInsert<'cards'>) {
  const { data, error } = await supabase.from('cards').insert(cardData).select().single()
  if (error) console.log(error)
  console.log(data)
  return data
}

export async function updateCard(id: number, updateCard: TablesUpdate<'cards'>) {
  const { data, error } = await supabase.from(`cards`).update(updateCard).eq('id', id)
  if (error) console.error(error)
  return data
}

export async function updateBoard(id: number, updateBoard: TablesUpdate<'boards'>) {
  const { data, error } = await supabase.from(`boards`).update(updateBoard).eq('id', id)
  if (error) console.error(error)
  return data
}

export async function deleteCard(id: number) {
  const { data } = await supabase.from(`cards`).delete().eq('id', id)
  return data
}

export async function createBoard(newBoard: TablesInsert<'boards'>) {
  const { data, error } = await supabase
    .from(`boards`)
    .insert(newBoard)
    .select('*, cards(*)')
    .single()
  if (error) console.error(error)
  return data
}

export async function deleteBoard(id: number) {
  const { data, error } = await supabase.from(`boards`).delete().eq('id', id)
  if (error) console.error(error)
  return data
}
