interface HeaderProps {
  title: string
}
export default function Header({ title }: HeaderProps) {
  return (
    <div className=' text-secondary fixed top-0 z-50 w-full bg-white border-l-0 border border-[#EAECF0] py-4 rounded '>
      <span className='ms-8 text-[20px] text-[#101828] font-medium'>
        {title}
      </span>
    </div>
  )
}
