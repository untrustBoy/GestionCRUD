export interface Post {
    postId?: number;
    title: string;
    body: string;
    type: number;
    category: string;
    customerId: number;
    customerName?: string;
}