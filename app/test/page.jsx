
const Page = () => {
    const handleForm = async (formData) =>{
        "use server";
        const username =formData.get("username")
    }
  return (
    <div>
        <form action={handleForm} >
            <input type="text" name="username"/>
            <button>Send</button>
        </form>
    </div>
  )
}

export default Page