import { useSearchParams, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

export default function AuthError() {
  const [searchParams] = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-red-500 mb-4">{error || 'An unknown error occurred'}</p>
        <Button asChild>
          <Link to="/login">Try Again</Link>
        </Button>
      </div>
    </div>
  )
}