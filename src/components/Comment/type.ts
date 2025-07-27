interface CommentActionProps {
  content?: string
  author?: string
  datetime?: string
}

export interface CommentProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  avatar?: string
  content?: string
  author?: string
  datetime?: string
  actions?: string[]
  quote?: CommentActionProps
  reply?: CommentActionProps
}
