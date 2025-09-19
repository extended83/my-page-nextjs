export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Kontakt
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Dane kontaktowe
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Email:</strong> kontakt@example.com
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Telefon:</strong> +48 123 456 789
              </p>
              <p className="text-gray-600">
                <strong>Adres:</strong> ul. Przykładowa 1, 00-000 Warszawa
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Formularz kontaktowy
              </h2>
              <p className="text-gray-600">
                Tutaj później dodamy formularz kontaktowy po podpięciu CMS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}