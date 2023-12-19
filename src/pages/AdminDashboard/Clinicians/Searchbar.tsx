const SearchBar = ({ setSearchQuery }) => {
  return (
    <div className='relative border flex flex-wrap items-stretch rounded-md bg-white p-2'>
      <input
        type='search'
        className='relative text-lg flex-auto rounded font-normal leading-[1.6] outline-none'
        placeholder='Search'
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className='relative bg-primary flex items-center rounded font-medium shadow-md'
        type='button'
        id='button-addon1'
      >
        {/* Search icon SVG */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='white'
          className='h-7 w-7'
        >
          <path
            fillRule='evenodd'
            d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
            clipRule='evenodd'
          />
        </svg>
      </button>
    </div>
  )
}
export default SearchBar
