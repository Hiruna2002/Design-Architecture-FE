export default function Loading() {
  return (
    <div className="min-h-screen bg-white">

      <section className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="animate-pulse text-center">

            <div className="h-14 bg-white/10 rounded-lg max-w-md mx-auto mb-6" />

            <div className="w-24 h-1 bg-[#a3e635]/50 mx-auto mb-6" />

            <div className="h-5 bg-white/10 rounded max-w-2xl mx-auto mb-3" />

            <div className="h-5 bg-white/10 rounded max-w-xl mx-auto" />

          </div>

        </div>

      </section>

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="bg-[#0f172a] p-8 rounded-lg animate-pulse">

              <div className="h-9 bg-white/10 rounded w-2/3 mb-6" />

              <div className="space-y-3 mb-8">
                <div className="h-4 bg-white/10 rounded" />
                <div className="h-4 bg-white/10 rounded w-5/6" />
                <div className="h-4 bg-white/10 rounded w-3/5" />
              </div>

              <div className="h-6 bg-[#a3e635]/20 rounded w-1/3 mb-6" />

              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-4 bg-white/10 rounded w-4/5"
                  />
                ))}
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}