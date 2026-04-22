export const fetcher = async (path: string) => {
    const res = await fetch(path)
    return res.json()
}
