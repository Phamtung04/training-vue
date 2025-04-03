export interface ListUserProps {
  headers: { value: string; sortable?: boolean }[]
  displayedUsers: {
    id: string
    Username: string
    Fullname: string
    Birthday: string
    Email: string
    Role: string
    Other: string
  }[]
  itemsPerPage: number
  perPageOptions: number[]
  currentPage: number
  totalItems: number
  totalPages: number
  startItem: number
  endItem: number
  option: number
  handleUpdate: (id: string) => void
  handleDelete: (id: string) => void
  sortBy: string
  sortDirection: 'asc' | 'desc'
}
