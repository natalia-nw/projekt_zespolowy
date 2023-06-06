const Find = () => {
    return (
        <main className="container">
            <form>
                <input 
                type="search" 
                name="search"
                onChange={(e) => e.target.value}
                />
            </form>
        </main>
    )
}

export default Find;