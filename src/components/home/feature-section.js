'use client'

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">Key Features</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800">Patient Management</h3>
            <p className="mt-4 text-gray-600">Manage patient records, appointments, and medical history efficiently.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800">Appointment Management</h3>
            <p className="mt-4 text-gray-600">Organize and track Appointments schedules, roles, and performance.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800">Inventory Control</h3>
            <p className="mt-4 text-gray-600">Keep track of medical supplies, equipment, and pharmaceuticals.</p>
          </div>
          {/* Add more features as needed */}
        </div>
      </div>
    </section>
  )
}