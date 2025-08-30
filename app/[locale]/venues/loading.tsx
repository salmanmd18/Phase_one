export default function Loading() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="skeleton h-6 w-48 rounded-md" />
        <div className="skeleton h-4 w-40 rounded-md" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({length: 6}).map((_,i)=> (
          <article key={i} className="p-3 rounded-2xl border bg-white">
            <div className="skeleton aspect-video rounded-xl" />
            <div className="mt-3 space-y-2">
              <div className="skeleton h-4 w-2/3 rounded" />
              <div className="skeleton h-3 w-1/2 rounded" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

