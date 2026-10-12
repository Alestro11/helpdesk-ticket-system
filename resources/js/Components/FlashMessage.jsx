import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const message = flash?.success || flash?.error;
    const isError = !!flash?.error;

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!message || !visible) return null;

    return (
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
            <div
                className={`flex items-center justify-between rounded-md p-4 text-sm ${
                    isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}
            >
                <span>{message}</span>
                <button onClick={() => setVisible(false)} className="ml-4 font-bold">
                    ×
                </button>
            </div>
        </div>
    );
}