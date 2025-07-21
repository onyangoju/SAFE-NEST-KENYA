'use client';

export default function SafeHousesMapPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Safe Houses Map</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find safe spaces and shelters near you. This map highlights trusted locations for immediate support.</p>
      </header>
      <div className="flex justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.2164545617816!2d36.90494027588341!3d-1.287425432249536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f138ad6e6f547%3A0x4087f66f69b1e8f5!2sUsikimye!5e1!3m2!1sen!2ske!4v1753081604359!5m2!1sen!2ske"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </main>
  );
} 