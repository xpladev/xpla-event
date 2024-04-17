
export interface PoliciesData {
    date: string;
    article: {
        english: {
            title: string;
            content: string;
        },
        korean: {
            title: string;
            content: string;
        }
    }[]
}