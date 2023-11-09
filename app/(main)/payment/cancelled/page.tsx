import Redirector from '@/components/Redirector'

const CancelledPage = () => {
  return (
    <main>
      <h2>Payment Cancelled</h2>
      <div className="flex items-center gap-4">
        <Redirector />
        <div>
          <p>your card has not been charged</p>
          <p>redirecting to home page...</p>
        </div>
      </div>
    </main>
  )
}
export default CancelledPage
