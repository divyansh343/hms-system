export default function SignupSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Signup Successful</h1>
        <p className="text-gray-700 mb-6">
          Please check your email to confirm your account.
        </p>
        <p className="text-gray-700 mb-6">
          Before Login        </p>
        <a
          href="/auth/login"
          className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go to Login
        </a>
      </div>
    </div>
  )
}