type locationFuncProp = {
    setLocation : string 
}


const MeetingForm = (props : locationFuncProp)=>{
console.log(props)
return (
    <section>
        <form>
            <label>creator/host location<input type = 'text'/></label>
            <label>second user location<input type ='text'/></label>
            <button>Set up meeting button</button>
        </form>
    </section>
)
}

export default MeetingForm