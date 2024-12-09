export const saveToLocal = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const loadFromLocal = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || 'null')
} 