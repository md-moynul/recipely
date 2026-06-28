import { getAllTransactions } from "@/lib/api/payment";
import { Star, Book } from "@gravity-ui/icons";

function StatusBadge({ status }) {
  const styles = {
    succeeded:
      "bg-[#E6F4EA] text-[#1E7B3C] dark:bg-[#1E3B2A] dark:text-[#6FCF8E]",
    pending:
      "bg-[#FFF4E0] text-[#B5870A] dark:bg-[#3A2E14] dark:text-[#E8C468]",
    failed:
      "bg-[#FBE9E7] text-[#C0392B] dark:bg-[#3A1F1B] dark:text-[#E8897A]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
        styles[status] ?? styles.pending
      }`}
    >
      {status ?? "pending"}
    </span>
  );
}

function TypeBadge({ purchaseType }) {
  const isPremium = purchaseType === "premium";
  const Icon = isPremium ? Star : Book;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isPremium
          ? "bg-[#E6F4EA] text-[#1E7B3C] dark:bg-[#1E3B2A] dark:text-[#6FCF8E]"
          : "bg-[#F2EDE4] text-[#6B6155] dark:bg-[#2A251E] dark:text-[#9C9388]"
      }`}
    >
      <Icon width={13} height={13} />
      {isPremium ? "Premium" : "Recipe"}
    </span>
  );
}

const TransactionsPage = async () => {
  const transactions = await getAllTransactions();

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-[#9C9388]">
          {transactions?.length ?? 0} transaction
          {transactions?.length === 1 ? "" : "s"} recorded
        </p>
      </div>

      {!transactions || transactions.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-[#EAE0D3] p-12 text-center dark:border-[#3A332A]">
          <p className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
            No transactions yet
          </p>
        </div>
      ) : (
        <div className="mt-2 overflow-hidden rounded-2xl border border-[#EAE0D3] shadow-sm dark:border-[#3A332A]">
          <table className="w-full bg-white dark:bg-[#252019]">
            <thead className="border-b border-[#EAE0D3] dark:border-[#3A332A]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
                  Transaction ID
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t) => {
                const id = t._id?.$oid ?? t._id;

                return (
                  <tr
                    key={id}
                    className="group border-b border-[#EAE0D3]/60 transition-colors last:border-0 hover:bg-[#FBF1E6]/60 dark:border-[#3A332A]/60 dark:hover:bg-[#1A1714]/60"
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                        {t.userEmail}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <TypeBadge purchaseType={t.purchaseType} />
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                        {t.amount != null
                          ? `${(t.currency ?? "usd").toUpperCase()} ${t.amount.toFixed(2)}`
                          : "—"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                        {t.paidAt
                          ? new Date(t.paidAt).toLocaleDateString(undefined, {
                              dateStyle: "medium",
                            })
                          : "—"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={t.paymentStatus} />
                    </td>

                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-[#9C9388]">
                        {t.transactionId}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;