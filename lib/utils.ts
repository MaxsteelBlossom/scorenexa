import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export function formatTime(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit'
  })
}

export function timeAgo(dateStr: string | null) {
  if (!dateStr) return ''
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return formatDate(dateStr)
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export function getStatusColor(status: string) {
  if (status === 'LIVE' || status === '1H' || status === '2H' || status === 'HT') return 'text-red-500'
  if (status === 'FT') return 'text-slate-500'
  return 'text-blue-600'
}

export function getStatusLabel(status: string, minute: number | null) {
  if (status === 'LIVE') return minute ? `${minute}'` : 'LIVE'
  if (status === '1H' || status === '2H') return minute ? `${minute}'` : 'LIVE'
  if (status === 'HT') return 'HT'
  if (status === 'FT') return 'FT'
  if (status === 'NS') return 'Soon'
  return status
}
