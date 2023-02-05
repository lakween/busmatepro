const Loading = ({style}) => {

    return (
        <div className="flex justify-center items-center space-x-2 className" style={style}>
            <div style={{color:"red"}} className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"
                 role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading