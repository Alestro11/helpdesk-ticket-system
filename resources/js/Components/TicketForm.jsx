import { Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

const inputClass =
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

export default function TicketForm({ ticket = null, options }) {
    const isEdit = ticket !== null;

    const { data, setData, post, put, processing, errors } = useForm({
        title: ticket?.title ?? '',
        description: ticket?.description ?? '',
        priority: ticket?.priority ?? 'Medium',
        status: ticket?.status ?? 'Open',
        category: ticket?.category ?? 'Software',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('tickets.update', ticket.id));
        } else {
            post(route('tickets.store'));
        }
    };

    const select = (name, label, items) => (
        <div>
            <InputLabel htmlFor={name} value={label} />
            <select
                id={name}
                value={data[name]}
                onChange={(e) => setData(name, e.target.value)}
                className={inputClass}
            >
                {items.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <InputError message={errors[name]} className="mt-2" />
        </div>
    );

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <InputLabel htmlFor="title" value="Title" />
                <input
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className={inputClass}
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    rows="5"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className={inputClass}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
                {select('priority', 'Priority', options.priorities)}
                {select('status', 'Status', options.statuses)}
                {select('category', 'Category', options.categories)}
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {processing ? 'Saving...' : isEdit ? 'Update Ticket' : 'Create Ticket'}
                </PrimaryButton>
                <Link href={route('tickets.index')} className="text-sm text-gray-600 hover:underline">
                    Cancel
                </Link>
            </div>
        </form>
    );
}