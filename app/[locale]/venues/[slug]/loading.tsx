export default function Loading() {
  return (
    <section className="grid lg:grid-cols-2 gap-6">
      <div>
        <div className="grid grid-cols-2 gap-3">
          <div className="skeleton col-span-2 aspect-video rounded-2xl" />
          {Array.from({length: 4}).map((_,i)=> (
            <div key={i} className="skeleton aspect-[4/3] rounded-2xl" />
          ))}
        </div>
      </div>
      <div>
        <div className="skeleton h-8 w-64 rounded-md" />
        <div className="skeleton h-4 w-80 rounded-md mt-2" />
        <div className="skeleton h-20 w-full rounded-md mt-4" />
        <div className="skeleton h-32 w-full rounded-2xl mt-6" />
      </div>
    </section>
  )
}

