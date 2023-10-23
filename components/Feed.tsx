"use client"

import Image from 'next/image';
import { useState } from 'react'

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'> 
        <input
          type='text'
          placeholder='Search stories by title, url or author'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {loading && (
        <div className='mt-16 w-full flex-center'>
          <Image
            src='/loader.svg'
            alt='loader'
            width={50}
            height={50}
            className='object-contain'
          />
        </div>
      )}
    </section>
  )
}

export default Feed
