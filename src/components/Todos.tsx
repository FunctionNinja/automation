import { useQuery } from "@tanstack/react-query"
import { fetcher } from "../services/fetcher"
import type { Todo } from "../types/Todo"

export default function Todos() {
    const { data, isLoading, error } = useQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: () => fetcher('https://jsonplaceholder.typicode.com/todos')
    })

    if (isLoading) return <p>Loading...</p>

    if (error) return <p>Something went wrong</p>

    return (
        <div>
            <h4>Todos list</h4>
            <ul>
                {data?.map((todo) => (
                    <li key={todo.id}>
                        <p>{todo.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}