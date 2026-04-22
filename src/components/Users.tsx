import { useQuery } from "@tanstack/react-query"
// import { getUsers } from "../api/users"
import { fetcher } from "../services/fetcher"

export default function Users() {
  const {data, isLoading, error} = useQuery({
    queryKey:['users'],
    queryFn: () => fetcher('https://jsonplaceholder.typicode.com/users')
  })

  if(isLoading) return <p>Loading ...</p>

  if(error) return <p>Something went wrong</p>

  return (
    <div>
      <h4>Users list</h4>
      <ul>
        {data.map((user)=>(
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      
      
      </div>
  )
}
