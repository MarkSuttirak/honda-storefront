import Skeleton from "./Skeleton"

const ItemSkeleton = () => {
  return (
    <div className='flex flex-col'>
    <Skeleton height='150px' width='150px' borderRadius='6px' />
    <Skeleton height='17px' width='98px' marginTop='6px' />
    <Skeleton height='17px' width='82px' marginTop='9px' />
  </div>
  )
}

export default ItemSkeleton