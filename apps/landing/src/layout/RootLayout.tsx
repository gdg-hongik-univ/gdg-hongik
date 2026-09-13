import { Outlet } from 'react-router-dom'
import Header from '../components/common/Header'

export default function RootLayout() {
  return (
    <div className="relative min-h-screen flex flex-col w-full antialiased">
      <Header />

      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>

      {/*푸터 자리 */}
    </div>
  )
}
