import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ tickets, filters, options }) {
    const destroy = (id) => {
        if (confirm('Delete this ticket? This cannot be undone.')) {
            router.delete(route('tickets.destroy', id));
        }
    };

    const filter = (status) => {
        router.get(route('tickets.index'), status ? { status } : {}, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-gray-800">My Tickets</h2>}
        >
            <Head title="Tickets" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <select
                        value={filters.status ?? ''}
                        onChange={(e) => filter(e.target.value)}
                        className="rounded-md border-gray-300 text-sm"
                    >
                        <option value="">All statuses</option>
                        {options.statuses.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <Link
                        href={route('tickets.create')}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-center text-sm text-white"
                    >
                        New Ticket
                    </Link>
                </div>

                {tickets.data.length === 0 ? (
                    <div className="rounded-lg bg-white p-10 text-center shadow">
                        <p className="text-lg font-medium text-gray-800">No tickets yet</p>
                        <p className="mt-1 text-sm text-gray-500">Create your first ticket to get started.</p>
                        <Link
                            href={route('tickets.create')}
                            className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
                        >
                            Create a ticket
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Desktop table */}
                        <div className="hidden overflow-hidden rounded-lg bg-white shadow md:block">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50 text-left text-gray-600">
                                    <tr>
                                        <th className="px-4 py-3">Title</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3">Priority</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {tickets.data.map((t) => (
                                        <tr key={t.id}>
                                            <td className="px-4 py-3 font-medium text-gray-900">{t.title}</td>
                                            <td className="px-4 py-3">{t.category}</td>
                                            <td className="px-4 py-3">
                                                <Badge value={t.priority} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge value={t.status} />
                                            </td>
                                            <td className="space-x-3 px-4 py-3 text-right">
                                                <Link href={route('tickets.show', t.id)} className="text-indigo-600">
                                                    View
                                                </Link>
                                                <Link href={route('tickets.edit', t.id)} className="text-indigo-600">
                                                    Edit
                                                </Link>
                                                <button onClick={() => destroy(t.id)} className="text-red-600">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="space-y-3 md:hidden">
                            {tickets.data.map((t) => (
                                <div key={t.id} className="rounded-lg bg-white p-4 shadow">
                                    <p className="font-medium text-gray-900">{t.title}</p>
                                    <p className="mt-1 text-xs text-gray-500">{t.category}</p>
                                    <div className="mt-2 flex gap-2">
                                        <Badge value={t.priority} />
                                        <Badge value={t.status} />
                                    </div>
                                    <div className="mt-3 flex gap-4 text-sm">
                                        <Link href={route('tickets.show', t.id)} className="text-indigo-600">
                                            View
                                        </Link>
                                        <Link href={route('tickets.edit', t.id)} className="text-indigo-600">
                                            Edit
                                        </Link>
                                        <button onClick={() => destroy(t.id)} className="text-red-600">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex items-center justify-between text-sm">
                            {tickets.prev_page_url ? (
                                <Link href={tickets.prev_page_url} className="rounded-md border bg-white px-3 py-2">
                                    Previous
                                </Link>
                            ) : (
                                <span />
                            )}
                            <span className="text-gray-600">
                                Page {tickets.current_page} of {tickets.last_page}
                            </span>
                            {tickets.next_page_url ? (
                                <Link href={tickets.next_page_url} className="rounded-md border bg-white px-3 py-2">
                                    Next
                                </Link>
                            ) : (
                                <span />
                            )}
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}