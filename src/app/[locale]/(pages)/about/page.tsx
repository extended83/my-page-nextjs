import { useTranslations } from "next-intl";

export default function About() {

const t = useTranslations('About');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          {t('title')}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg text-gray-700">
            {t('desc')}
          </p>
        </div>
      </div>
    </div>
  )
}