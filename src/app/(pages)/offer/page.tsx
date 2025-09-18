export default function Offer() {
  const services = [
    {
      title: "Strony WWW",
      description: "Nowoczesne, responsywne strony internetowe dostosowane do Twoich potrzeb."
    },
    {
      title: "Aplikacje Webowe",
      description: "Zaawansowane aplikacje internetowe z wykorzystaniem najnowszych technologii."
    },
    {
      title: "SEO",
      description: "Optymalizacja stron pod kątem wyszukiwarek internetowych."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Oferta
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h2>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}