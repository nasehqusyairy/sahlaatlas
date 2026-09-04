export type Discount = {
    id: string;
    title: string;                 // "Promo Tanggal Kembar 10.10"
    description: string | null;
    type: 'percentage' | 'fixed';
    value: number;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

