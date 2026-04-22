export async function getUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')

    if(!res.ok){
        throw new Error('Failed to fetch users');        
    }

    return res.json()
}