import { useQuery } from "@tanstack/react-query"
// import { getUsers } from "../api/users"


export default function Posts() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            if (!res.ok) {
                throw new Error('Failed to fetch users');
            }

            return res.json()
        }
    })

    if (isLoading) return <p>Loading ...</p>

    if (error) return <p>Something went wrong</p>

    return (
        <div>
            <h4>Posts list</h4>
            <ul>
                {data.map((post) => (
                    <li key={post.id}><p>Title: {post.title}</p>
                    </li>
                ))}
            </ul>


        </div>
    )
}
