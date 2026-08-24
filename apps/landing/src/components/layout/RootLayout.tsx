import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col w-full antialiased">
      {/* 헤더 자리 */}

      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>

      {/*푸터 자리 */}
    </div>
  )
}
