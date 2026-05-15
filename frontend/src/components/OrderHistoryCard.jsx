export default function OrderHistoryCard({ order }) {
  return (
    <article className="bg-surface-container-lowest rounded-xl border border-outline-variant/50 overflow-hidden flex flex-col md:flex-row shadow-sm">
      <div className="w-full md:w-48 h-48 md:h-auto shrink-0">
        <img src={order.imageUrl} alt={order.restaurantName} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 flex flex-grow flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-1 bg-surface-container text-tertiary rounded font-label-sm text-[10px] uppercase">{order.status}</span>
              <span className="text-sm text-tertiary">{order.date}</span>
            </div>
            <h2 className="font-h2 text-xl text-on-surface">{order.restaurantName}</h2>
            <p className="text-tertiary mt-2">{order.itemsSummary}</p>
          </div>
          <span className="font-h2 text-lg">${order.total}</span>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
          <Button variant="secondary">View Receipt</Button>
          <Button>Reorder</Button>
        </div>
      </div>
    </article>
  );
}