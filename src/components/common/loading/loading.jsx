const Loading = ({ style }) => {

    return (
        <div style={style}>
            <div style={{color:'red'}}
                class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span style={{color:"red"}}
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                ></span>
            </div>
        </div>

        // <div className="flex justify-center items-center space-x-2 className" style={style}>
        //     <div style={{color:"red"}} className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"
        //          role="status">
        //         <span className="visually-hidden">Loading...</span>
        //     </div>
        // </div>
    )
}

export default Loading