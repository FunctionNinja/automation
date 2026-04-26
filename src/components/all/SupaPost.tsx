import { useQuery } from "@tanstack/react-query"
import type { Post } from "../../types/Post"
import { supabase } from "../../shared/api/supabaseClient"

export default function SupaPost() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const { data, error } = await supabase.from('posts').select('*')
            if (error) {
                throw new Error('Failed to fetch posts');
            }
            console.log(data);
            return data
        }
    })

    if (isLoading) return <p>Loading ...</p>

    if (error) return <p>Something went wrong</p>

    return (
        <div>
            <h1>Supabase Posts</h1>
            <ul>
                {data?.map((post: Post) => (
                    <li key={post.id}>
                        <h2>{post.post_title}</h2>
                        <p>{post.post}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}