// 그리드 값은 theme.css에서 관리한다. 컬럼 수는 단위 없는 CSS 변수다.
export const grid = {
  xs: {
    columns: 'var(--grid-xs-columns)',
    margin: 'var(--grid-xs-margin)',
    gutter: 'var(--grid-xs-gutter)',
  },
  s: {
    columns: 'var(--grid-s-columns)',
    margin: 'var(--grid-s-margin)',
    gutter: 'var(--grid-s-gutter)',
  },
  m: {
    columns: 'var(--grid-m-columns)',
    margin: 'var(--grid-m-margin)',
    gutter: 'var(--grid-m-gutter)',
  },
  l: {
    columns: 'var(--grid-l-columns)',
    margin: 'var(--grid-l-margin)',
    gutter: 'var(--grid-l-gutter)',
  },
  xl: {
    columns: 'var(--grid-xl-columns)',
    containerWidth: 'var(--grid-xl-container-width)',
    gutter: 'var(--grid-xl-gutter)',
    admin: {
      sidebarWidth: 'var(--grid-xl-admin-sidebar-width)',
      columns: 'var(--grid-xl-admin-columns)',
      contentPadding: 'var(--grid-xl-admin-content-padding)',
      gutter: 'var(--grid-xl-admin-gutter)',
    },
  },
} as const
