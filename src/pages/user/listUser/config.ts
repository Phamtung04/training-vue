export interface User {
  _id: string
  userName: string
  fullName: string
  dob: string
  email: string
  role: string
  Actions: string
}

export interface ListUserProps {
  headers: { value: string; text: string; sortable?: boolean }[]
  displayedUsers: User[]
  itemsPerPage: number
  perPageOptions: number[]
  currentPage: number
  totalItems: number
  totalPages: number
  startItem: number
  endItem: number
  option: string
  handleUpdate: (id: string) => void
  handleDelete: (id: string) => void
  sortBy: string
  sortDirection: 'ASC' | 'DESC'
}
