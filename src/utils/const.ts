
export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  BOARDS: '/boards',
}

export const NameSpace = {
  USER: 'user',
}

export const AuthorizationStatus = {
  AUTH: 'auth',
  NO_AUTH: 'no_auth',
  UNKNOWN: 'unknown',
}

export const BoardCategory = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

export const Days: Record<number, string> = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

export const Priority = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  NORMAL: 'Normal',
  NO_PRIORITY: 'No priority',
}
