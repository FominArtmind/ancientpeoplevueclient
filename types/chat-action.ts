import { Card } from "./game";

export interface ChatAction {
  actor: string
  type: string
  source: Card[]
  aim: Card[]
  text?: string
}
