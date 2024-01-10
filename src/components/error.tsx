

export const Error = ({status, msg}) =>{
    return (
        <section className="toast toast-top toast-center alert alert-error max-w-fit">
             <p >Error : {status == null ? <span>400</span> : <span>{status}</span>}</p> 
      {msg == null ? <p>Bad Request</p> : <p>{msg}</p>}
        </section>
    )
}