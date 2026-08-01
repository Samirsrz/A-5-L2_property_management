import { submitRequestAction } from "./_actions/submitRequest"

export default async function RequestPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="mx-auto max-w-md px-4">
        <h1 className="text-2xl font-bold text-foreground">Request to Rent</h1>
        <form action={submitRequestAction} className="mt-6 space-y-4">
          <input type="hidden" name="propertyId" value={id} />
          <div>
            <label className="text-sm font-medium">Move-in date</label>
            <input type="date" name="startTime" required className="mt-1 block w-full border border-border rounded-md p-2" />
          </div>
          <div>
            <label className="text-sm font-medium">Move-out date</label>
            <input type="date" name="endTime" required className="mt-1 block w-full border border-border rounded-md p-2" />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground rounded-md py-2 font-semibold">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  )
}