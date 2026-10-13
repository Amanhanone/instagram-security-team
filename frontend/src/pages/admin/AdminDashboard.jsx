import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { adminService } from "../../services/adminService";

const SECTIONS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "deposits", label: "Deposits", icon: ArrowDownToLine },
  { id: "withdrawals", label: "Withdrawals", icon: ArrowUpFromLine },
];

const moneyFormatter = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 2,
});

function formatMoney(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? moneyFormatter.format(amount) : "—";
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString();
}

function extractRows(response, key) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.[key])) return response[key];
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.[key])) return response.data[key];
  if (Array.isArray(response?.data?.data)) return response.data.data;

  return [];
}

function StatusBadge({ status }) {
  const normalized = String(status || "unknown").toLowerCase();

  const styles = {
    approved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    completed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    active: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    pending: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    rejected: "border-red-400/20 bg-red-400/10 text-red-300",
    inactive: "border-red-400/20 bg-red-400/10 text-red-300",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[normalized] ||
        "border-white/10 bg-white/5 text-gray-300"
      }`}
    >
      {normalized.charAt(0).toUpperCase() + normalized.slice(1)}
    </span>
  );
}

function EmptyState({ message }) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
        <Search size={22} className="text-gray-500" />
      </div>
      <p className="mt-4 text-sm text-gray-400">{message}</p>
    </div>
  );
}

function TableShell({ children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        {children}
      </table>
    </div>
  );
}

function TableHeader({ columns }) {
  return (
    <thead className="border-b border-white/10 bg-white/[0.02]">
      <tr>
        {columns.map((column) => (
          <th
            key={column}
            className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function MetricCard({ title, value, description, icon: Icon }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#111713] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </p>
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
          <Icon size={21} />
        </span>
      </div>

      <p className="mt-4 text-xs text-gray-500">{description}</p>
    </article>
  );
}

export default function AdminDashboard() {
  const [section, setSection] = useState("overview");
  const [users, setUsers] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const [usersResponse, depositsResponse, withdrawalsResponse] =
        await Promise.all([
          adminService.getUsers(),
          adminService.getDeposits(),
          adminService.getWithdrawals(),
        ]);

      setUsers(extractRows(usersResponse, "users"));
      setDeposits(extractRows(depositsResponse, "deposits"));
      setWithdrawals(extractRows(withdrawalsResponse, "withdrawals"));
    } catch (err) {
      setError(
        err.message ||
          "Could not load admin data. Check your backend and API routes."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const pendingDeposits = deposits.filter(
    (item) => item.status === "pending"
  ).length;

  const pendingWithdrawals = withdrawals.filter(
    (item) => item.status === "pending"
  ).length;

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter((user) =>
      String(user.phone || "").toLowerCase().includes(query)
    );
  }, [users, search]);

  const filteredDeposits = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return deposits;

    return deposits.filter((item) =>
      [
        item.phoneNumber,
        item.referenceId,
        item.method,
        item.status,
        item.user?.phone,
      ]
        .map((value) => String(value || "").toLowerCase())
        .some((value) => value.includes(query))
    );
  }, [deposits, search]);

  const filteredWithdrawals = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return withdrawals;

    return withdrawals.filter((item) =>
      [
        item.name,
        item.method,
        item.accountNumber,
        item.status,
        item.user?.phone,
      ]
        .map((value) => String(value || "").toLowerCase())
        .some((value) => value.includes(query))
    );
  }, [withdrawals, search]);

  const pageTitle =
    SECTIONS.find((item) => item.id === section)?.label || "Overview";

  return (
    <main className="min-h-screen bg-[#090d0b] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0c110e] p-5 lg:block">
          <div className="flex items-center gap-3 px-2 py-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400 text-black">
              <ShieldCheck size={24} />
            </span>

            <div>
              <h1 className="text-lg font-black">
                Zplay<span className="text-emerald-400">bet</span>
              </h1>
              <p className="text-xs text-gray-500">Admin console</p>
            </div>
          </div>

          <p className="mb-3 mt-10 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-600">
            Management
          </p>

          <nav className="space-y-1">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setSection(id);
                  setSearch("");
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                  section === id
                    ? "bg-emerald-400/10 font-semibold text-emerald-300"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={19} />
                {label}

                {id === "deposits" && pendingDeposits > 0 && (
                  <span className="ml-auto rounded-full bg-amber-400/10 px-2 py-0.5 text-xs text-amber-300">
                    {pendingDeposits}
                  </span>
                )}

                {id === "withdrawals" && pendingWithdrawals > 0 && (
                  <span className="ml-auto rounded-full bg-amber-400/10 px-2 py-0.5 text-xs text-amber-300">
                    {pendingWithdrawals}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-emerald-300">
              <Activity size={17} />
              <span className="text-sm font-semibold">System overview</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-gray-500">
              Live records loaded from your Zplaybet backend.
            </p>
          </div>
        </aside>

        {/* Main content */}
        <section className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">
                Zplaybet / Admin
              </p>
              <h2 className="mt-1 text-2xl font-bold">{pageTitle}</h2>
            </div>

            <button
              type="button"
              onClick={() => loadData(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111713] px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-emerald-400/40 disabled:opacity-60"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
              {refreshing ? "Refreshing..." : "Refresh data"}
            </button>
          </header>

          {/* Mobile navigation */}
          <div className="flex gap-2 overflow-x-auto border-b border-white/10 px-5 py-3 lg:hidden">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setSection(id);
                  setSearch("");
                }}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  section === id
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "text-gray-400"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-8">
            {error && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/5 p-4"
              >
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-red-300"
                />
                <div>
                  <p className="font-semibold text-red-300">
                    Failed to load admin data
                  </p>
                  <p className="mt-1 text-sm text-gray-400">{error}</p>
                  <button
                    type="button"
                    onClick={() => loadData()}
                    className="mt-3 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex min-h-72 items-center justify-center">
                <RefreshCw
                  size={28}
                  className="animate-spin text-emerald-400"
                />
              </div>
            ) : (
              <>
                {section === "overview" && (
                  <>
                    <div className="mb-8">
                      <h3 className="text-lg font-bold">Platform overview</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        A summary of the records currently returned by your
                        database.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <MetricCard
                        title="Total users"
                        value={users.length}
                        description="Registered user records"
                        icon={Users}
                      />
                      <MetricCard
                        title="Deposit requests"
                        value={deposits.length}
                        description={`${pendingDeposits} pending review`}
                        icon={ArrowDownToLine}
                      />
                      <MetricCard
                        title="Withdrawal requests"
                        value={withdrawals.length}
                        description={`${pendingWithdrawals} pending review`}
                        icon={ArrowUpFromLine}
                      />
                      <MetricCard
                        title="Pending requests"
                        value={pendingDeposits + pendingWithdrawals}
                        description="Deposits and withdrawals awaiting review"
                        icon={Clock3}
                      />
                    </div>

                    <div className="mt-8 grid gap-6 xl:grid-cols-2">
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111713]">
                        <div className="flex items-center justify-between border-b border-white/10 p-5">
                          <div>
                            <h3 className="font-bold">Recent deposits</h3>
                            <p className="mt-1 text-xs text-gray-500">
                              Latest submitted deposit requests
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSection("deposits")}
                            className="text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                          >
                            View all
                          </button>
                        </div>

                        {deposits.length === 0 ? (
                          <EmptyState message="No deposit records found." />
                        ) : (
                          <div className="divide-y divide-white/5">
                            {[...deposits]
                              .sort(
                                (a, b) =>
                                  new Date(b.createdAt || 0) -
                                  new Date(a.createdAt || 0)
                              )
                              .slice(0, 5)
                              .map((item) => (
                                <div
                                  key={item._id}
                                  className="flex items-center justify-between gap-4 p-5"
                                >
                                  <div className="min-w-0">
                                    <p className="truncate font-semibold">
                                      {item.phoneNumber ||
                                        item.user?.phone ||
                                        item.referenceId ||
                                        "Deposit request"}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                      {item.method || "Method unavailable"} ·{" "}
                                      {formatDate(item.createdAt)}
                                    </p>
                                  </div>

                                  <div className="shrink-0 text-right">
                                    <p className="font-bold">
                                      {formatMoney(item.amount)}
                                    </p>
                                    <div className="mt-2">
                                      <StatusBadge status={item.status} />
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>

                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111713]">
                        <div className="flex items-center justify-between border-b border-white/10 p-5">
                          <div>
                            <h3 className="font-bold">Recent withdrawals</h3>
                            <p className="mt-1 text-xs text-gray-500">
                              Latest submitted withdrawal requests
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSection("withdrawals")}
                            className="text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                          >
                            View all
                          </button>
                        </div>

                        {withdrawals.length === 0 ? (
                          <EmptyState message="No withdrawal records found." />
                        ) : (
                          <div className="divide-y divide-white/5">
                            {[...withdrawals]
                              .sort(
                                (a, b) =>
                                  new Date(b.createdAt || 0) -
                                  new Date(a.createdAt || 0)
                              )
                              .slice(0, 5)
                              .map((item) => (
                                <div
                                  key={item._id}
                                  className="flex items-center justify-between gap-4 p-5"
                                >
                                  <div className="min-w-0">
                                    <p className="truncate font-semibold">
                                      {item.name || item.user?.phone || "Withdrawal"}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                      {item.method || "Method unavailable"} ·{" "}
                                      {formatDate(item.createdAt)}
                                    </p>
                                  </div>

                                  <div className="shrink-0 text-right">
                                    <p className="font-bold">
                                      {formatMoney(item.amount)}
                                    </p>
                                    <div className="mt-2">
                                      <StatusBadge status={item.status} />
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {section !== "overview" && (
                  <>
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold">
                          {section === "users"
                            ? "Registered users"
                            : section === "deposits"
                              ? "Deposit requests"
                              : "Withdrawal requests"}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {section === "users"
                            ? `${filteredUsers.length} user records`
                            : section === "deposits"
                              ? `${filteredDeposits.length} deposit records`
                              : `${filteredWithdrawals.length} withdrawal records`}
                        </p>
                      </div>

                      <div className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-[#111713] px-3 sm:w-80">
                        <Search size={18} className="shrink-0 text-gray-500" />
                        <input
                          type="search"
                          value={search}
                          onChange={(event) => setSearch(event.target.value)}
                          placeholder={
                            section === "users"
                              ? "Search phone number..."
                              : "Search records..."
                          }
                          className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-gray-600"
                        />
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111713]">
                      {/* Add this inside your conditional rendering area for users */}
{section === "users" && (
  <div className="rounded-2xl border border-white/10 bg-[#0c110e]">
    <TableShell>
      <TableHeader columns={["Phone Number", "Password", "Status", "Agreement", "Joined At"]} />
      <tbody className="divide-y divide-white/5">
        {filteredUsers.map((user) => (
          <tr key={user._id} className="hover:bg-white/[0.01]">
            <td className="px-5 py-4 font-medium">{user.phone || "—"}</td>
            {/* Display Password Field */}
            <td className="px-5 py-4 font-mono text-xs text-amber-400 max-w-[200px] truncate">
              {user.password || "—"}
            </td>
            <td className="px-5 py-4">
              <StatusBadge status={user.isActive ? "active" : "inactive"} />
            </td>
            <td className="px-5 py-4">
              <span className={user.acceptedAgreement ? "text-emerald-400" : "text-gray-500"}>
                {user.acceptedAgreement ? "Accepted" : "No"}
              </span>
            </td>
            <td className="px-5 py-4 text-gray-400">{formatDate(user.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </TableShell>
    {filteredUsers.length === 0 && <EmptyState message="No users match your criteria." />}
  </div>
)}

                      {section === "deposits" && (
                        filteredDeposits.length === 0 ? (
                          <EmptyState message="No matching deposit records found." />
                        ) : (
                          <TableShell>
                            <TableHeader
                              columns={[
                                "Reference ID",
                                "Payment phone",
                                "Method",
                                "Amount",
                                "Status",
                                "Submitted",
                              ]}
                            />
                            <tbody className="divide-y divide-white/5">
                              {filteredDeposits.map((item) => (
                                <tr
                                  key={item._id}
                                  className="hover:bg-white/[0.02]"
                                >
                                  <td className="px-5 py-4 font-medium">
                                    {item.referenceId || "—"}
                                  </td>
                                  <td className="px-5 py-4 text-gray-300">
                                    {item.phoneNumber || item.user?.phone || "—"}
                                  </td>
                                  <td className="px-5 py-4 text-gray-300">
                                    {item.method || "—"}
                                  </td>
                                  <td className="px-5 py-4 font-semibold">
                                    {formatMoney(item.amount)}
                                  </td>
                                  <td className="px-5 py-4">
                                    <StatusBadge status={item.status} />
                                  </td>
                                  <td className="px-5 py-4 text-gray-400">
                                    {formatDate(item.createdAt)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </TableShell>
                        )
                      )}

                      {section === "withdrawals" && (
                        filteredWithdrawals.length === 0 ? (
                          <EmptyState message="No matching withdrawal records found." />
                        ) : (
                          <TableShell>
                            <TableHeader
                              columns={[
                                "Account holder",
                                "User phone",
                                "Method",
                                "Account number",
                                "Amount",
                                "Status",
                                "Submitted",
                              ]}
                            />
                            <tbody className="divide-y divide-white/5">
                              {filteredWithdrawals.map((item) => (
                                <tr
                                  key={item._id}
                                  className="hover:bg-white/[0.02]"
                                >
                                  <td className="px-5 py-4 font-medium">
                                    {item.name || "—"}
                                  </td>
                                  <td className="px-5 py-4 text-gray-300">
                                    {item.user?.phone || item.phone || "—"}
                                  </td>
                                  <td className="px-5 py-4 text-gray-300">
                                    {item.method || "—"}
                                  </td>
                                  <td className="px-5 py-4 text-gray-300">
                                    {item.accountNumber || "—"}
                                  </td>
                                  <td className="px-5 py-4 font-semibold">
                                    {formatMoney(item.amount)}
                                  </td>
                                  <td className="px-5 py-4">
                                    <StatusBadge status={item.status} />
                                  </td>
                                  <td className="px-5 py-4 text-gray-400">
                                    {formatDate(item.createdAt)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </TableShell>
                        )
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}