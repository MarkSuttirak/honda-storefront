const Skeleton = ({width = "40", height = "20"}) => {
  const bg = {
    display:"block",
    background:"lightgray"
  }
  return (
    <div style={{width:{width} + "px",height:{height} + "px"}}>
      <span className="skeleton-loader-background" style={bg}></span>
    </div>
  )
}

export default Skeleton